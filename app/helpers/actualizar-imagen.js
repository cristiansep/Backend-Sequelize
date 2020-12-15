const fs = require('fs');
const {User} = require('../models/index');


const actualizarImagen = async(id, nombreArchivo) => {

    try {

        const usuario = await User.findByPk(id);
        if(!usuario) {
            return res.status(404).json({
                ok:false,
                msg: 'No existe un usuario con ese Id'
            });
        }

        const pathViejo = `./app/uploads/${usuario.img}`;
        if(fs.existsSync(pathViejo)) {
            //borrar imagen anterior
            fs.unlinkSync(pathViejo);
        }

        usuario.img = nombreArchivo;
        await usuario.save();
        return true;
        
    } catch (error) {
        
    }

}





module.exports = {
    actualizarImagen
}