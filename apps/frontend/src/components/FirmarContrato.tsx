import { useState } from "react";

export default function FirmarContrato() {
    const [ idContrato, setIdContrato ] = useState("");
    const [ otp, setOtp ] = useState("");
    const [ vendedorEmail, setVendedorEmail ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const [ contractDetails, setContractDetails ] = useState<any | null>(null);
    const [ contractViewed, setContractViewed ] = useState(false);

    // Validación de datos del formulario
    const isFormValid = idContrato && otp && vendedorEmail;

    const handleVerContrato = async () => {
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:3000/contratos/${idContrato.toString()}`, {
                method: "GET",
            });

            if (!res.ok) throw new Error("Error al obtener los detalles del contrato");

            const data = await res.json();
            setContractDetails(data);
            setContractViewed(true);
        } catch (err: any) {
            console.error(err);
            alert("❌ Error al obtener los detalles del contrato: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFirmar = async () => {
        if (!contractDetails) return;

        try {
            setLoading(true);
            const res = await fetch("http://localhost:3000/contratos/firmar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    idContrato,
                    otp,
                    vendedorEmail,
                }),
            });

            if (!res.ok) throw new Error("Error en el servidor");

            const data = await res.json();
            alert(`✅ Contrato firmado con éxito\nTxHash: ${data.txHash}`);
        } catch (err: any) {
            console.error(err);
            alert("❌ Error al firmar: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 border rounded-lg shadow-md w-fit">
            <h2 className="text-xl font-semibold mb-2">✍️ Firmar Contrato</h2>

            {/* Formulario de ingreso de datos */}
            <input
                className="border px-2 py-1 mb-2 w-full"
                placeholder="ID del contrato"
                value={idContrato}
                onChange={(e) => setIdContrato(e.target.value)}
            />
            <input
                className="border px-2 py-1 mb-2 w-full"
                placeholder="OTP recibido"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
            />
            <input
                className="border px-2 py-1 mb-2 w-full"
                placeholder="Email del vendedor"
                value={vendedorEmail}
                onChange={(e) => setVendedorEmail(e.target.value)}
            />

            {/* Botón para ver los detalles del contrato */}
            <button
                onClick={handleVerContrato}
                disabled={!isFormValid || loading || contractViewed}
                className="px-4 py-2 mt-2 bg-green-600 text-white rounded-lg"
            >
                {loading ? "Cargando contrato..." : contractViewed ? "Ver contrato" : "Ver detalles del contrato"}
            </button>

            {/* Mostrar detalles del contrato */}
            {console.log(contractDetails)}
            {contractViewed && contractDetails && (
                <div className="mt-4 p-4 border rounded-md bg-gray-200">
                    <h3 className="text-lg font-semibold">Detalles del contrato</h3>
                    <div>
                        <strong>Vendedor:</strong> {contractDetails.contrato.vendedor}
                    </div>
                    <div>
                        <strong>Incoterm:</strong> {contractDetails.contrato.incoterm}
                    </div>
                    <div>
                        <strong>Cantidad Toneladas:</strong> {contractDetails.contrato.cantidadToneladas}
                    </div>
                    <div>
                        <strong>Precio por Tonelada:</strong> {contractDetails.contrato.precioPorTonelada}
                    </div>
                    <div>
                        <strong>Condiciones de Calidad:</strong> {contractDetails.contrato.condicionesCalidad}
                    </div>
                    <div>
                        <strong>Lugar de Entrega:</strong> {contractDetails.contrato.lugarEntrega}
                    </div>
                    <div>
                        <strong>Fecha de Entrega:</strong> {new Date(contractDetails.contrato.fechaEntrega * 1000).toLocaleDateString()}
                    </div>
                </div>
            )}

            {/* Botón para firmar contrato */}
            {contractViewed && (
                <button
                    onClick={handleFirmar}
                    disabled={loading}
                    className="px-4 py-2 mt-4 bg-blue-600 text-white rounded-lg"
                >
                    {loading ? "Firmando..." : "Firmar Contrato"}
                </button>
            )}
        </div>
    );
}
