import { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventosContext from '../context/EventosProvider';

const BorrarEvento = () => {
  const { borrarEvento } = useContext(EventosContext);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const borrar = async () => {
      if (window.confirm('¿Estás seguro que quieres borrar este evento?')) {
        await borrarEvento(id);
        navigate('/events');
      } else {
        navigate('/events');
      }
    };
    borrar();
  }, [borrarEvento, navigate, id]);

  return (
    <div className="flex justify-center">
      <h2 className="text-2xl">Borrando Evento...</h2>
    </div>
  );
};

export default BorrarEvento;
