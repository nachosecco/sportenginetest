import { useState, useEffect } from 'react';
import useEventos from '../hooks/useEventos';
import PreviewEvents from '../components/PreviewEvents';
import Alerta from '../components/Alerta';
import Pagination from '../components/Pagination';

const Eventos = () => {
  const { handleBuscador, events, alerta } = useEventos();
  const { msg } = alerta;

  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(6);
  const [currentEvents, setCurrentEvents] = useState([]);

  useEffect(() => {
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const newCurrentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    setCurrentEvents(newCurrentEvents);
  }, [currentPage, events]);

  const totalPages = Math.ceil(events.length / eventsPerPage);

  return (
    <>
      <div className='font-sans animate__animated animate__fadeIn' style={{ fontFamily: 'Nunito' }}>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <h1 className='text-4xl md:text-4xl font-black text-center md:text-left mb-4 md:mb-0'>
            🗓️ Eventos
          </h1>
          <button
            type='button'
            className='font-bold text-base uppercase bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full w-full md:w-auto'
            onClick={handleBuscador}
          >
            🔍 Buscar Eventos
          </button>
        </div>
        {msg && <Alerta alerta={alerta} />}
        <div>

          {currentEvents.length ? (
            currentEvents.map((event) => (
              <PreviewEvents key={event._id} event={event} />
            ))
          ) : (
            <p className='text-center text-gray-600 uppercase p-5'>
              No hay eventos aún
            </p>
          )}
        </div>
        <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </>
  );
};

export default Eventos;
