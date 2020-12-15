const {User} = require('../models/index');
const bcrypt = require('bcrypt');
const {generarJWT} = require('../helpers/jwt');




//Agregar usuario y direccion asociada
const registrarUsuario = async (req, res) => {

    const {nombre, apellidoP, apellidoM, email, calle} = req.body;
    let {password} = req.body;

    try {

        let usuario = await User.findOne({where: {email}});


        if(usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con ese correo electronico'
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
        const token = await generarJWT(usuarioGuardado.id, usuarioGuardado.nombre, usuarioGuardado.role);

        res.json({
            ok: true,
            msg: 'Usuario guardado correctamente',
            uid: usuarioGuardado.id,
            name: usuarioGuardado.nombre,
            rol: usuarioGuardado.role,
            token
        });
        
    } catch (error) {
        console.log(error)
        const {errors} = error
        res.status(500).json({
            ok: false,
            errors,
            msg: 'Error al tratar de crear usuario'
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
                msg: 'Email o contraseña no son correctos'
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
        const token = await generarJWT(usuario.id, usuario.nombre, usuario.role);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.nombre,
            rol: usuario.role,
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

    const {uid, name, rol} = req;

    console.log(uid)

    const token = await generarJWT(uid, name, rol);

    res.json({
        ok:true,
        uid,
        name,
        rol,
        token
    })

}



module.exports = {
    registrarUsuario,
    loginUsuario,
    revalidarToken
}