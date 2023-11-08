import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from 'react-router-dom'
import useAuth from "../hooks/useAuth";


const EventosContext = createContext();

const EventosProvider = ({ children }) => {

    const { auth } = useAuth();

    const [events, setEvents] = useState([])
    const [alerta, setAlerta] = useState({})
    const [event, setEvent] = useState({})
    const [cargando, setCargando] = useState(false)
    const [task, setTask] = useState({})
    const [colaborador, setColaborador] = useState({})



    const [modalFormularioTarea, setModalFormularioTarea] = useState(false)
    const [modalEliminarTarea, setModalEliminarTarea] = useState(false)
    const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false)
    const [buscador, setBuscador] = useState(false)




    const navigate = useNavigate();
    useEffect(() => {
        const obtenerEventos = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) return

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios('/events', config)
                setEvents(data)
                setAlerta({})
            } catch (error) {
                console.log(error)
            }
        }
        obtenerEventos()
    }, [auth])


    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 5000)
    }

    const submitEvento = async event => {
        if (event.id) {
            await editarEvento(event)
        }
        else {
            await nuevoEvento(event);
        }
        return

    }

    const editarEvento = async event => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/events/${event.id}`, event, config)


            // sincronizar state
            const eventosActualizados = events.map(eventoState => eventoState._id === data._id ? data : eventoState)
            setEvents(eventosActualizados)

            setAlerta({
                msg: 'Evento actualizado correctamente',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
                navigate('/events')
            }, 3000)
        } catch (error) {
            console.log(error)
        }
    }

    const nuevoEvento = async event => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/events', event, config)

            setEvents([...events, data])

            setAlerta({
                msg: 'Evento creado correctamente',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
                navigate('/events')
            }, 3000)
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerEvento = async id => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios(`/events/${id}`, config)
            if (!token) return
            if (data.deactivated) {
                // Show alert or handle deactivated event here
                setAlerta({
                    msg: 'Este evento ya no existe',
                    error: true
                })
                setTimeout(() => {
                    setAlerta({})
                    navigate('/events')
                }, 3000)
                return;
            }

            setEvent(data)

        } catch (error) {
            navigate("/events")
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } finally {
            setCargando(false)
        }
    }


    const borrarEvento = async id => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            await clienteAxios.delete(`/events/${id}`, config)

            // Update state to remove the deleted event
            setEvents(events.filter(event => event._id !== id))

            setAlerta({
                msg: 'Evento eliminado correctamente',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
                navigate('/events')
            }, 3000)
        } catch (error) {
            console.log(error)
        }
    }


    const handleModalTarea = () => {
        setModalFormularioTarea(!modalFormularioTarea)
        setTask({})
    }

    const submitTarea = async tarea => {
        if (tarea?.id) {
            await editarTarea(tarea);
        } else {
            try {
                const token = localStorage.getItem('token')
                if (!token) return

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios.post('/tasks', tarea, config)

                //Agregando tarea al state
                const updatedEvent = { ...event }
                updatedEvent.tasks = [...event.tasks, data]
                setEvent(updatedEvent)
                setAlerta({})
                setModalFormularioTarea(false)

            } catch (error) {
                console.log(error)
            }
        }
    }


    const crearTarea = async tarea => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post("/tasks", tarea, config);

            // Agregar la tarea al state

            setAlerta({});
            setModalFormularioTarea(false);
        } catch (error) {
            console.log(error);
        }
    }

    const editarTarea = async tarea => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/tasks/${tarea.id}`, tarea, config)
            const updatedEvent = { ...event }
            updatedEvent.tasks = updatedEvent.tasks.map(taskState => taskState._id === data._id ? data : taskState)
            setEvent(updatedEvent)
            setAlerta({})
            setModalFormularioTarea(false)

        } catch (error) {
            console.log(error)
        }
    }


    const handleModalEditarTarea = tarea => {
        setTask(tarea)
        setModalFormularioTarea(true)
    }

    const handleModalEliminarTarea = tarea => {
        setTask(tarea)
        setModalEliminarTarea(!modalEliminarTarea)
    }

    const eliminarTarea = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/tasks/${task._id}`, config)
            setAlerta({
                msg: data.msg,
                error: false
            })

            const updatedEvent = { ...event }
            updatedEvent.tasks = updatedEvent.tasks.filter(tareaState => tareaState._id !== task._id)
            setEvent(updatedEvent)
            setModalEliminarTarea(false)
            setTask({})
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const submitColaborador = async email => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/events/colaboradores', { email }, config)

            setColaborador(data)
            setAlerta({})
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        } finally {
            setCargando(false)
        }
    }

    const agregarColaborador = async email => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post(`/events/colaboradores/${event._id}`, email, config)
            setAlerta({
                msg: data.msg,
                error: false
            })
            setColaborador({})
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const handleModalEliminarColaborador = (colaborator) => {
        setModalEliminarColaborador(!modalEliminarColaborador)
        setColaborador(colaborator)
    }

    const eliminarColaborador = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post(`/events/eliminar-colaborador/${event._id}`, { id: colaborador._id }, config)

            const updatedEvent = { ...event }
            updatedEvent.colaborators = updatedEvent.colaborators.filter(colaboradorState => colaboradorState._id !== colaborador._id)
            setEvent(updatedEvent)

            setAlerta({
                msg: data.msg,
                error: false
            })
            setModalEliminarColaborador(false)
            setColaborador({})
            setTimeout(() => {
                setAlerta({})
            }, 3000);


        } catch (error) {
            console.log(error.response)
        }

    }


    const completarTarea = async id => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post(`/tasks/state/${id}`, {}, config)

            const updatedEvent = { ...event }
            updatedEvent.tasks = updatedEvent.tasks.map(taskState => taskState._id === data._id ? data : taskState)

            setEvent(updatedEvent)
            setTask({})
            setAlerta({})
        } catch (error) {
            console.log(error.response)
        }
    }

    const handleBuscador = () => {
        setBuscador(!buscador)
    }


    return (
        <EventosContext.Provider
            value={{
                events,
                mostrarAlerta,
                alerta,
                submitEvento,
                obtenerEvento,
                event,
                cargando,
                borrarEvento,
                modalFormularioTarea,
                handleModalTarea,
                submitTarea,
                handleModalEditarTarea,
                task,
                modalEliminarTarea,
                handleModalEliminarTarea,
                eliminarTarea,
                submitColaborador,
                colaborador,
                crearTarea,
                agregarColaborador,
                modalEliminarColaborador,
                handleModalEliminarColaborador,
                eliminarColaborador,
                completarTarea,
                buscador,
                handleBuscador
            }}
        >{children}</EventosContext.Provider>
    )


}


export { EventosProvider }

export default EventosContext;