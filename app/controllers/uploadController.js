const { v4: uuidv4 } = require('uuid');
const {actualizarImagen} = require('../helpers/actualizar-imagen');

const fileUpload = (req,res) => {


    const id = req.params.id;

    //Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg: 'No hay ningún archivo'
        });
      }

      //Procesar imagen
      const file = req.files.imagen;

      const nombreCortado = file.name.split('.');
      const extensionArchivo = nombreCortado[nombreCortado.length - 1];


      //Validar extension
      const extensionesValidas = ['jpg', 'png', 'jpeg', 'gif'];
      if(!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok:false,
            msg: 'No es una extensión permitida'
        });
      }

      //Generar nombre de imagen
      const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;


      //Path para guardar imagen
      const path = `./app/uploads/${nombreArchivo}`;

      //Mover imagen
      file.mv(path, (err) => {
        if (err){ 
            console.log(err)
            return res.status(500).json({
              ok:false,
              msg: 'Error al mover la imagen'
            });
        }


        //Actualizar imagen
        actualizarImagen(id, nombreArchivo);
          
        res.json({
            ok:true,
            nombreArchivo,
            msg: 'Archivo subido'
        });
     
      });



   

}



module.exports = {
    fileUpload
}