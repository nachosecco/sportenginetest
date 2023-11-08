import { useState, useEffect } from 'react';
import Alerta from '../components/Alerta';
import PreviewGenerations from '../components/PreviewGenerations';
import { useGenerations } from '../hooks/useGenerations';
import Pagination from '../components/Pagination'; 

const Generations = () => {
  const { generations, alert } = useGenerations();
  const { msg } = alert;

  const [currentPage, setCurrentPage] = useState(1);
  const [generationsPerPage] = useState(6);
  const [currentGenerations, setCurrentGenerations] = useState([]);

  useEffect(() => {
    const indexOfLastGeneration = currentPage * generationsPerPage;
    const indexOfFirstGeneration = indexOfLastGeneration - generationsPerPage;
    const newCurrentGenerations = generations.slice(indexOfFirstGeneration, indexOfLastGeneration);

    setCurrentGenerations(newCurrentGenerations);
  }, [currentPage, generations]);

  const totalPages = Math.ceil(generations.length / generationsPerPage);

  return (
    <>
            <div className='flex flex-col md:flex-row justify-between items-center'>
          <h1 className='text-4xl md:text-4xl font-black text-center md:text-left mb-4 md:mb-0'>
            🗓️ Categorías
          </h1>
          <button
            type='button'
            className='font-bold text-base uppercase bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full w-full md:w-auto'
          >
            🔍 Buscar Categorías
          </button>
        </div>
      {msg && <Alerta alerta={alert} />}

      <div className="bg-white shadow mt-10 rounded-lg">
        {currentGenerations.length > 0 ? (
          currentGenerations.map(generation => (
            <PreviewGenerations key={generation._id} generation={generation} />
          ))
        ) : (
          <p className="text-center text-gray-600 uppercase p-5">No hay categorías existentes</p>
        )}
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
};

export default Generations;
