import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useEventos from "../hooks/useEventos"
import Alerta from "./Alerta"

const FormularioEvento = () => {
    const [id, setId] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [client, setClient] = useState('')

    const params = useParams();
    const { mostrarAlerta, alerta, submitEvento, event } = useEventos();

    useEffect(() => {
        if(params.id) {
            setId(event._id)
            setName(event.name)
            setDescription(event.description)
            setDate(event.date?.split('T')[0])
            setClient(event.client)
        } else {
            console.log("nuevo evento")

        }
    }, [params])

const handleSubmit = async e => {
    e.preventDefault();
    if([name, description, date, client].includes('')) {
        mostrarAlerta({
            msg: 'Todos los campos son obligatorios',
            error:true
        })
        return
    }
    //Pasar datos hacia el provider
    await submitEvento({ id, name, description, date, client })

    setId(null)
    setName('')
    setDescription('')
    setDate('')
    setClient('')
}

const { msg } = alerta

  return (
    <form 
        className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow font-Nunito'
        onSubmit={handleSubmit}
    >
        {msg && <Alerta alerta={alerta} />}
        <div className="mb-5">
            <label
            className='text-gray-700 uppercase font-bold text-sm'
            htmlFor='name'
            >
                📆 Nombre del evento
            </label>
            <input type="text"
                id='name'
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                placeholder='Nombre del evento'
                value={name}
                onChange={(e) => setName(e.target.value)}
             />
        </div>

        <div className="mb-5">
            <label
            className='text-gray-700 uppercase font-bold text-sm'
            htmlFor='despcripcion'
            >
               🗒️ Descripción
            </label>
            <textarea 
                id='description'
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                placeholder='Descripción del evento'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
             />
        </div>
        <div className="mb-5">
            <label
            className='text-gray-700 uppercase font-bold text-sm'
            htmlFor='fecha-entrega'
            >
                📅📌Fecha
            </label>
            <input type="date"
                id='fecha-entrega'
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={date}
                onChange={(e) => setDate(e.target.value)}
             />
        </div>
        <div className="mb-5">
            <label
            className='text-gray-700 uppercase font-bold text-sm'
            htmlFor='name'
            >
                👤Nombre del asignado:
            </label>
            <input type="text"
                id='client'
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                placeholder='Nombre del jugador'
                value={client}
                onChange={(e) => setClient(e.target.value)}
             />
        </div>

        <input
            type='submit'
            value={id ? 'Actualizar Evento' : 'Crear Evento'}
            className='bg-green-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-green-700 transition-colors'
        />
    </form>
  )
}

export default FormularioEvento;