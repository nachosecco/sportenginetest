import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Alerta = ({ alerta }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Aquí puedes añadir lógica para ocultar la alerta después de un tiempo
    }, 3000); // 3 segundos

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed top-[5rem] right-0 m-4 z-50 transition-all transform ease-in-out duration-500 ${alerta.error ? 'from-red-400 to-red-600' : 'from-green-700 to-green-800'} bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm`}>
      <div className="flex items-center justify-center">
        <img src="/icons/icons8-success.png" alt="Icono" className="w-5 h-5 mr-2" />
        {alerta.msg}
      </div>
    </div>
  );
};

Alerta.propTypes = {
  alerta: PropTypes.shape({
    error: PropTypes.bool,
    msg: PropTypes.string,
  }).isRequired,
};

export default Alerta;
