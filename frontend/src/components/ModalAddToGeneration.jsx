import { Fragment, useEffect, useState } from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { useGenerations } from '../hooks/useGenerations'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ModalAddToGeneration = () => {
    const [selectedRole, setSelectedRole] = useState('Seleccionar');
    const [positions, setPositions] = useState([
        'Primera línea',
        'Segunda línea',
        'Tercera línea',
        'Medios',
        'Centros',
        'Extremos',
    ]);

    const handleRoleChange = (e) => {
        const value = e.target.value;
        setSelectedRole(value);

        if (value === 'Fordwards') {
            setPositions(['Primera línea', 'Segunda línea', 'Tercera línea']);
        } else if (value === 'Backs') {
            setPositions(['Medios', 'Centros', 'Extremos']);
        } else {
            setPositions([
                'Primera línea',
                'Segunda línea',
                'Tercera línea',
                'Medios',
                'Centros',
                'Extremos',
            ]);
        }
    };

    const [newPlayers, setNewPlayers] = useState([]);
    const { modalAddToGeneration, handleModalAddToGeneration, usersResult, setSearch, addPlayerToGeneration } = useGenerations();
    const [filteredPlayers, setFilteredPlayers] = useState([]);

    useEffect(() => {
        const newPlayersIds = newPlayers.map(player => player._id);
        setFilteredPlayers(
            usersResult.filter(player => !newPlayersIds.includes(player._id))
        );
    }, [usersResult]);

    const handleSelectPlayer = (player) => {
        setNewPlayers([
            ...newPlayers,
            player
        ])

        setSearch('');
    }

    const handleOnChange = (player) => {
        handleSelectPlayer(player)
    }

    const handleRemovePLayer = (player) => {
        setNewPlayers(newPlayers.filter(p => p._id !== player._id))
    }

    const handleOnBlur = () => {
        setTimeout(() => {
            setSearch('')
        }, 200)
    }

    const handleAddPlayers = async () => {
        const data = newPlayers.map(p => p._id);
        await addPlayerToGeneration(data);
    }

    return (
        <Transition.Root show={modalAddToGeneration} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleModalAddToGeneration}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={handleModalAddToGeneration}
                                >
                                    <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-lg text-center leading-6 font-bold text-gray-900">
                                        Agregar Jugador
                                    </Dialog.Title>

                                    <Combobox
                                        as="div"
                                        className="mx-auto mt-3 max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
                                        onChange={(e) => handleOnChange(e)}
                                    >
                                        <div className="relative">
                                            <Combobox.Input
                                                className="h-12 w-full border-0 bg-transparent pl-4 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                                                placeholder="Buscar..."
                                                onChange={e => setSearch(e.target.value)}
                                                onBlur={() => handleOnBlur()}
                                            />
                                        </div>

                                        {filteredPlayers.length > 0 && (
                                            <Combobox.Options static
                                                className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
                                            >
                                                {filteredPlayers.map(user => (
                                                    <Combobox.Option
                                                        key={user._id}
                                                        value={user}
                                                        className={({ active }) => classNames('cursor-default select-none px-4 py-2', active && 'bg-sky-600 text-white')}
                                                        onClick={() => handleSelectPlayer(user)}
                                                    >
                                                        {user.name}
                                                    </Combobox.Option>
                                                ))}
                                            </Combobox.Options>
                                        )}
                                    </Combobox>
                                    <div className='pt-4 pb-4 '>
                                        <h1>Jugadores añadidos:</h1>
                                    </div>
                                    {newPlayers.length > 0 && (
                                        newPlayers.map(player => (
                                            <div className=" bg-green-100 border-b p-2 pt-4 rounded-lg font-bold flex flex-col md:flex-row justify-between " key={player._id}>
                                                <div className="flex- items-center gap-2">
                                                    <p className="flex-1">
                                                        {player.name}
                                                    </p>
                                                </div>
                                                <img
                                                    src="/icons/icons8-cancel-94.png"
                                                    alt="Remove player"
                                                    className="w-7 h-7 text-black-500 hover:text-black hover:cursor-pointer"
                                                    onClick={() => handleRemovePLayer(player)}
                                                    onKeyDown={() => handleRemovePLayer(player)}
                                                />
                                            </div>

                                        ))
                                    )}

                                    <div>
                                        <div className="mt-3">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Roles
                                            </label>
                                            <select
                                                className="mt-1 w-full py-2 px-3 border rounded-md"
                                                value={selectedRole}
                                                onChange={handleRoleChange}
                                            >
                                                <option>Seleccionar</option>
                                                <option>Fordwards</option>
                                                <option>Backs</option>
                                            </select>
                                        </div>

                                        <div className="mt-3">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Posición
                                            </label>
                                            <select className="mt-1 w-full py-2 px-3 border rounded-md">
                                                <option>Seleccionar</option>
                                                {positions.map((position, index) => (
                                                    <option key={index}>{position}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className='w-full flex justify-end'>
                                        <button
                                            onClick={() => handleAddPlayers()}
                                            className='text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-600 text-white text-center hover:bg-sky-700 mt-5 flex gap-2 items-center justify-center'
                                        >{newPlayers.length > 1 ? 'Agregar Jugadores' : 'Agregar Jugador'}</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalAddToGeneration