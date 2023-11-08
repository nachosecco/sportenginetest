import { formatDate } from "../helpers/formatDate"
import useEventos from "../hooks/useEventos"
import useAdmin from "../hooks/useAdmin"

const Task = ({task}) => {

    const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useEventos()
    const { name, description, priority, dueDate, state, _id, completed } = task

    const getBgClass = (priority) => {
        switch (priority) {
          case 'Baja':
            return 'bg-green-500';
          case 'Media':
            return 'bg-orange-300';
          case 'Alta':
            return 'bg-red-500';
          default:
            return 'bg-white';
        }
      };
    

    const admin = useAdmin()
    
  return (
    <div className="border-b p-5 flex justify-between items-center">
        <div className="flex flex-col items-start">
            <p className="mb-1 text-xl">{name}</p>
            <p className="mb-1 text-sm text-gray-500 uppercase">{description}</p>
            <p className="mb-1 text-sm">{formatDate(dueDate)}</p>
            <p className={`mb-1 text-white ${getBgClass(priority)} p-1 rounded`}>Prioridad: {priority}</p>
            {state && <p className="text-xs bg-green-600 uppercase text-white font-bold p-1 rounded-lg">Completada por: {completed.name}</p>}

        </div>
        <div className="flex flex-col lg:flex-row gap-3">
            {admin && (
            <button
                className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                onClick={()=>handleModalEditarTarea(task)}
            >Editar</button>
            )}
            
            <button
                className={`${state ? 'bg-sky-600' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
                onClick={() => completarTarea(_id)}
            >{state ?  "Completa" : "Incompleta"}</button>
            
            {admin && (
            <button
                className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                onClick={() => handleModalEliminarTarea(task)}
            >Eliminar</button>
            )}
        </div>
    </div>
  )
}

export default Task