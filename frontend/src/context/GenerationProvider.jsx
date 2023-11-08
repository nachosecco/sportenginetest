import { createContext, useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const GenerationContext = createContext();

export const GenerationProvider = ({ children }) => {
    const { auth } = useAuth();

    const [alert, setAlert] = useState({});
    const [generations, setGenerations] = useState([]);
    const [generation, setGeneration] = useState({});
    const [loading, setLoading] = useState(false);

    const [deleteGenerationVisible, setDeleteGenerationVisible] = useState(false);
    const [deletePlayerVisible, setDeletePlayerVisible] = useState(false);

    const [usersResult, setUsersResult] = useState([]);
    const [search, setSearch] = useState('');

    const [modalAddToGeneration, setModalAddToGeneration] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const getGenerations = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) return

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios('/generations', config)
                setGenerations(data)
                setAlert({})
            } catch (error) {
                console.log(error)
            }
        }
        getGenerations()
    }, [auth])

    useEffect(() => {
        const searchUsers = async () => {
            if (search.length < 2) {
                setUsersResult([])
                return;
            }

            try {
                const token = localStorage.getItem('token')
                if (!token) return

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios(`/users/${search}`, config);

                const generationPlayers = generation.players.map(player => player._id);
                const filteredData = data.filter(user => !generationPlayers.includes(user._id));

                setUsersResult(filteredData);
            } catch (error) {
                setAlert({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }

        searchUsers();
    }, [search])

    const showAlert = (alert) => {
        setAlert(alert);

        setTimeout(() => {
            setAlert({})
        }, 2000)
    }

    const addGeneration = (generation) => {
        setGenerations([
            ...generations,
            generation
        ])
    }

    const removeGeneration = (id) => {
        setGenerations(generations.filter(g => g._id !== id));
    }

    const submitGeneration = async (name) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/generations', { name }, config);
            addGeneration(data);
            showAlert({
                msg: 'Generación creada correctamente'
            })

            setTimeout(() => {
                navigate('/generations')
            }, 1500)
        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const handleGeneration = async (id) => {
        setLoading(true);

        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios(`/generations/${id}`, config);
            setGeneration(data);
        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            })
        }

        setLoading(false);
    }

    const deleteGeneration = async (id) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/generations/${id}`, config);
            removeGeneration(id);

            showAlert({
                msg: data.msg
            })
        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            })
        }

        navigate('/generations')
    }

    const handleModalAddToGeneration = () => {
        setModalAddToGeneration(!modalAddToGeneration);
    }

    const addPlayerToGeneration = async (players) => {
        const token = localStorage.getItem('token')
        if (!token) return

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.put('/generations/players/add', { generation: generation._id, players }, config);

            setGeneration(data);
            if (players.length > 1) {
                showAlert({
                    msg: 'Jugadores agregados correctamente'
                })
            } else {
                showAlert({
                    msg: 'Jugador agregado correctamente'
                })
            }
        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            })
        }

        handleModalAddToGeneration();
    }

    const removePlayerFromGeneration = async (player) => {
        const token = localStorage.getItem('token')
        if (!token) return

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.put('/generations/players/remove', { player, generation: generation._id }, config);

            setGeneration(data);
            showAlert({
                msg: 'Jugador eliminado correctamente'
            })
        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const memoValues = useMemo(() => ({
        generations,
        alert,
        generation,
        loading,
        deleteGenerationVisible,
        modalAddToGeneration,
        usersResult,
        search,
        deletePlayerVisible,
        submitGeneration,
        showAlert,
        handleGeneration,
        deleteGeneration,
        setDeleteGenerationVisible,
        handleModalAddToGeneration,
        setSearch,
        addPlayerToGeneration,
        removePlayerFromGeneration,
        setDeletePlayerVisible,
        setLoading
    }), [generations, alert, generation, loading, deleteGeneration, deletePlayerVisible, modalAddToGeneration, usersResult, search]);

    return (
        <GenerationContext.Provider value={memoValues}>
            {children}
        </GenerationContext.Provider>
    )
}

export default GenerationContext;