const {User} = require('../models/index');
const bcrypt = require('bcrypt');
const {generarJWT} = require('../helpers/jwt');




//Agregar usuario y direccion asociada
const crearUsuario = async (req, res) => {

    const {nombre, apellidoP, apellidoM, email, calle} = req.body;
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
            domicilio: {
                calle: calle
            }
          
        }, {
            include: 'domicilio'
        });

        //Generar token
        const token = await generarJWT(usuarioGuardado.id, usuarioGuardado.nombre);

        res.json({
            ok: true,
            message: 'Usuario guardado correctamente',
            uid: usuarioGuardado.id,
            name: usuarioGuardado.nombre,
            token
        });
        
    } catch (error) {
        console.log(error)
        const {errors} = error
        res.status(500).json({
            ok: false,
            errors,
            message: 'Error al tratar de crear usuario'
        });
    }

}


const loginUsuario = async(req,res) => {

    const {email, password} = req.body;

    try {

        const usuario = await User.findOne({where: {email}});


        if(!usuario) {
            return res.status(400).json({
                ok: false,
                message: 'Email o contraseña no son correctos'
            });
        }

        //confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        //Generar token
        const token = await generarJWT(usuario.id, usuario.nombre);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.nombre,
            token
        });


        
    } catch (error) {
        console.log(error)
        const {errors} = error
        res.status(500).json({
            ok: false,
            errors,
            message: 'Por favor hable con el administrador'
        });
    }


}


const revalidarToken = async(req,res) => {

    const {uid, name} = req.uid;

    const token = await generarJWT(uid, name);

    res.json({
        ok:true,
        token
    })

}



module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}