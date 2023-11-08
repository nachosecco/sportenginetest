import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import { useEffect } from 'react';


const OlvidePassword = () => {

  useEffect(() => {
    document.body.style.backgroundImage = "url('/backgrounds/page-turner.svg')";
    document.body.style.backgroundSize = 'cover';
    return () => {
      document.body.style.backgroundImage = null;
      document.body.style.backgroundSize = null;
    };
  }, []);

  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})
  const handleSubmit = async e => {
    e.preventDefault();

    if (email === '' || email.length < 6) {
      setAlerta({
        msg: 'El email es obligatorio',
        error: true
      });
      return
    }

    try {
      const { data } = await clienteAxios.post(`/users/olvide-password`, { email })
      setAlerta({
        msg: data.msg,
        error: false
      })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }

  }



  const { msg } = alerta

  return (
    <>
      <div className=" font-sans" style={{ fontFamily: 'Nunito' }}>
        {msg && <Alerta alerta={alerta} />}
        <div>
          <h1 className="logo-font text-center text-white text-5xl sm:text-5xl md:text-7xl animate__animated animate__fadeInDown italic">SCRUMALYTICS</h1>
          <p className="text-center p-4 text-white animate__animated animate__fadeInDown">ENTIENDE EL JUEGO</p>
        </div>
        <form className="my-1 bg-white shadow rounded-lg p-10 border-8 border-blue-400 animate__animated animate__fadeInDown"

          onSubmit={handleSubmit}
        >
          <h1 className="text-center text-black font-black text-2xl p" style={{ paddingTop: "10px", paddingBottom: "10px" }}>
            ¿Has olvidado tu contraseña?
          </h1>

          <p className="text-center text-blue-400 text-s font-bold">
            ¡No te preocupes! a todos nos suele pasar.
          </p>

          <p className="text-center my-2 text-gray-600 text-s">
            Ingresa tu dirección de correo electrónico para recibir el enlace para restablecer tu contraseña.
          </p>


          <div className="my-5">
            <label
              className="uppercase text-black text-center block text-xl font-bold"
              htmlFor="email"
            >📬Correo electrónico:</label>
            <input
              id="email"
              type="email"
              placeholder="Ingresa aquí tu correo electrónico"
              className="w-full mt-3 p-3 border text-center rounded-xl bg-gray-50"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Enviar instrucciones"
            className="bg-green-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:bg-green-800 hover:cursor-pointer hover:bg-#388E3C transitions-colors transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-md"

          />
          <nav className="flex flex-col lg:flex-row lg:justify-between">
            <Link
              className="lg:text-left text-center my-5 text-black text-sm"
              to="/registrar"
            >
              ¿Aún no tienes una cuenta? <br /> <span className="text-blue-800 font-bold">Regístrate aquí</span>
            </Link>
            <Link
              className="text-center lg:text-right my-5 text-black text-sm"
              to="/"
            >
               ¿Ya tienes una cuenta? <br />
              <span className="text-blue-800 font-bold">Inicia sesion aquí</span>
            </Link>
          </nav>
        </form>

      </div>
    </>
  )
}

export default OlvidePassword