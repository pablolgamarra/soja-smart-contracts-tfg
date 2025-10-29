import { useState } from "react";
import { useWeb3Context } from "../hooks/useWeb3Context";
import { Link, Route, Routes } from "react-router-dom";

export default function FormCrearContrato() {
    const {contract, signer} = useWeb3Context();

    const [ form, setForm ] = useState({
        vendedor: "",
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

    const [ loading, setLoading ] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [ e.target.name ]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            setLoading(true);
            
            if (!contract || !signer) {
                window.alert("Contrato o signer no inicializado");
                return;
            }

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

            const accion = form.accionIncumplimiento === "Rechazo" ? 0 :
                form.accionIncumplimiento === "Renegociacion" ? 1 : 2;

            const tx = await contract.crearContrato(
                partes,
                condicionesComerciales,
                form.modalidadPago,
                accion,
                Number(form.porcentajeDescuento),
                form.arbitro,
                "hashVersionContrato_v1"
            );

            await tx.wait();
            alert("✅ Contrato creado con éxito!");
        } catch (err: any) {
            console.error(err);
            alert("❌ Error al crear contrato: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Link
                    to="/"
                    className="bg-red-600 hover:bg-green-500 transform hover:-translate-y-1 transition-all rounded-xl p-6 text-center font-semibold shadow-lg shadow-green-900/50"
                >
                    Volver Atrás
            </Link>
            <Routes>
                <Route
                path="/"
                />
            </Routes>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 p-6 border border-gray-700 rounded-xl bg-gray-800 shadow-lg max-w-xl mx-auto text-gray-100"
            >
                <h2 className="text-2xl font-bold mb-4 text-green-400 text-center animate-pulse">
                    🧾 Crear contrato de granos
                </h2>

                <label>Dirección del vendedor:</label>
                <input
                    name="vendedor"
                    className="input-dark"
                    onChange={handleChange}
                    required
                />

                <label>Intermediario (opcional):</label>
                <input name="intermediario" className="input-dark" onChange={handleChange} />

                <label>Incoterm:</label>
                <input
                    name="incoterm"
                    className="input-dark"
                    defaultValue="FOB"
                    onChange={handleChange}
                />

                <label>Flete a cargo de:</label>
                <select name="fleteACargoDe" className="input-dark" onChange={handleChange}>
                    <option>Comprador</option>
                    <option>Vendedor</option>
                </select>

                <label>Punto de control de calidad:</label>
                <input
                    name="puntoControlCalidad"
                    className="input-dark"
                    onChange={handleChange}
                />

                <label>Cantidad (toneladas):</label>
                <input
                    name="cantidadToneladas"
                    type="number"
                    className="input-dark"
                    onChange={handleChange}
                    required
                />

                <label>Precio por tonelada (wei o unidad base):</label>
                <input
                    name="precioPorTonelada"
                    type="number"
                    className="input-dark"
                    onChange={handleChange}
                    required
                />

                <label>Tipo de contrato:</label>
                <select name="tipoContrato" className="input-dark" onChange={handleChange}>
                    <option>PrecioFijo</option>
                    <option>PrecioAFijar</option>
                </select>

                <label>Fecha estimada de entrega:</label>
                <input
                    name="fechaEntrega"
                    type="date"
                    className="input-dark"
                    onChange={handleChange}
                    required
                />

                <label>Lugar de entrega:</label>
                <input name="lugarEntrega" className="input-dark" onChange={handleChange} />

                <label>Condiciones de calidad:</label>
                <input
                    name="condicionesCalidad"
                    className="input-dark"
                    onChange={handleChange}
                />

                <label>Modalidad de pago:</label>
                <input name="modalidadPago" className="input-dark" onChange={handleChange} />

                <label>Acción ante incumplimiento:</label>
                <select
                    name="accionIncumplimiento"
                    className="input-dark"
                    onChange={handleChange}
                >
                    <option>Descuento</option>
                    <option>Rechazo</option>
                    <option>Renegociacion</option>
                </select>

                <label>Porcentaje de descuento (%):</label>
                <input
                    name="porcentajeDescuento"
                    type="number"
                    className="input-dark"
                    onChange={handleChange}
                    required
                />

                <label>Dirección del árbitro:</label>
                <input name="arbitro" className="input-dark" onChange={handleChange} required />

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