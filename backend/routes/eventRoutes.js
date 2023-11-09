import express from 'express';
import { 
    obtenerEventos,
    nuevoEvento,
    obtenerEvento,
    editarEvento,
    eliminarEvento,
    agregarColaborador,
    eliminarColaborador,
    buscarColaborador,
    deactivateEvent,
    changeOwnership
} from '../controllers/eventController.js';
import checkAuth from '../middleware/checkAuth.js';
import checkRole from '../middleware/checkRole.js';

const router = express.Router();


router.route('/')
    .get(checkAuth, obtenerEventos)
    .post(checkAuth, checkRole(['Operations']), nuevoEvento);

router.route('/:id')
    .get(checkAuth, obtenerEvento)
    .put(checkAuth, checkRole(['Operations']), editarEvento)
    .delete(checkAuth, checkRole(['Operations']), eliminarEvento);

router.post('/deactivate/:id', checkAuth, checkRole(['Operations']), deactivateEvent);
router.post('/change-ownership/:id', checkAuth, checkRole(['Operations']), changeOwnership);

router.post('/colaboradores/:id',checkAuth, agregarColaborador);
router.post('/colaboradores', checkAuth, buscarColaborador)
router.post('/eliminar-colaborador/:id', checkAuth, eliminarColaborador);

export default router;
