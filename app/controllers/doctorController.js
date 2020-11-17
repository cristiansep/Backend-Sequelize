const {User} = require('../models/index');
const {Specialty} = require('../models/index');
const bcrypt = require('bcrypt');


//Agregar usuario y direccion asociada
const crearDoctor = async (req, res) => {

    const {nombre, apellidoP, apellidoM, email, calle, especialidad} = req.body;
    let {password} = req.body;

    try {

        let usuario = await User.findOne({where: {email}});


        if(usuario) {
            return res.status(400).json({
                ok: false,
                message: 'Un usuario ya existe con ese correo electronico'
            });
        }

     
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        password = bcrypt.hashSync(password, salt);

        const usuarioGuardado = await User.create({
            nombre,
            apellidoP,
            apellidoM,
            password,
            email,
            role: 'DOCTOR_ROLE',
            domicilio: {
                calle: calle
            }, 
        }, {
            include: 'domicilio'
        });

        const specialty = await Specialty.create({
            name: especialidad
        });

        specialty.addUsers(usuarioGuardado);

        res.json({
            ok: true,
            message: 'Doctor guardado correctamente',
            uid: usuarioGuardado.id,
            name: usuarioGuardado.nombre,
            rol: usuarioGuardado.role,
            especialidad: specialty.name
        });
        
    } catch (error) {
        console.log(error)
        const {errors} = error
        res.status(500).json({
            ok: false,
            errors,
            message: 'Error al tratar de crear doctor'
        });
    }

}


module.exports = {
    crearDoctor
}