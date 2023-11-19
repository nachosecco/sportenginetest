import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import { set } from "lodash";

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

      // send token config
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };  

      try {
        const { data } = await clienteAxios("/users/perfil", config);
        setAuth(data);
        localStorage.setItem('auth', JSON.stringify(data));
      } catch (error) {
        console.error("Authentication error: ", error);
        localStorage.removeItem("token"); // Clear token if it's invalid
        setAuth({});
      }
      setCargando(false);
    };
    const storedAuth = localStorage.getItem('auth');
  
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
      setCargando(false);
    } else {
      autenticarUsuario();
    }  
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
        setIsVisible,
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