import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import { auth } from "../firebase/firebase";
import useAuth from "./useAuth";
import { useGenerations } from "./useGenerations";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const useFirebase = () => {
  const { onRegisterWithFirebase, firebaseUser, setAuth } = useAuth();
  const { showAlert } = useGenerations();
  const navigate = useNavigate();

  const [uid, setUid] = useState("");

  const showGooglePopUp = async () => {
    return await signInWithPopup(auth, googleProvider);
  };

  const signUpWithGoogle = async () => {
    const res = await showGooglePopUp();
    const user = {
      uid: res.user.uid,
      email: res.user.email,
      name: res.user.displayName,
    };

    const valid = await checkUser(user.email);
    if (valid) {
      onRegisterWithFirebase(user);
    }
  };

  const checkUser = async (email) => {
    try {
      const { data } = await clienteAxios(`/users/check/${email}`);
      return data.ok;
    } catch (error) {
      showAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const registerWithGoogle = async (password) => {
    const user = {
      ...firebaseUser,
      password,
    };

    try {
      const { data } = await clienteAxios.post("/users/firebase", user);
      showAlert({
        msg: data.msg,
      });
    } catch (error) {
      showAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }

    onRegisterWithFirebase({ uid: "", email: "", name: "" });
  };

  const loginPopUp = async () => {
    await showGooglePopUp().then((res) => {
      loginWithGoogle(res.user.email);
    });
  };

  const loginWithGoogle = async (email) => {
    try {
      const { data } = await clienteAxios.post("/users/firebase/login", {
        email,
      });

      localStorage.setItem("token", data.token);
      setAuth(data);
      navigate("/events");
    } catch (error) {
      showAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const showFacebookPopUp = async (uid) => {
    return await signInWithPopup(auth, facebookProvider);
  };

  return {
    signUpWithGoogle,
    registerWithGoogle,
    loginPopUp,
    showFacebookPopUp,
  };
};
