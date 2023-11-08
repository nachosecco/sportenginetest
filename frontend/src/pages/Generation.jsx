import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { useGenerations } from '../hooks/useGenerations'
import useCoach from '../hooks/useCoach';
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta';
import CustomConfirmationDialog from '../components/CustomConfirmationDialog';
import ModalAddToGeneration from '../components/ModalAddToGeneration';
import { useLineUps } from '../hooks/useLineUps';
import PreviewLineUps from '../components/PreviewLineUps';
import defaultPlayerImage from '/icons/icons8-player-male-96.png';

const Generation = () => {
    const params = useParams();
    const {
        showAlert, alert, handleGeneration, generation, removePlayerFromGeneration, deletePlayerVisible,
        setDeletePlayerVisible, loading, deleteGeneration, deleteGenerationVisible,
        setDeleteGenerationVisible, handleModalAddToGeneration
    } = useGenerations();

    const {
        lineUps,
        getLineUps
    } = useLineUps();

    const coach = useCoach();

    const [name, setName] = useState('');
    const [player, setPlayer] = useState('');
    const [editDisabled, setEditDisabled] = useState(true);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [isDeleteMode, setDeleteMode] = useState(false);

    const toggleDeleteMode = () => {
        setDeleteMode(!isDeleteMode);
        setSelectedPlayers([]);
    }

    const togglePlayerSelection = (playerId) => {
        setSelectedPlayers(prevState =>
            prevState.includes(playerId)
                ? prevState.filter(id => id !== playerId)
                : [...prevState, playerId]
        );
    };

    const handleBulkDelete = async () => {
        selectedPlayers.forEach(async (playerId) => {
            await removePlayerFromGeneration(playerId);
        });
        setSelectedPlayers([]);
    };

    useEffect(() => {
        handleGeneration(params.id);
        getLineUps(params.id)
    }, [])

    useEffect(() => {
        setName(generation.name);
    }, [generation])

    const handleEditName = async (name) => {

        if (editDisabled) {
            setEditDisabled(false);
            return;
        }

        if (generation.name === name) {
            setEditDisabled(true);
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

            const { data } = await clienteAxios.put(`/generations/${params.id}`, { name }, config);
            setName(data.name);

            showAlert({
                msg: 'Nombre modificado correctamente'
            })

        } catch (error) {
            showAlert({
                msg: error.response.data.message,
                error: true
            })
        } finally {
            setEditDisabled(true);

            setTimeout(() => {
                showAlert({})
            }, 5000);
        }

    }

    const handleDeleteGeneration = async () => {
        await deleteGeneration(params.id);
    }

    const handleDeletePlayer = async () => {
        await removePlayerFromGeneration(player);
    }

    if (loading) {
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

    const { msg } = alert;

    return (
        <>
            {msg && <Alerta
                alerta={alert}
            />}

            <div className=" flex  flex-col mb-4">
                <div className='flex flex-col md:flex-row justify-between rounded-xl m-3'>
                    <div className='w-full rounded-lg p-2 mb-4 md:mb-0 text-left'>
                        {editDisabled ? (
                            <h1 className={'font-black text-4xl md:text-left'}>{name}</h1>
                        ) : (
                            <input
                                className='font-black text-4xl rounded-lg border w-full md:w-auto md:text-left'
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        )}
                    </div>

                    {coach && (
                        <div className='flex flex-col md:flex-row items-center gap-4 text-gray-500 hover:text-black w-full md:w-auto'>
                            <div className='flex items-center justify-center gap-2 cursor-pointer bg-orange-600 hover:bg-orange-500 text-white rounded-lg px-5 py-3 w-full mb-2 md:mb-0 md:w-auto' onClick={() => handleEditName(name)}>
                                <img
                                    src="/icons/icons8-edit.svg"
                                    className='w-6 h-6'
                                />
                                <span className='uppercase font-bold text-sm'>
                                    Editar
                                </span>
                            </div>
                            <div className='flex items-center justify-center gap-2 cursor-pointer bg-red-600 hover:bg-red-500 text-white rounded-lg px-5 py-3 w-full md:w-auto' onClick={() => setDeleteGenerationVisible(true)}>
                                <img
                                    src="/icons/icons8-trash.svg"
                                    className='w-6 h-6'
                                />
                                <span className='uppercase font-bold text-sm'>
                                    Borrar
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>



            <div className="p-5 rounded-lg border-2 bg-white border-black flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center mb-4 lg:mb-0">
                    <img src="/icons/icons8-rugby-players.png" alt="Icono de Jugadores" className="w-12 h-12 mr-2" />
                    <p className="font-bold text-xl">Jugadores de {generation.name}</p>
                </div>
                <div className="flex justify-end items-center p-3 mb-4 lg:mb-0 lg:flex-grow">
                    <span className="mr-3 font-semibold text-black">Filtrar por posición :</span>
                    <select className="rounded-lg bg-white border border-black text-black p-2">
                        <option value="all">Todos</option>
                        <option value="primeras">PRIMERAS</option>
                        <option value="segundas">SEGUNDAS</option>
                        <option value="terceras">TERCERAS</option>
                        <option value="medios">MEDIOS</option>
                        <option value="centros">CENTROS</option>
                        <option value="fondo">FONDO</option>
                    </select>
                </div>
                {coach && (
                    <div className="flex gap-2 lg:gap-2">
                        <button
                            type="button"
                            className="text-sm px-1 py-1 rounded-lg border-2 border-green-800 bg-green-600 text-white hover:bg-green-700 flex gap-1 items-center justify-center lg:px-2 lg:py-2"
                            onClick={handleModalAddToGeneration}
                        >
                            <img src="/icons/icons8-plus.svg" alt="Icono de Agregar Jugadores" className="w-6 h-6 lg:w-6 lg:h-6" />
                            Añadir Jugador
                        </button>
                        <button
                            type="button"
                            className="text-sm px-1 py-1 rounded-lg border-2 border-red-800 bg-red-600 text-white hover:bg-red-700 flex gap-1 items-center justify-center lg:px-2 lg:py-2"
                            onClick={toggleDeleteMode}
                        >
                            <img src="/icons/icons8-cancel-94.png" alt="Icono de Eliminar Jugador" className="w-6 h-6 lg:w-6 lg:h-6" />
                            {isDeleteMode ? 'Selecciona el jugador a eliminar' : 'Eliminar Jugador'}
                        </button>
                    </div>
                )}
            </div>


            <div className="relative">

                <div className="max-h-[30rem] overflow-y-auto custom-scrollbar rounded-xl my-4 border-2 border-black">
                    {generation.players?.length ? (
                        generation.players.map((player) => (
                            <div
                                className={`border-b last:border-b-0 border-lightBlue-300 p-5 flex flex-col md:flex-row justify-center md:justify-between items-center 
            ${isDeleteMode ? 'hover:bg-red-400 hover:text-white' : 'bg-white'}`}
                                key={player._id}
                                onClick={isDeleteMode ? () => togglePlayerSelection(player._id) : null}
                            >
                                <div className="flex flex-col md:flex-row items-center gap-2">
                                    <img src={defaultPlayerImage} alt="Player" className="w-16 h-16 rounded-full md:w-10 md:h-10 block md:hidden mx-auto" />
                                    <img src={defaultPlayerImage} alt="Player" className="w-10 h-10 rounded-full hidden md:block" />
                                    <div className="text-center md:text-left">
                                        <p className="flex-1 text-black font-semibold">
                                            {player.name}
                                        </p>
                                        <span className="text-white bg-blue-600 rounded-lg p-1 font-semibold md:hidden">
                                            {player.position} Posición
                                        </span>
                                    </div>
                                </div>

                                <div className="hidden md:block mt-2 md:mt-0 flex-row items-center justify-start gap-4">
                                    <span className="text-white bg-blue-600 rounded-lg p-1 font-semibold">
                                        {player.position} Posición
                                    </span>
                                    <Link
                                        to={`/profilePlayer/${player._id}`}
                                        className="text-sm px-4 py-2 rounded-lg uppercase font-bold bg-blue-600 text-white hover:bg-blue-700 flex gap-2 items-center justify-center"
                                    >
                                        <img src="/icons/perfil-icon.png" alt="Ver Perfil" className="w-6 h-6 mr-2" />
                                        Ver perfil
                                    </Link>
                                </div>

                            </div>
                        ))
                    ) : (
                        <p className="text-center my-5 p-10 text-lightBlue-300">No hay jugadores en esta generación</p>
                    )}
                </div>

            </div>

            <div className="bg-sky-100 p-5 rounded-lg mt-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img src="/icons/icons8-formation.png" alt="Icono de Alineaciones" className="w-12 h-12 mr-2" />
                        <p className="font-bold text-xl"> Alineaciones de  <span>{generation.name}</span></p>
                    </div>
                    <Link
                        className="text-sm px-5 py-3 rounded-lg uppercase font-bold bg-sky-600 text-white hover:bg-sky-700 flex gap-2 items-center justify-center"
                        to={`/generations/${params.id}/lineups`}
                    >
                        <img src="/icons/icons8-plus.svg" alt="Icono de Agregar Alineación" className="w-6 h-6 mr-2" />
                        Agregar Alineación
                    </Link>
                </div>
            </div>

            <div className="shadow mt-5 rounded-lg">
                {lineUps?.length > 0 ? (
                    lineUps?.map((lineUp) => (
                        <PreviewLineUps
                            key={lineUp._id}
                            lineUp={lineUp}
                        />
                    ))
                ) : (
                    <p className="text-center my-5 p-10">No hay alineaciones en esta generación</p>
                )}
            </div>


            <CustomConfirmationDialog message="¿Estás seguro de que deseas eliminar esta Generación?"
                onConfirm={handleDeleteGeneration} isVisible={deleteGenerationVisible} setIsVisible={setDeleteGenerationVisible} />

            <CustomConfirmationDialog message="¿Estás seguro de que deseas eliminar este Jugador?"
                onConfirm={handleBulkDelete} isVisible={deletePlayerVisible} setIsVisible={setDeletePlayerVisible} />
            <CustomConfirmationDialog message="¿Estás seguro de que deseas eliminar los jugadores seleccionados?"
                onConfirm={handleBulkDelete} isVisible={isDeleteMode && selectedPlayers.length > 0} setIsVisible={() => setSelectedPlayers([])} />

            <ModalAddToGeneration />
        </>
    )
}

export default Generation