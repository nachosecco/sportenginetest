import useEventos from "../hooks/useEventos"

const Colaborator = ({colaborator}) => {
    const { handleModalEliminarColaborador } = useEventos()

    const { name, email } = colaborator
    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div className="">
                <p>{name}</p>
                <p className="text-sm text-gray-700">{email}</p>
            </div>
            <div className="">
                <button
                    type="button"
                    className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                    onClick={() => handleModalEliminarColaborador(colaborator)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default Colaborator