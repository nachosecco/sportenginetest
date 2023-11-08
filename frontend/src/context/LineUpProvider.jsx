import { createContext, useMemo, useState, useEffect } from "react";
import { useGenerations } from "../hooks/useGenerations";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const LineUpContext = createContext();

export const LineUpProvider = ({ children }) => {
    const { generation, showAlert, setLoading } = useGenerations();
    const navigate = useNavigate();

    const [lineUp, setLineUp] = useState({});
    const [lineUps, setLineUps] = useState([]);
    const [deleteLineUpVisible, setDeleteLineUpVisible] = useState(false);

    const handleNewLineUp = () => {
        setLineUp({});
    }

    const createLineUp = async (newData) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/lineups', newData, config);
            showAlert({
                msg: 'Alineación creada correctamente'
            })

            setTimeout(() => {
                navigate(`/generations/${generation._id}`)
            }, 2000)
        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const getLineUps = async (id) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios(`/lineups/${id}/generation`, config);

            setLineUps(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getLineUp = async (id) => {
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

            const { data } = await clienteAxios(`/lineups/${id}`, config);
            setLineUp(data);
        } catch (error) {
            setLineUp({});
        }

        setLoading(false);
    }

    const editLineUp = async (editLineUp) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/lineups/${lineUp._id}`, editLineUp, config);

            showAlert({
                msg: 'Alineación actualizada correctamente'
            })

            setTimeout(() => {
                navigate(`/generations/${generation._id}`)
            }, 2000)
        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const deleteLineUp = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/lineups/${lineUp._id}`, config)
            showAlert({
                msg: data.msg
            })
            setTimeout(() => {
                navigate(`/generations/${generation._id}`)
            }, 2000)
        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const memoValues = useMemo(() => ({
        lineUp,
        lineUps,
        deleteLineUpVisible,
        createLineUp,
        getLineUps,
        getLineUp,
        editLineUp,
        handleNewLineUp,
        setDeleteLineUpVisible,
        deleteLineUp
    }), [lineUp, lineUps, deleteLineUpVisible]);

    return (
        <LineUpContext.Provider
            value={memoValues}
        >
            {children}
        </LineUpContext.Provider>
    )
}

export default LineUpContext;