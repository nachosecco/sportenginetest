import mongoose from "mongoose";
import Generation from "../models/Generation.js";
import LineUp from "../models/LineUp.js";

const createGeneration = async (req, res) => {
  const { _id: coach } = req.user;
  const { name } = req.body;

  if (!coach || !name) {
    return res
      .status(400)
      .json({ msg: "Por favor, ingrese los valores nuevamente" });
  }

  const validateName = await Generation.findOne({ name });
  if (validateName) {
    return res
      .status(409)
      .json({ msg: "Ya existe una Generación con ese nombre" });
  }

  const generation = new Generation({
    coach,
    name,
  });

  try {
    const newGeneration = await generation.save();
    return res.status(201).json(newGeneration);
  } catch (error) {
    return res.status(409).json({
      msg: "Error intentando crear la Generación, intente nuevamente",
    });
  }
};

const addPlayerToGeneration = async (req, res) => {
  const { _id: coach } = req.user;
  const { players, generation } = req.body;

  if (
    !Array.isArray(players) ||
    !generation ||
    players.some((p) => !mongoose.Types.ObjectId.isValid(p)) ||
    !mongoose.Types.ObjectId.isValid(generation)
  ) {
    return res.status(400).json({
      msg: "Por favor seleccione jugadores validos y/o una generación valida",
    });
  }

  const dbGeneration = await Generation.findById(generation);

  if (!dbGeneration) {
    return res.status(404).json({ msg: "Generación no encontrada" });
  }

  if (dbGeneration.coach.toString() !== coach.toString()) {
    return res
      .status(403)
      .json({ msg: "Usted no es el Entrenador de esta Generación" });
  }

  const dbPlayers = dbGeneration.players.map((player) => player.toString());

  try {
    dbGeneration.players = [...new Set([...dbPlayers, ...players])];

    await dbGeneration.save();
    const newGeneration = await Generation.findById(generation).populate(
      "players",
      "_id name"
    );

    return res.status(200).json(newGeneration);
  } catch (error) {
    return res.status(409).json({
      msg: "Error intentando agregar uno o mas jugadores, intente nuevamente",
    });
  }
};

const removePlayersFromGeneration = async (req, res) => {
  const { _id: coach } = req.user;
  const { player, generation } = req.body;

  if (
    !player ||
    !generation ||
    !mongoose.Types.ObjectId.isValid(player) ||
    !mongoose.Types.ObjectId.isValid(generation)
  ) {
    return res.status(400).json({
      msg: "Por favor seleccione un jugador valido y/o una generación valida",
    });
  }

  const dbGeneration = await Generation.findById(generation);

  if (lineUps.length > 0) {
    return res.status(400).json({
      msg: "El Jugador esta en una o más Alineaciones de esta Generación, debe removerlo primero",
    });
  }

  if (dbGeneration.coach.toString() !== coach.toString()) {
    return res
      .status(403)
      .json({ msg: "Usted no es el Entrenador de esta Generación" });
  }

  const lineUps = await LineUp.find({
    players: {
      $elemMatch: {
        player: player,
      },
    },
  });

  console.log(lineUps);

  if (lineUps.length > 0) {
    return res.status(400).json({
      msg: "El Jugador esta en una o más Alineaciones de esta Generación, debe removerlo primero",
    });
  }

  try {
    const dbPlayers = dbGeneration.players.map((player) => player.toString());
    const newPlayers = dbPlayers.filter((dbPlayer) => dbPlayer !== player);
    dbGeneration.players = newPlayers;
    await dbGeneration.save();
    const newGeneration = await Generation.findById(generation).populate(
      "players",
      "_id name"
    );

    return res.status(200).json(newGeneration);
  } catch (error) {
    return res
      .status(409)
      .json({ msg: "Error removing players, please try again" });
  }
};

const getGenerations = async (req, res) => {
  const { _id } = req.user;

  try {
    const generations = await Generation.find({
      $or: [{ players: _id }, { coach: _id }],
    });

    return res.status(200).json(generations);
  } catch (error) {
    return res.status(409).json({
      msg: "Error intentando obtener las Categorías, intente nuevamente",
    });
  }
};

const getGeneration = async (req, res) => {
  const { id } = req.params;
  const { _id: user } = req.user;

  const dbGeneration = await Generation.findById(id).populate(
    "players",
    "_id name"
  );

  if (!dbGeneration) {
    return res.status(404).json({ msg: "Generación no encontrada" });
  }

  if (
    dbGeneration.coach.toString() !== user.toString() &&
    !dbGeneration.players.some(
      (player) => player._id.toString() === user.toString()
    )
  ) {
    return res
      .status(403)
      .json({ msg: "No eres Jugador o Entrenador de esta Generación" });
  }

  return res.status(200).json(dbGeneration);
};

const renameGeneration = async (req, res) => {
  const { id: generation } = req.params;
  const { name } = req.body;
  const { _id: coach } = req.user;

  if (!mongoose.Types.ObjectId.isValid(generation) || !name) {
    return res.status(400).json({
      msg: "Por favor ingrese una generación valida y/o un nombre valido",
    });
  }

  const validateName = await Generation.findOne({ name });

  if (validateName) {
    return res.status(409).json({
      msg: "Nombre en uso",
    });
  }

  const dbGeneration = await Generation.findById(generation);

  if (!dbGeneration) {
    return res.status(404).json({
      msg: "Generación no encontrada",
    });
  }

  if (dbGeneration.coach.toString() !== coach.toString()) {
    return res.status(403).json({
      msg: "Usted no es el Entrenador de esta Generación",
    });
  }

  try {
    dbGeneration.name = name;
    const newGeneration = await dbGeneration.save();
    return res.status(200).json(newGeneration);
  } catch (error) {
    return res.status(409).json({
      msg: "Error intentando renombrar la Generación, intente nuevamente",
    });
  }
};

const deleteGeneration = async (req, res) => {
  const { id: generation } = req.params;
  const { _id: coach } = req.user;

  if (!mongoose.Types.ObjectId.isValid(generation)) {
    return res.status(400).json({
      msg: "Por favor ingrese una generación valida",
    });
  }

  const dbGeneration = await Generation.findById(generation);

  if (!dbGeneration) {
    return res.status(404).json({
      msg: "Generación no encontrada",
    });
  }

  if (dbGeneration.coach.toString() !== coach.toString()) {
    return res.status(403).json({
      msg: "Usted no es el Entrenador de esta Generación",
    });
  }

  const lineUps = await LineUp.find({ generation });

  if (lineUps.length > 0) {
    return res.status(400).json({
      msg: "Esta Generación tiene alineaciones activas, remuevalas primero",
    });
  }

  try {
    await dbGeneration.deleteOne();
    return res.status(200).json({
      msg: "Generación Eliminada Correctamente",
    });
  } catch (error) {
    return res.status(409).json({
      msg: "Error intentando eliminar la Generación, intente nuevamente",
    });
  }
};

export {
  addPlayerToGeneration,
  createGeneration,
  deleteGeneration,
  getGeneration,
  getGenerations,
  removePlayersFromGeneration,
  renameGeneration,
};
