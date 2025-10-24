import { expect } from "chai";
import { network } from "hardhat";

describe("ContratoGranosSoja", function () {
    let forwarder: any;
    let contrato: any;
    let deployer: any;
    let comprador: any;
    let relayer: any;
    let arbitro: any;

    beforeEach(async function () {
        const { ethers } = await network.connect("hardhatMainnet");
        console.log(network);

        [ deployer, comprador, relayer, arbitro ] = await ethers.getSigners();

        // 1️⃣ Deploy del ERC2771Forwarder (solo este contrato, no es necesario el MinimalForwarder)
        const ERC2771Forwarder = await ethers.getContractFactory("ERC2771Forwarder");
        forwarder = await ERC2771Forwarder.deploy("SoySmart Forwarder");
        await forwarder.waitForDeployment();

        // 2️⃣ Deploy del ContratoGranosSoja, pasando los parámetros correctos
        const Contrato = await ethers.getContractFactory("ContratoGranosSoja");
        contrato = await Contrato.deploy(await forwarder.getAddress(), await relayer.getAddress());
        await contrato.waitForDeployment();
    });

    it("flujo completo de contrato de granos", async function () {
        const { ethers } = await network.connect();

        // === 1️⃣ Crear contrato ===
        const identificadorPartes = {
            comprador: await comprador.getAddress(),
            vendedor: ethers.ZeroAddress, // el productor (no usa wallet real)
            intermediario: ethers.ZeroAddress,
        };

        const condicionesComerciales = {
            incoterm: "FOB",
            fleteACargoDe: "Comprador",
            puntoControlCalidad: "Puerto CDE",
            cantidadToneladas: 10,
            precioPorTonelada: 100,
            tipoContrato: 0, // PrecioFijo
            fechaEntrega: Math.floor(Date.now() / 1000) + 86400,
            lugarEntrega: "Depósito CDE",
            condicionesCalidad: "Humedad < 13%",
        };

        await contrato
            .connect(comprador)
            .crearContrato(
                identificadorPartes,
                condicionesComerciales,
                "Transferencia bancaria",
                2, // AccionIncumplimiento.Descuento
                5, // 5% descuento
                await arbitro.getAddress(),
                "hashVersionContrato_inicial"
            );

        expect(await contrato.contadorContratos()).to.equal(1);

        // === 2️⃣ Firma meta-tx (relayer actúa por el vendedor) ===
        await contrato
            .connect(relayer)
            .firmarContratoMetaTx(1, "consentHash_otp123", "ipfs://evidencia/otp123");

        const contratoData = await contrato.contratos(1);
        expect(contratoData.estado).to.equal(2); // Estado.Accepted

        // === 3️⃣ Confirmar entrega ===
        await contrato.connect(relayer).confirmarEntregaMetaTx(1);
        const afterDelivery = await contrato.contratos(1);
        expect(afterDelivery.estado).to.equal(3); // Estado.Delivered

        // === 4️⃣ Pago ===
        const montoTotal = afterDelivery.condicionesEconomicas.montoTotal;
        await expect(
            contrato.connect(comprador).pagar(1, { value: montoTotal })
        ).to.changeEtherBalances(
            ethers,
            [ contrato, relayer ],
            [ 0, 0 ],
        );

        const afterPay = await contrato.contratos(1);
        expect(afterPay.estado).to.equal(4); // Estado.Settled
    });
});
