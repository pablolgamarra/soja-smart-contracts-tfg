import { useState } from "react";
import { useContrato } from "../hooks/useContrato";

export default function CrearContrato() {
    const { contrato, signer } = useContrato();
    const [ loading, setLoading ] = useState(false);

    const handleCreate = async () => {
        try {
            setLoading(true);

            if (!contrato || !signer) {
                alert("Contrato o signer no inicializado");
                return;
            }

            const condiciones = {
                incoterm: "FOB",
                fleteACargoDe: "Comprador",
                puntoControlCalidad: "Puerto CDE",
                cantidadToneladas: 10,
                precioPorTonelada: 100,
                tipoContrato: 0,
                fechaEntrega: Math.floor(Date.now() / 1000) + 86400,
                lugarEntrega: "Depósito CDE",
                condicionesCalidad: "Humedad < 13%",
            };

            const partes = {
                comprador: await signer.getAddress(),
                vendedor: "0x0000000000000000000000000000000000000000",
                intermediario: "0x0000000000000000000000000000000000000000",
            };

            const tx = await contrato.crearContrato(
                partes,
                condiciones,
                "Transferencia bancaria",
                2, // AccionIncumplimiento.Descuento
                5, // 5% descuento
                await signer.getAddress(),
                "hashVersionContrato_inicial"
            );

            await tx.wait();
            alert("✅ Contrato creado correctamente");
        } catch (e: any) {
            console.error(e);
            alert("❌ Error al crear contrato: " + e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 border rounded-lg shadow-md w-fit">
            <h2 className="text-xl font-semibold mb-2">🧾 Crear contrato</h2>
            <button
                onClick={handleCreate}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
                {loading ? "Creando..." : "Crear Contrato"}
            </button>
        </div>
    );
}
