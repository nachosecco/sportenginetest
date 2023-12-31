import FormularioColaborador from "../components/FormularioColaborador"
import { useEffect } from "react"
import useEventos from "../hooks/useEventos"
import { useParams } from "react-router-dom"
import Alerta from "../components/Alerta"
import LoadingSpinner from "../components/LoadingSpinner"

const NuevoColaborador = () => {
    const { obtenerEvento, event, cargando, colaborador, agregarColaborador, alerta } = useEventos()
    const params = useParams()

    useEffect(() => {
        obtenerEvento(params.id)
    }, [])

    

    if (cargando) {
        return (
            <LoadingSpinner/>
        )
    }

    if (!event?._id) return <Alerta alerta={alerta} />
  return (
   <>
        <h1 className="text-4xl font-black">Añadir Invitados al Evento: {event.name} </h1>
        <div className="mt-10 flex justify-center">
            <FormularioColaborador />
        </div>

        {cargando ? <p className="text-center">Cargando...</p> : colaborador?._id && (
            <div className="flex justify-center mt-10">
                <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full">
                    <h2 className="text-center mb-10 text-2xl font-bold">Resultado:</h2>
                    <div className="flex justify-between items-center">
                        <p className="text-xs bg-purple-500 uppercase text-white font-bold p-1 rounded-lg">{colaborador.name}</p>
                        <button
                            type="button"
                            className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                            onClick={() => agregarColaborador({
                                email: colaborador.email,
                                creator: auth._id  // Add this line
                            })}
                        >
                            Agregar al evento
                        </button>
                    </div>
                </div>
            </div>
        )}
   </>
  )
}

export default NuevoColaborador