// import { router } from '../config/router.config.js';
import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import {
  getTask,
  addTask,
  editTask,
  deleteTask,
  changeStateTask,
} from '../controllers/taskController.js';
 
const router = express.Router();
 
router.post('/', checkAuth, addTask);
 
router
  .route('/:id')
  .get(checkAuth, getTask)
  .put(checkAuth, editTask)
  .delete(checkAuth, deleteTask);
 
router.post('/state/:id', checkAuth, changeStateTask);
 
export default router;
