import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import NewPasswordFirebase from "../components/NewPasswordFirebase";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import { useFirebase } from "../hooks/useFirebase";
import { useGenerations } from "../hooks/useGenerations";

const Signup = () => {
  const query = new URLSearchParams(useLocation().search);
  const [invitation, setInvitation] = query.get('invitation');
  const { isVisible } = useAuth();
  const { alert } = useGenerations();
  const { signUpWithGoogle, showFacebookPopUp } = useFirebase();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [alerta, setAlerta] = useState({});
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

    if ([name, email, password, repeatPassword].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    if (password !== repeatPassword) {
      setAlerta({
        msg: "Las contraseñas no coinciden",
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña no puede ser menor a 6 caracteres",
        error: true,
      });
      return;
    }

    setAlerta({});

    // creamos el usuario en la API
    try {
      const { data } = await clienteAxios.post(`/users`, {
        name,
        email,
        password,
        invitation
      });
      // accedemos al mensaje del servidor y lo pasamos como alerta
      setAlerta({
        msg: data.msg,
        error: false,
      });

      // si el usuario se registra correctamente, borramos sus datos del form
      setName("");
      setEmail("");
      setPassword("");
      setRepeatPassword("");
      setInvitation("");
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  return (
    <>
    <div className="font-sans flex flex-col justify-center items-center " style={{ fontFamily: "Nunito" }}>
      <div>
          <h1 className="logo-font text-center text-white text-5xl sm:text-5xl md:text-7xl animate__animated animate__fadeInDown italic">SCRUMALYTICS</h1>
          <p className="text-center p-4 text-white animate__animated animate__fadeInDown">ENTIENDE EL JUEGO</p>
      </div>
        {alerta.msg && <Alerta alerta={alerta} />}
        {alert.msg && <Alerta alerta={alert} />}

        <form
          className="my-5 bg-white shadow-xl rounded-lg p-4 border-8 border-blue-400 animate__animated animate__fadeInLeft"
          onSubmit={handleSubmit}
        >
          <div className="mb-10 text-center">
            <label className="text-gray-600 text-l">
              O registrate con tus redes sociales:
            </label>
            <div className="flex justify-center mt-2">
              <button
                onClick={showFacebookPopUp}
                className="mx-2 text-white p-2 rounded inline-flex items-center border-2 border-blue-300  bg-blue-600 hover:bg-blue-800 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-md"
              >
                <img
                  src="/icons/facebook.png"
                  alt="Facebook"
                  className="w-6 h-6 mr-2"
                />
                Continuar con Facebook
              </button>
              <button
                type="button"
                onClick={signUpWithGoogle}
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
          <div className="border-t border-gray-200 my-4"></div>
          <h1 className="text-black text-2xl my-2 text-center font-semibold">
          Crea tu cuenta</h1>
          <div className="my-5">
            <label className=" text-black block text-xl " htmlFor="name">
              👤Nombre completo:
            </label>
            <input
              id="name"
              type="text"
              placeholder="Tu nombre completo"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label className=" text-black block text-xl" htmlFor="email">
              📬Correo electrónico:
            </label>
            <input
              id="email"
              type="email"
              placeholder="Correo electrónico de registro"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
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

          <div className="my-5">
            <label className=" text-black block text-xl " htmlFor="password2">
              🔂Repetir contraseña:
            </label>
            <input
              id="password2"
              type="password"
              placeholder="Repetir tu contraseña"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Crear Cuenta"
            className="bg-green-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:bg-green-800 hover:cursor-pointer hover:bg-#388E3C transitions-colors transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-md"
          />

          <nav className="flex flex-col lg:flex-row lg:justify-between">
            <Link
              className="text-center lg:text-left my-5 text-black text-sm"
              to="/"
            >
              ¿Ya tienes una cuenta? <br />
              <span className="text-blue-800 font-bold">
                Inicia sesion aquí
              </span>
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

      <NewPasswordFirebase isVisible={isVisible} />
    </>
  );
};

export default Signup;
