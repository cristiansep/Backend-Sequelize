const {Router}= require('express');
const {loginUsuario, revalidarToken, registrarUsuario } = require('../controllers/authController');
const {validarJWT} = require('../middlewares/validar-jwt');
 

const router = Router();


router.post('/new', registrarUsuario);

router.post('/', loginUsuario);

router.get('/renew', validarJWT,revalidarToken);





module.exports = router;