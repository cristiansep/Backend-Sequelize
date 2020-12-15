const {Router}= require('express');
const {validarJWT} = require('../middlewares/validar-jwt');
const { crearDoctor, getMedicos, actualizarMedico, eliminarMedico } = require('../controllers/doctorController');



const router = Router();

router.get('/',validarJWT ,getMedicos);
router.post('/new',validarJWT ,crearDoctor);
router.put('/:id',validarJWT , actualizarMedico);
router.delete('/:id',validarJWT , eliminarMedico);



module.exports = router;