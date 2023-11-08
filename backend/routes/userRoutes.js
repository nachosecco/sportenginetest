import express from "express";
const router = express.Router();

import {
  autenticar,
  checkUser,
  comprobarToken,
  confirmar,
  firebaseAuthentication,
  firebaseRegister,
  nuevoPassword,
  olvidePassword,
  perfil,
  registrar,
  searchUserByName,
} from "../controllers/userController.js";

import checkAuth from "../middleware/checkAuth.js";

router.post("/firebase", firebaseRegister); // creamos un usuario
router.post("/firebase/login", firebaseAuthentication);
router.get("/check/:email", checkUser);

// Autenticacion, registro y confirmacion de usuario
router.post("/", registrar); // creamos un usuario
router.post("/login", autenticar);
// el nombre que colocamos despues de : es el nombre de la variable que express
// va a generar dinamicamente
router.get("/confirmar/:token", confirmar);
router.post("/olvide-password", olvidePassword);
// mismo url, si es get request ejecuta comprobarToken, si es post request ejecuta nuevoPassword
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

router.get("/perfil", checkAuth, perfil);
router.get("/:name", checkAuth, searchUserByName);

export default router;
