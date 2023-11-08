import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-blue-100">
      <div className="animate-bounce">
         <img src="/icons/404NotFound.svg" alt="404" className="h-100 w-100" /> 
      </div>
      <div className="mt-4 flex flex-col items-center">
        <p className="text-xl font-semibold" style={{ fontFamily: 'Nunito' }}>
          Página no encontrada
        </p>
      </div>
        <Link 
        to="/" 
        className="mt-6 text-white bg-blue-500 hover:bg-blue-600 rounded-full py-2 px-4 transition duration-300"
        >
        Volver al inicio
        </Link>

      <style>{`
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
