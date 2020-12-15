const {Router}= require('express');
const expressFileUpload = require('express-fileupload');
const {fileUpload} = require('../controllers/uploadController');


const router = Router();

router.use(expressFileUpload());


router.put('/:id', fileUpload);
// router.post('/new', crearDoctor);



module.exports = router;