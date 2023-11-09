import express from 'express';
import { getRoles } from '../controllers/roleController.js';
import checkAuth from '../middleware/checkAuth.js';
import checkRole from '../middleware/checkRole.js';

const router = express.Router();

// router.route('/')
//     .get(checkAuth, checkRole(['Operations']), getRoles);

router.route('/')
    .get(getRoles);

export default router;