import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import useEventos from '../hooks/useEventos'
import useAdmin from '../hooks/useAdmin'
import ModalFormularioTarea from '../components/ModalFormularioTarea'
import ModalEliminarTarea from '../components/ModalEliminarTarea'
import ModalEliminarColaborador from '../components/ModalEliminarColaborador'
import Task from '../components/Task'
import Alerta from '../components/Alerta'
import Colaborator from '../components/Colaborator'
 
const Evento = () => {
  const params = useParams()
  const { obtenerEvento, event, cargando, handleModalTarea, alerta } = useEventos()
 
  const admin = useAdmin()
 
  useEffect(() => {
    obtenerEvento(params.id)
  }, [])
 
  const { name } = event
 
  if (cargando) {
    return (
      <div className='border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto'>
        <div className='animate-pulse flex space-x-4'>
          <div className='rounded-full bg-slate-700 h-10 w-10'></div>
          <div className='flex-1 space-y-6 py-1'>
            <div className='h-2 bg-slate-700 rounded'></div>
            <div className='space-y-3'>
              <div className='grid grid-cols-3 gap-4'>
                <div className='h-2 bg-slate-700 rounded col-span-2'></div>
                <div className='h-2 bg-slate-700 rounded col-span-1'></div>
              </div>
              <div className='h-2 bg-slate-700 rounded'></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
 
  const { msg } = alerta
  return (
    <>
  <div className='flex justify-between items-center'>
    <h1 className='font-black text-4xl'>{name}</h1>
    <div className='flex items-center gap-4'>
      {admin && (
   <Link
   to={`/events/editar/${params.id}`}
   className='flex items-center text-white font-bold mr-4 hover:bg-orange-600 bg-orange-500 p-2 rounded'
 >
   <img src={`/icons/icons8-edit.svg`} alt="Editar" className='w-6 h-6' />
   Editar
 </Link>
 
      )}
      <Link
        to={`/events/borrar/${params.id}`}
        className='flex items-center text-white font-bold mr- hover:bg-red-600 bg-red-500  p-2 rounded'
      >
    <img src={`/icons/icons8-trash.svg`} alt="Borrar" className='w-6 h-6' />
        Borrar
      </Link>
    </div>
  </div>


 
  <div className='flex justify-between items-center mt-10'>
  <p className='font-bold text-xl'>📋Tareas del evento:</p>
  {admin && (
    <button
      type='button'
      className='text-sm px-5 py-3 rounded-lg uppercase font-bold bg-green-600 text-white text-center hover:bg--700 flex gap-2 items-center justify-center'
      onClick={handleModalTarea}
    >
       <img src={`/icons/icons8-plus.svg`} alt="Nueva tarea" className='w-6 h-6' />
      Añadir Tarea
    </button>
  )}
</div>

<div className='bg-white shadow mt-10 rounded-lg'>
  {event.tasks?.length ? (
    event.tasks?.map((task) => <Task key={task._id} task={task} />)
  ) : (
    <p className='text-center my-5 p-10'>No hay tareas en este evento</p>
  )}
</div>



{admin && (
  <>
    <div className='flex items-center justify-between mt-10'>
      <p className='font-bold text-xl'>👤Invitados del evento:</p>
      <Link
        to={`/events/nuevo-colaborador/${event._id}`}
        className='text-sm px-5 py-3 rounded-lg uppercase font-bold bg-green-600 text-white text-center hover:bg-green-700 flex gap-2 items-center justify-center'
      >
        {/* Puedes agregar aquí el SVG o ícono que desees */}
        <img src={`/icons/icons8-plus.svg`} alt="Añadir" className='w-6 h-6' />
        Añadir invitados
      </Link>
    </div>
    <div className='bg-white shadow mt-10 rounded-lg'>
      {event.colaborators?.length ? (
        event.colaborators?.map((colaborator) => (
          <Colaborator key={colaborator._id} colaborator={colaborator} />
        ))
      ) : (
        <p className='text-center my-5 p-10'>No hay invitados en este evento</p>
      )}
    </div>
  </>
)}

 
      <ModalFormularioTarea />
      <ModalEliminarTarea />
      <ModalEliminarColaborador />
    </>
  )
}
 
export default Evento
