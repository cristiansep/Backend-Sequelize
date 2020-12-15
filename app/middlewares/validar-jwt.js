const jwt = require('jsonwebtoken');
const {User} = require('../models/index');

const validarJWT = (req, res, next) => {

    // x-token headers
    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            ok: false,
            message: 'No hay token en la petición'
        });
    }

    try {

        const {uid, name, rol} = jwt.verify(
            token, 
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid,
        req.name = name
        req.rol = rol

        
    } catch (error) {

        return res.status(401).json({
            ok: false,
            message: 'Token no valido'
        });
        
    }


    next();

}



const validarADMIN_ROLE = async(req, res, next) => {

    const uid = req.uid;
   
    try {

        const usuarioDB = await User.findByPk(uid);

        if(!usuarioDB) {
            return res.status(404).json({
                ok:false,
                msg: 'Usuario no existe'
            });
        }

        if(usuarioDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok:false,
                msg: 'No tiene privilegios para eso'
            });
        }


        next();
        
        
    } catch (error) {

        return res.status(500).json({
            ok: false,
            message: 'Hable con el adminitrador'
        });
        
    }


    next();

}



module.exports = {
    validarJWT,
    validarADMIN_ROLE
}