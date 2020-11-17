const {Router}= require('express');
const { crearDoctor } = require('../controllers/doctorController');



const router = Router();


router.post('/new', crearDoctor);



module.exports = router;