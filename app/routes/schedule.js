const {Router}= require('express');
const {validarJWT} = require('../middlewares/validar-jwt');
const {crearHorario, getTurnos, actualizarHorario, eliminarHorario} = require('../controllers/scheduleController')
 

const router = Router();

router.get('/', validarJWT, getTurnos);
router.post('/new', validarJWT,crearHorario);
router.put('/:id', validarJWT, actualizarHorario);
router.delete('/:id', validarJWT, eliminarHorario);





module.exports = router;