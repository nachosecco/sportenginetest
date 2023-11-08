import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState({
    uid: "",
    name: "",
    email: "",
  });
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }

      // send token conig
      const config = {
        headers: {
          "Conent-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios("users/perfil", config);
        setAuth(data);
      } catch (error) {
        setAuth({});
      }
      setCargando(false);
    };
    autenticarUsuario();
  }, []);

  const onRegisterWithFirebase = ({ uid, email, name }) => {
    setIsVisible(!isVisible);
    setFirebaseUser({ uid, name, email });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        isVisible,
        firebaseUser,
        cargando,
        onRegisterWithFirebase,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
