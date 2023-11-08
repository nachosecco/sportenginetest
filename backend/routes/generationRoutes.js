import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import {
    createGeneration,
    addPlayerToGeneration,
    removePlayersFromGeneration,
    getGenerations,
    getGeneration,
    renameGeneration,
    deleteGeneration
} from '../controllers/generationController.js'

const router = express.Router();

router.route('/')
    .get(checkAuth, getGenerations)
    .post(checkAuth, createGeneration)

router.put('/players/add', checkAuth, addPlayerToGeneration);
router.put('/players/remove', checkAuth, removePlayersFromGeneration);

router.route('/:id')
    .get(checkAuth, getGeneration)
    .put(checkAuth, renameGeneration)
    .delete(checkAuth, deleteGeneration)

export default router;