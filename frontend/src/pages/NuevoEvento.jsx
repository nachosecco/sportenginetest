import FormularioEvento from "../components/FormularioEvento";
import { Link } from 'react-router-dom';

const NuevoEvento = () => {
  return (
    <>
        <div className="flex justify-between items-center">
            <h1 className="text-4xl text-left font-black font-Nunito">🗓️Crear evento</h1>
            <Link to="/events" className="font-bold uppercase bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full">
                🔍 Ver eventos
            </Link>
        </div>
        <div className="mt-10 flex justify-center">
            <FormularioEvento />
        </div>
    </>
);
  };

  document.body.style.backgroundColor = 'black';
  
  export default NuevoEvento;