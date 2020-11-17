const {Router}= require('express');
const { crearEspecialidad, getEspecialidades, actualizarEspecialidad, eliminarEspecialidad } = require('../controllers/especialidadController');
const {validarJWT} = require('../middlewares/validar-jwt');
 

const router = Router();


router.get('/', getEspecialidades);

router.post('/', crearEspecialidad);

router.put('/:id', actualizarEspecialidad);

router.delete('/:id', eliminarEspecialidad);







module.exports = router;