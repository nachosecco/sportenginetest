import { emailForgotPassword, emailSignup } from "../helpers/email.js";
import generarJWT from "../helpers/generarJWT.js";
import generateId from "../helpers/generateId.js";
import User from "../models/User.js";

const signUp = async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    // TODO: fetch error message from Constants 
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const user = new User(req.body);
    user.token = generateId();
    await user.save(); // Wait until user is created

    emailSignup({
      email: user.email,
      name: user.name,
      token: user.token,
    });

    res.json({
      // TODO: fetch confirmation message from Constants
      msg: "Usuario creado correctamente, revisa tu correo para confirmar tu cuenta",
    });
  } catch (error) {
    console.log(error);
  }
};

const checkUser = async (req, res) => {
  const { email } = req.params;
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    // TODO: fetch error message from Constants
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  return res.status(200).json({ ok: true });
};

const firebaseRegister = async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const user = new User(req.body);
    user.token = generateId();
    await user.save();

    emailSignup({
      email: user.email,
      name: user.name,
      token: user.token,
    });

    res.json({
      msg: "Usuario creado correctamente, revisa tu correo para confirmar tu cuenta",
    });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // comprobar si el usuario no existe
  if (!user) {
    const error = new Error("El usuario no está registrado");
    return res.status(404).json({ msg: error.message });
  }
  if (!user.confirmed) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }

  //comprobar pwd
  if (await user.comprobarPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generarJWT(user._id),
    });
  } else {
    const error = new Error("La contraseña es incorrecta");
    return res.status(403).json({ msg: error.message });
  }
};

const firebaseAuthentication = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("El usuario no está registrado");
    return res.status(404).json({ msg: error.message });
  }
  if (!user.confirmed) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generarJWT(user._id),
  });
};

const confirmar = async (req, res) => {
  const { token } = req.params; // leemos el token de la url
  // buscamos el usuario con el token dado en url
  const usuarioConfirmar = await User.findOne({ token });

  // si el token no se encuentra en DB
  if (!usuarioConfirmar) {
    const error = new Error("Token no valido");
    return res.status(403).json({ msg: error.message });
  }
  // si el token se encuntra en DB
  try {
    usuarioConfirmar.confirmed = true;
    usuarioConfirmar.token = ""; //borramos el token al confirmar el usuario (token de un solo uso)
    await usuarioConfirmar.save();
    res.json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  // comprobar si el usuario no existe
  if (!user) {
    const error = new Error("El usuario no está registrado");
    return res.status(404).json({ msg: error.message });
  }

  try {
    user.token = generateId();
    await user.save();
    res.json({
      msg: "Hemos enviado un email con las instrucciones para autenticar el usuario",
    });
    //enviar email olvide pwd
    emailForgotPassword({
      email: user.email,
      name: user.name,
      token: user.token,
    });
  } catch (error) {
    console.log(error);
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;
  const tokenValido = await User.findOne({ token });

  if (tokenValido) {
    res.json({ msg: "Token valido y el usuario existe" });
  } else {
    const error = new Error("Token no valido");
    return res.status(404).json({ msg: error.message });
  }
};

const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ token });

  if (user) {
    user.password = password;
    user.token = "";
    try {
      await user.save();
      res.json({ msg: "Password modificado correctamente" });
    } catch (error) {
      console.log("Error al actualizar la contraseña");
    }
  } else {
    const error = new Error("Token no valido");
    return res.status(404).json({ msg: error.message });
  }
};

const perfil = async (req, res) => {
  const { user } = req;

  res.json(user);
};

const searchUserByName = async (req, res) => {
  const { name } = req.params;
  const users = await User.find({
    name: { $regex: `^${name}`, $options: "i" },
  });

  res.status(200).json(users);
};

export {
  autenticar,
  checkUser,
  comprobarToken,
  confirmar,
  firebaseAuthentication,
  firebaseRegister,
  nuevoPassword,
  olvidePassword,
  perfil,
  signUp as registrar,
  searchUserByName,
};
