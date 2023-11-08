import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
// import Alerta from "../components/Alerta"; 
import Confetti from 'react-confetti';

const ConfirmarCuenta = () => {

  const [alerta, setAlerta] = useState({});  // Alerta desactivada
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    document.body.style.backgroundImage = "url('/backgrounds/page-turner.svg')";
    document.body.style.backgroundSize = "cover";
    document.body.classList.add('no-scroll');
    return () => {
      document.body.style.backgroundImage = null;
      document.body.style.backgroundSize = null;
      document.body.classList.remove('no-scroll');
    };
  }, []);

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/users/confirmar/${id}`;
        const { data } = await clienteAxios(url);
        
        // Alerta comentadas
        // setAlerta({
        //   msg: data.msg,
        //   error: false
        // });
        
        setCuentaConfirmada(true);
      } catch (error) {
        // Alerta comentadas
        // setAlerta({
        //   msg: error.response.data.msg,
        //   error: true
        // });
      }
    };
    confirmarCuenta();
  }, []);

  // const { msg } = alerta; 
  
  return (
    <div className="flex items-center justify-center min-h-screen md:min-h-[calc(100vh-0px)]">
      {cuentaConfirmada && (
        <Confetti 
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={80}
          gravity={0.1}
        />
      )}
      <div className="z-10 text-center bg-white rounded-lg shadow-lg p-4 md:p-10 animate__animated animate__fadeInDown max-w-full sm:max-w-md md:max-w-lg">
        <div className="animate-spin-slow">
          <img src="/icons/confirm-icon.gif" alt="Logo" className="h-16 sm:h-20 md:h-24 w-auto mx-auto" />
        </div>
        <h1 className="text-blue-400 font-black text-4xl sm:text-5xl md:text-6xl lg:text-6xl capitalize mt-2 sm:mt-4 md:mt-5">
          ¡Felicitaciones!
        </h1>
        <p className="text-black text-sm sm:text-base md:text-lg my-2 sm:my-3 md:my-4">
          ¡Tu cuenta ha sido creada y verificada con éxito!
        </p>
        <div className="mt-10 sm:mt-12 md:mt-14 lg:mt-16">
          {/* Alerta comentada */}
          {/* {msg && <Alerta alerta={alerta} />} */}
          {cuentaConfirmada && (
            <Link
              className="block text-center text-white uppercase text-sm bg-green-600 rounded-lg p-2"
              to="/"
            >
              Inicia Sesión
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConfirmarCuenta;
