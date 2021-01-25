const {Router}= require('express');
const {validarJWT} = require('../middlewares/validar-jwt');
const { crearDoctor, getMedicos, actualizarMedico, eliminarMedico, getSpecialtyDoctor } = require('../controllers/doctorController');



const router = Router();

router.get('/',validarJWT ,getMedicos);
router.get('/:id/specialties',validarJWT ,getSpecialtyDoctor);
router.post('/new',validarJWT ,crearDoctor);
router.put('/:id',validarJWT , actualizarMedico);
router.delete('/:id',validarJWT , eliminarMedico);



module.exports = router;