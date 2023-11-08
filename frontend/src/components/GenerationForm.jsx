import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import Alerta from "./Alerta"
import useEventos from "../hooks/useEventos"
import { useGenerations } from "../hooks/useGenerations"

const GenerationFrom = () => {
    const { submitGeneration, showAlert, alert } = useGenerations();

    const [name, setName] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name === '') {
            showAlert({
                msg: 'El nombre de la categoría es requerido',
                error: true
            })
            return
        }

        await submitGeneration(name);
    }

    const { msg } = alert;

    return (
        <form
            className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'
            onSubmit={handleSubmit}
        >
            {msg && <Alerta alerta={alert} />}
            <div className="mb-5">
                <label
                    className='text-gray-700 uppercase font-bold text-sm'
                    htmlFor='name'
                >
                    Nombre de la categoría:
                </label>
                <input type="text"
                    id='name'
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    placeholder='Nombre de la categoría'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <input
                type='submit'
                value='Crear Categoría'
                className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors'
            />
        </form>
    )
}

export default GenerationFrom