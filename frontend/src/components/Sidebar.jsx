import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { removeAccents } from '../helpers/removeAccents';
import InviteModal from './InviteModal';

const Sidebar = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const [path, setPath] = useState('');
  const [showPlayerInfo, setShowPlayerInfo] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const { isVisible, setIsVisible } = useAuth();
  const handleInviteButtonClick = () => setIsInviteModalOpen(true);
  const handleModalClose = () => setIsInviteModalOpen(false);

  console.log(auth.role);
  // Print role name in console
    console.log(auth.role.name);

  const club = {
    name: "Trebol Rugby",
    logo: "/icons/trebol.png",
  };

  useEffect(() => {
    const currentPath = location.pathname.split('/')[1];
    setPath(currentPath);

    switch (currentPath) {
      case 'events':
        setPath('Evento');
        break;
      case 'generations':
        setPath('categoría');
        break;
      default:
        break;
    }

    setShowPlayerInfo(currentPath.startsWith('perfil'));
  }, [location]);

  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:2-1/6 px-5 py-5 sidebar animate__animated animate__fadeInLeft">
      <div className="flex flex-grow justify-center items-center">
        <h1 className="logo-font text-center my-4 text-white text-4xl sm:text-4xl md:text-4xl animate__animated animate__fadeInDown italic">SCRUMALYTICS</h1>
      </div>
      <div className="border-b border-white"></div>
      <div className=" items-center">
        <p className="text-xl font-bold text-center p-2">
          <img
            src="/icons/iconuser.png"
            alt={`Imagen de ${auth.name}`}
            className="inline-block h-6 w-6 mr-2"
          />
          Hola, {auth.name}
        </p>
      </div>


      {showPlayerInfo && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Información del Jugador</h2>
          <p>Peso: 100kg</p>
          <p>Estatura: 1.85m</p>
          <p>Posición: Delantero</p>
          <img className="w-32 h-32 rounded-full mt-4" src="/path/to/player-image.jpg" alt="Jugador" />
        </div>
      )}

      <Link
        to={path === 'calendar' ? `crear-${removeAccents('Evento')}` : `crear-${removeAccents(path)}`}
        className="bg-green-600 hover:bg-green-700 text-white uppercase font-bold block mt-5 text-center rounded-lg p-3"
      >
        {path === 'calendar' ? `🗓️ Crear Evento` : `🗓️ Crear ${path}`}
      </Link>

      <nav className="my-6">
        <div className="border-b border-white mt-2"></div>
        <Link to="/inicio" className="flex items-center py-2 text-white gap-2">
          <img src="/icons/icons8-home-48.png" alt="Inicio" className="w-5 h-5" />
          Inicio
        </Link>
        <Link to="/events" className="flex items-center py-2 text-white gap-2">
          <img src="/icons/icons8-today-48.png" alt="Eventos" className="w-5 h-5" />
          Eventos
        </Link>
        <Link to="/calendar" className="flex items-center py-2 text-white gap-2">
          <img src="/icons/icons8-calendar-48.png" alt="Calendario" className="w-5 h-5" />
          Calendario de eventos
        </Link>
        <Link to="/generations" className="flex items-center py-2 text-white gap-2">
          <img src="/icons/icons8-formation.png" alt="Categorías" className="w-5 h-5" />
          Categorías
        </Link>
      </nav>
      <div className="mt-5">
        <div className="border-b border-white mt-2"></div>
        <h2 className="text-xl text-center font-semibold mb-2">{club.name}</h2>
        <img className="w-16 h-16 mx-auto" src={club.logo} alt={`${club.name} logo`} />
        <div className="border-b border-white mt-2"></div>
        {auth.role.name === 'Admin' && (
        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="w-full bg-green-600 hover:bg-green-700 text-white uppercase font-bold mt-5 text-center rounded-lg p-3"
        >
          Invite New Members
        </button>
        )}
      <InviteModal
        isOpen={isInviteModalOpen}
        onRequestClose={handleModalClose}
      />
      </div>
    </aside>
  );
};

export default Sidebar;
