import { useState } from "react";

export default function FirmarContrato() {
    const [ idContrato, setIdContrato ] = useState("");
    const [ otp, setOtp ] = useState("");
    const [ vendedorEmail, setVendedorEmail ] = useState("");
    const [ loading, setLoading ] = useState(false);

    const handleFirmar = async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:4000/contratos/firmar", {
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
            <button
                onClick={handleFirmar}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
                {loading ? "Firmando..." : "Firmar Contrato"}
            </button>
        </div>
    );
}
