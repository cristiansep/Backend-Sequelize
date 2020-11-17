const {Router}= require('express');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/authController');
const {validarJWT} = require('../middlewares/validar-jwt');
 

const router = Router();


router.post('/new', crearUsuario);

router.post('/', loginUsuario);

router.get('/renew', validarJWT,revalidarToken);





module.exports = router;