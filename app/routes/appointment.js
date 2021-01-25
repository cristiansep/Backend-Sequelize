const {Router}= require('express');
const {validarJWT} = require('../middlewares/validar-jwt');
const { 
    crearReserva, 
    appointmentUpdate, 
    getAppointmentsUser, 
    getAppointmentsPendingUser, 
    getAppointmentsConfirmedUser, 
    getAppointmentsDoctor, 
    getAppointmentsPendingDoctor, 
    getAppointmentsConfirmedDoctor, 
    getAppointmentsAdmin, 
    getAppointmentsPendingAdmin,
    getAppointmentsConfirmedAdmin,
    appointmentUpdateStatusCancel
} = require('../controllers/appointmentController');



const router = Router();


//Users
router.get('/user',validarJWT,getAppointmentsUser);
router.get('/pending/user',validarJWT,getAppointmentsPendingUser);
router.get('/confirmed/user',validarJWT,getAppointmentsConfirmedUser);


//Doctors
router.get('/doctor',validarJWT ,getAppointmentsDoctor);
router.get('/pending/doctor',validarJWT,getAppointmentsPendingDoctor);
router.get('/confirmed/doctor',validarJWT,getAppointmentsConfirmedDoctor);


//Admin
router.get('/admin',validarJWT ,getAppointmentsAdmin);
router.get('/pending/admin',validarJWT,getAppointmentsPendingAdmin);
router.get('/confirmed/admin',validarJWT,getAppointmentsConfirmedAdmin);


//All
router.post('/new',validarJWT ,crearReserva);
router.put('/:id',validarJWT , appointmentUpdate);
router.put('/cancel/:id',validarJWT , appointmentUpdateStatusCancel);






module.exports = router;