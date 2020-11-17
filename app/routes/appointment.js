const {Router}= require('express');
const {validarJWT} = require('../middlewares/validar-jwt');
const { crearReserva } = require('../controllers/appointmentController');



const router = Router();


router.post('/',validarJWT ,crearReserva);






module.exports = router;