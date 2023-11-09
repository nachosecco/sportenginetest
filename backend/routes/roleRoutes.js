import express from 'express';
import { getRoles } from '../controllers/roleController.js';

const router = express.Router();

router.route('/').get(getRoles);

export default router;