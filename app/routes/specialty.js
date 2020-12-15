const {Router}= require('express');
const { crearEspecialidad, getEspecialidades, actualizarEspecialidad, eliminarEspecialidad } = require('../controllers/especialidadController');
const {validarJWT} = require('../middlewares/validar-jwt');
 

const router = Router();


router.get('/', validarJWT, getEspecialidades);

router.post('/new', validarJWT, crearEspecialidad);

router.put('/:id', validarJWT, actualizarEspecialidad);

router.delete('/:id', validarJWT, eliminarEspecialidad);







module.exports = router;