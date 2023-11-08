import React, { useState } from "react";
import { useFirebase } from "../hooks/useFirebase";

const validatePassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  return hasUpperCase && hasNumber;
};

const NewPasswordFirebase = ({ isVisible }) => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isValid, setIsValid] = useState(true);

  const { registerWithGoogle } = useFirebase();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (!isValid) {
      setErrorMessage("La contraseña no cumple con las recomendaciones.");
      return;
    }

    await registerWithGoogle(password);
    setPassword("");
    setErrorMessage(null);
  };

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 transition-opacity duration-500">
          <div className={`bg-gradient-to-r from-blue-400 via-blue-500 to-blue-500 p-6 rounded-lg shadow-lg ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} transition-all transform ease-in-out duration-500`}>
            <div>
              <h1 className="logo-font text-center text-white text-5xl sm:text-5xl md:text-5xl animate__animated animate__fadeInDown italic mb-4">SCRUMALYTICS</h1>
            </div>
            <form className="bg-white bg-opacity-55 rounded-lg p-10 shadow" onSubmit={handleSubmit}>
              <h1 className="text-2xl text-center font-bold mb-2 text-black">
                🔐 Ingresar Contraseña
              </h1>
              <p className="text-black font-bold">Ingresa una nueva contraseña para tu cuenta:</p>
              <div className="my-1">
                <input
                  id="password"
                  type="password"
                  placeholder="Escribe tu nueva contraseña"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={password}
                  
                  onChange={(e) => {
                    const newPassword = e.target.value;
                    setPassword(newPassword);
                    
                    if (!validatePassword(newPassword)) {
                      setIsValid(false);
                    } else {
                      setIsValid(true);
                    }
                  }}
                  
                />
                {errorMessage && <div className="text-white rounded-lg bg-red-400 p-1 mt-3 mb-1">{errorMessage}</div>}
                {!isValid && (
                  <div className="text-sm text-black mt-4 mb-4">
                    <p className="text-black font-bold">Recomendaciones:</p>
                    <ul>
                      <li>1- Al menos un carácter en mayúscula.</li>
                      <li>2- Al menos un número.</li>
                    </ul>
                  </div>
                )}
              </div>
              
              <input
                type="submit"
                value="Guardar nueva contraseña"
                className="bg-green-700 my-5 w-full py-2 p-4 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-green-800 transition-colors"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NewPasswordFirebase;
