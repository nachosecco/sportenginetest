import express from 'express';
import {
    createLineUp,
    getLineUp,
    getLineUps,
    updateLineUp,
    deleteLineUp
} from '../controllers/lineUpController.js';
import checkAuth from '../middleware/checkAuth.js';
import checkRole from '../middleware/checkRole.js';

const router = express.Router();

router.get('/:generation/generation', checkAuth, getLineUps);
router.post('/', checkAuth, checkRole(['Operations']), createLineUp);

router.route('/:id')
    .get(checkAuth, getLineUp)
    .put(checkAuth, checkRole(['Operations']), updateLineUp)
    .delete(checkAuth, checkRole(['Operations']), deleteLineUp);

export default router;