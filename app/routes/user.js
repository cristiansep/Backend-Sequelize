const {Router}= require('express');
const { getUsuarios} = require('../controllers/userController');


const router = Router();


router.get('/', getUsuarios);

// router.get('/:id/domicilio', getUsuarioDireccion);

// router.get('/:id/publicacion', getUsuarioPublicaciones);

// router.get('/:id/bandas', getUsuarioBanda);

// router.get('/:id', getUsuarioById);

// router.post('/', crearUsuario);

// router.patch('/:id', actualizarUsuario);

// router.delete('/:id', eliminarUsuario);




module.exports = router;
