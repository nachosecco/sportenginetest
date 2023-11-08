import LineUp from '../models/LineUp.js';
import Generation from '../models/Generation.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

const createLineUp = async (req, res) => {
    const { name, generation, players } = req.body;

    if (
        !name
        || !generation
        || !players
        || !Array.isArray(players)
        || !mongoose.Types.ObjectId.isValid(generation)
        || players.some(p => !mongoose.Types.ObjectId.isValid(p.player))) {
        return res.status(400).json({
            msg: 'Nombre, Generación y Jugadores son necesarios'
        })
    }

    const validateName = await LineUp.findOne({ $and: [{ name }, { generation }] });

    if (validateName) {
        return res.status(409).json({
            msg: 'Ya existe una alineación con ese nombre'
        })
    }

    const dbGeneration = await Generation.findById(generation);
    if (!dbGeneration) {
        return res.status(400).json({
            msg: 'La Generación no existe'
        })
    }

    try {
        const newLineUp = new LineUp({
            name,
            generation,
            players
        });

        const dbLineUp = await newLineUp.save();
        return res.status(201).json(dbLineUp);
    } catch (error) {
        return res.status(409).json({ msg: 'Error intentando crear la alineación, intente nuevamente' });
    }
}

const getLineUp = async (req, res) => {
    const { id } = req.params;
    const { _id: user } = req.user;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: 'Line Up Invalid'
        })
    }

    const dbLineUp = await LineUp.findById(id)
        .populate('generation');

    if (!dbLineUp) {
        return res.status(404).json({
            error: 'Alineación no encontrada'
        })
    }

    if ((dbLineUp.generation.coach.toString() !== user.toString())
        && (dbLineUp.players.player !== user.toString())) {
        return res.status(403).json({
            error: 'No eres Jugador o Entrenador de esta Generación'
        })
    }

    return res.status(200).json(dbLineUp);
}

const getLineUps = async (req, res) => {
    const { generation } = req.params;
    const { _id: coach } = req.user;

    if (!mongoose.Types.ObjectId.isValid(generation)) {
        return res.status(400).json({
            msg: 'Generación no valida'
        })
    }

    const dbLineUps = await LineUp.find({ generation })
        .populate('generation');

    if (dbLineUps.some(lineUp => lineUp.generation.coach.toString() !== coach.toString())
        && (dbLineUps.some(lineUp => !lineUp.generation.players.some(player => player._id.toString() === user.toString())))) {
        return res.status(403).json({
            msg: 'No eres Jugador o Entrenador de esta Generación'
        })
    }

    return res.status(200).json(dbLineUps);
}

const updateLineUp = async (req, res) => {
    const { name, players } = req.body;
    const { id } = req.params;
    const { _id: coach } = req.user;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            msg: 'Alineación no valida'
        });
    }

    const dbLineUp = await LineUp.findById(id).populate('generation');
    if (!dbLineUp) {
        return res.status(404).json({
            msg: 'Alineación no encontrada'
        })
    }

    if (dbLineUp.generation.coach.toString() !== coach.toString()) {
        return res.status(403).json({
            msg: 'No eres Entrenador de esta Generación'
        })
    }

    if (name && dbLineUp.name !== name) {
        const validateName = await LineUp.findOne({ $and: [{ name }, { generation: dbLineUp.generation._id }] });

        if (validateName) {
            return res.status(409).json({
                msg: 'Ya existe una alineación con ese nombre'
            })
        }

        dbLineUp.name = name;
    }
    if (players && players.length > 0) dbLineUp.players = players;

    try {
        const updatedLineUp = await dbLineUp.save();
        return res.status(200).json(updatedLineUp);
    } catch (error) {
        return res.status(409).json({ msg: 'Error intentando actualizar la Alineación, intente nuevamente' });
    }

}

const deleteLineUp = async (req, res) => {
    const { id } = req.params;
    const { _id: coach } = req.user;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            msg: 'Alineación no valida'
        })
    }

    const dbLineUp = await LineUp.findById(id).populate('generation');
    if (!dbLineUp) {
        return res.status(404).json({
            msg: 'Alineación no encontrada'
        });
    }

    if (dbLineUp.generation.coach.toString() !== coach.toString()) {
        return res.status(403).json({
            msg: 'No eres Entrenador de esta Generación'
        })
    }

    try {
        await dbLineUp.deleteOne();
        return res.status(200).json({ msg: 'Alineación eliminada correctamente' });
    } catch (error) {
        return res.status(409).json({ msg: 'Error intentando eliminar la Alineación, intente nuevamente' });
    }
}

export {
    createLineUp,
    getLineUp,
    getLineUps,
    updateLineUp,
    deleteLineUp
}