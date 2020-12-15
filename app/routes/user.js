const {Router}= require('express');
const { getUsuarios, crearUsuario, getUsuarioById, actualizarUsuario, eliminarUsuario} = require('../controllers/userController');
const {validarJWT, validarADMIN_ROLE} = require('../middlewares/validar-jwt');


const router = Router();


router.get('/', validarJWT, getUsuarios);

router.post('/new', validarJWT, crearUsuario);

// router.get('/:id/domicilio', getUsuarioDireccion);

router.get('/:id',validarJWT, getUsuarioById);

router.put('/:id', validarJWT,actualizarUsuario);

router.delete('/:id',validarJWT,eliminarUsuario);




module.exports = router;
