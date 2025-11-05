import { useState } from "react";
import { useWeb3Context } from "../hooks/useWeb3Context";
import { Link } from "react-router-dom";

export default function FormCrearContrato() {
    const { signer, deployedContract, isConnected, connectWallet } = useWeb3Context();

    const [ loading, setLoading ] = useState(false);
    const [ form, setForm ] = useState({
        vendedor: "",
        emailVendedor: "",
        intermediario: "",
        incoterm: "FOB",
        fleteACargoDe: "Comprador",
        puntoControlCalidad: "",
        cantidadToneladas: "",
        precioPorTonelada: "",
        tipoContrato: "PrecioFijo",
        fechaEntrega: "",
        lugarEntrega: "",
        condicionesCalidad: "",
        modalidadPago: "Transferencia bancaria",
        accionIncumplimiento: "Descuento",
        porcentajeDescuento: "",
        arbitro: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [ e.target.name ]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isConnected) {
            alert("Por favor, conecte su wallet antes de continuar.");
            return;
        }

        if (!deployedContract || !signer) {
            alert("Contrato o signer no inicializado.");
            return;
        }

        try {
            setLoading(true);

            const partes = {
                comprador: await signer.getAddress(),
                vendedor: form.vendedor,
                intermediario: form.intermediario,
            };

            const condicionesComerciales = {
                incoterm: form.incoterm,
                fleteACargoDe: form.fleteACargoDe,
                puntoControlCalidad: form.puntoControlCalidad,
                cantidadToneladas: Number(form.cantidadToneladas),
                precioPorTonelada: Number(form.precioPorTonelada),
                tipoContrato: form.tipoContrato === "PrecioFijo" ? 0 : 1,
                fechaEntrega: Math.floor(new Date(form.fechaEntrega).getTime() / 1000),
                lugarEntrega: form.lugarEntrega,
                condicionesCalidad: form.condicionesCalidad,
            };

            const accion =
                form.accionIncumplimiento === "Rechazo"
                    ? 0
                    : form.accionIncumplimiento === "Renegociacion"
                        ? 1
                        : 2;

            console.log("🧾 Enviando transacción...");

            const tx = await deployedContract
                .connect(signer)
                .crearContrato(
                    partes,
                    condicionesComerciales,
                    form.modalidadPago,
                    accion,
                    Number(form.porcentajeDescuento),
                    form.arbitro,
                    "hashVersionContrato_v1"
                );

            await tx.wait();
            
            // Obtener el ID del contrato creado (usualmente es el contador de contratos en el mapping)
            const contractId = await deployedContract.contadorContratos();
            const contractIdString = contractId.toString();

            console.log(`✅ Contrato creado con ID: ${contractId}`);
            console.log(`✅ Tipo: ${typeof (contractId)}`);
            console.log(`✅ OBJ ENVIADO: ${
                contractIdString
            },${form.emailVendedor
             },${form.vendedor
              }`);

            // Ahora, genera el OTP con el contractId
            const otpRes = await fetch("http://localhost:3000/otp/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contractIdString,
                    sellerAddress: form.vendedor,
                    email: form.emailVendedor,  // O usa la dirección de correo del vendedor si lo prefieres
                }),
            });

            const otpData = await otpRes.json();
            
            if (otpRes.ok) {
                alert("✅ Contrato creado con éxito. Enviando OTP al vendedor");
            } else {
                alert("❌ Error al generar OTP");
            }

            console.log("📦 TX confirmada:", tx.hash);
        } catch (err: any) {
            console.error("❌ Error al crear contrato:", err);
            alert(`Error: ${err.message || "Error desconocido"}`);
        } finally {
            setLoading(false);
        }
    };

    if (!isConnected) {
        return (
            <div className="p-6 text-center">
                <p className="mb-3 text-gray-300">Debe conectar su wallet para crear un contrato.</p>
                <button
                    onClick={connectWallet}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Conectar Wallet
                </button>
            </div>
        );
    }

    return (
        <>
            <Link
                to="/"
                className="bg-gray-700 hover:bg-gray-600 transition-all rounded-xl px-4 py-2 inline-block mb-6 text-white"
            >
                ← Volver Atrás
            </Link>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 p-6 border border-gray-700 rounded-xl bg-gray-800 shadow-lg max-w-xl mx-auto text-gray-100"
            >
                <h2 className="text-2xl font-bold mb-4 text-green-400 text-center">
                    🧾 Crear contrato de granos
                </h2>

                {Object.entries({
                    vendedor: "Direccion de Billetera del Vendedor",
                    emailVendedor: "Direccion de Correo del Vendedor",
                    intermediario: "Direccion de Billetera del Intermediario (Opcional)",
                    puntoControlCalidad: "Punto de control de calidad",
                    cantidadToneladas: "Cantidad (toneladas)",
                    precioPorTonelada: "Precio por tonelada (wei)",
                    fechaEntrega: "Fecha estimada de entrega",
                    lugarEntrega: "Lugar de entrega",
                    condicionesCalidad: "Condiciones de calidad",
                    porcentajeDescuento: "Porcentaje de descuento (%)",
                    arbitro: "Dirección del árbitro",
                }).map(([ key, label ]) => (
                    <div key={key}>
                        <label>{label}:</label>
                        <input
                            name={key}
                            className="input-dark"
                            type={
                                key.includes("precio") || key.includes("cantidad") || key.includes("porcentaje")
                                    ? "number"
                                    : key === "fechaEntrega"
                                        ? "date"
                                        : "text"
                            }
                            onChange={handleChange}
                            required={![ "intermediario" ].includes(key)}
                        />
                    </div>
                ))}

                <label>Incoterm:</label>
                <input name="incoterm" defaultValue="FOB" className="input-dark" onChange={handleChange} />

                <label>Flete a cargo de:</label>
                <select name="fleteACargoDe" className="input-dark" onChange={handleChange}>
                    <option>Comprador</option>
                    <option>Vendedor</option>
                </select>

                <label>Tipo de contrato:</label>
                <select name="tipoContrato" className="input-dark" onChange={handleChange}>
                    <option>PrecioFijo</option>
                    <option>PrecioAFijar</option>
                </select>

                <label>Modalidad de pago:</label>
                <input
                    name="modalidadPago"
                    defaultValue="Transferencia bancaria"
                    className="input-dark"
                    onChange={handleChange}
                />

                <label>Acción ante incumplimiento:</label>
                <select name="accionIncumplimiento" className="input-dark" onChange={handleChange}>
                    <option>Descuento</option>
                    <option>Rechazo</option>
                    <option>Renegociacion</option>
                </select>

                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 mt-4 bg-green-600 hover:bg-green-500 transition-colors text-white rounded-lg shadow-md"
                >
                    {loading ? "Creando contrato..." : "Crear Contrato"}
                </button>
            </form>
        </>
    );
}
