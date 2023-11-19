import "animate.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import { useFirebase } from "../hooks/useFirebase";
import { useGenerations } from "../hooks/useGenerations";

const Login = () => {
  const { loginPopUp } = useFirebase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();
  const { alert } = useGenerations();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.body.style.backgroundImage = "url('/backgrounds/page-turner.svg')";
    document.body.style.backgroundSize = "cover";
    return () => {
      document.body.style.backgroundImage = null;
      document.body.style.backgroundSize = null;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlerta({
        msg: "Porfavor ingresa las credenciales correctas",
        error: true,
      });
      return;
    }
    try {
      const response = await clienteAxios.post("/users/login", {
        email,
        password,
      });
      console.log(response);
      
      setAlerta({});
      localStorage.setItem("token", response.data.token);
      localStorage.setItem('auth', JSON.stringify({ ...response.data, role: response.data.role }));
      setAuth({ ...response.data, role: response.data.role });
      navigate("/events");
      
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div className="font-sans flex flex-col justify-center items center" style={{ fontFamily: "Nunito" }}>
      <div>
          <h1 className="logo-font text-center text-white text-5xl sm:text-5xl md:text-7xl animate__animated animate__fadeInDown italic">SCRUMALYTICS</h1>
          <p className="text-center p-4 text-white animate__animated animate__fadeInDown">ENTIENDE EL JUEGO</p>
      </div>
        {msg && <Alerta alerta={alerta} />}
        {alert?.msg && <Alerta alerta={alert} />}

        <form
          className="bg-white shadow-xl rounded-lg p-6 border-8 border-blue-500 animate__animated animate__fadeInLeft"
          onSubmit={handleSubmit}
        >
          <div className="mb-10 text-center">
            <label className="text-black text-l">O inicia sesión con:</label>
            <div className="flex justify-center mt-2">
              <button className="mx-2 text-white p-2 rounded inline-flex items-center border-2 border-blue-300  bg-blue-600 hover:bg-blue-800 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-md">
                <img
                  src="/icons/facebook.png"
                  alt="Facebook"
                  className="w-6 h-6 mr-2"
                />
                Continuar con Facebook
              </button>
              <button
                type="button"
                onClick={loginPopUp}
                className="mx-2 text-gray-700 p-2 rounded inline-flex items-center border-2 border-red-300 bg-gray-100 hover:bg-red-200 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-md"
              >
                <img
                  src="/icons/icons8-google-48.png"
                  alt="Google"
                  className="w-6 h-6 mr-2"
                />
                Continuar con Google
              </button>
            </div>
          </div>
          <div className="border-t border-gray-200"></div>
          <h1 className="text-black text-2xl my-2 text-center font-semibold">
            Iniciar sesión
          </h1>
          <div className="my-5">
            <label className=" text-black block text-xl" htmlFor="email">
              📬Correo electrónico:
            </label>
            <input
              id="email"
              type="email"
              placeholder="Correo electrónico"
              className="w-full mt-3 text-black p-3 border-2 rounded-xl bg-gray-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="my-5 relative">
            <label className=" text-black block text-xl" htmlFor="password">
              🔐Contraseña:
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50 pr-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-lg leading-5 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
              style={{ top: "70%", transform: "translateY(-50%)" }}
            >
              {showPassword ? (
                <img
                  src="/icons/icons8-blind-40.png"
                  alt="Ocultar contraseña"
                  className="h-8 w-8"
                />
              ) : (
                <img
                  src="/icons/icons8-show-password-40.png"
                  alt="Mostrar contraseña"
                  className="h-8 w-8"
                />
              )}
            </button>
          </div>

          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-green-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:bg-green-800 hover:cursor-pointer hover:bg-#388E3C transitions-colors transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-md"
          />
          <div className="border-t border-gray-200"></div>
          <nav className="flex flex-col lg:flex-row lg:justify-between">
            <Link
              className="lg:text-left text-center my-5 text-black text-sm"
              to="/registrar"
            >
              ¿Aún no tienes una cuenta? <br />{" "}
              <span className="text-blue-800 font-bold">Regístrate aquí</span>
            </Link>
            <Link
              className="text-center lg:text-right my-5 text-black text-sm"
              to="/olvide-password"
            >
              ¿Olvidaste tu contraseña? <br />
              <span className="text-blue-800 font-bold">Recuperala aquí</span>
            </Link>
          </nav>
        </form>
      </div>
    </>
  );
};

export default Login;
