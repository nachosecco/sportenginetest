import { emailForgotPassword, emailSignup } from "../helpers/email.js";
import generarJWT from "../helpers/generateJWT.js";
import generateId from "../helpers/generateId.js";
import Role from '../models/Role.js';
import Team from '../models/Team.js';
import User from "../models/User.js";

const signUp = async (req, res) => {
  const { email, password, invitation } = req.body;
  const existingUser = await User.findOne({ email: email });

  let decodedToken;
  try {
    decodedToken = jwt.verify(invitation, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(400).json({ msg: 'Invalid or expired invitation token.' });
  }

  const { role: roleId, team: teamId } = decodedToken;

  if (existingUser) {
    // TODO: fetch error message from ErrorMessages File & Create File 
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const user = new User(req.body);
    user.role = roleId;
    user.team = teamId;
    user.token = generateId();
    await user.save(); // Wait until user is created

    emailSignup({
      email: user.email,
      name: user.name,
      token: user.token,
      link: `${process.env.FRONTEND_URL}/signup?invitation=${token}`
    });
  
    res.status(200).json({ msg: 'Invitation sent successfully.' });
  

    res.json({
      // TODO: fetch error message from ErrorMessages File & Create File 
      msg: "Usuario creado correctamente, revisa tu correo para confirmar tu cuenta",
    });
  } catch (error) {
    console.log(error);
  }
};

// New endpoint to invite a user
const inviteUser = async (req, res) => {
  const { email, roleId, teamId } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    if (existingUser.role.toString() !== roleId) {
      existingUser.role = roleId;
      await existingUser.save();
    }
    // User already exists with the same role, do nothing
    return res.status(200).json({ msg: 'User already exists with the given role.' });
  }

  // Create a token with role and team info
  const token = generarJWT({ role: roleId, team: teamId }, '24h'); // Set an expiration for the token

  // Send an email with the 'magic' link
  emailSignup({
    email,
    token,
    link: `${process.env.FRONTEND_URL}/signup?invitation=${token}`
  });

  res.status(200).json({ msg: 'Invitation sent successfully.' });
};

const checkUser = async (req, res) => {
  const { email } = req.params;
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    // TODO: fetch error message from ErrorMessages File & Create File 
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  return res.status(200).json({ ok: true });
};

const firebaseRegister = async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    // TODO: fetch error message from ErrorMessages File & Create File 
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
      // TODO: fetch success message from SuccessMessages File & Create File 
      msg: "Usuario creado correctamente, revisa tu correo para confirmar tu cuenta",
    });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // Check or User instance
  if (!user) {
    const error = new Error("El usuario no está registrado");
    return res.status(404).json({ msg: error.message });
  }
  if (!user.confirmed) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }

  // Check pwd
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
  const { token } = req.params; // Decrypt toke from URL
  const usuarioConfirmar = await User.findOne({ token });

  // Invalid token
  if (!usuarioConfirmar) {
    const error = new Error("Token no valido");
    return res.status(403).json({ msg: error.message });
  }
  // Valid token
  try {
    usuarioConfirmar.confirmed = true;
    usuarioConfirmar.token = ""; // Token is deleted, one time use only
    await usuarioConfirmar.save();
    res.json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  // Check if User exists
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
    // Send reset pwd email 
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
  inviteUser
};
