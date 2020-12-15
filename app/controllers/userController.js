const {User} = require('../models/index');
const bcrypt = require('bcrypt');





const getUsuarios = async (req, res) => {

  try {
    const users = await User.findAll({
      include: {
        association: "domicilio",
        attributes: ["calle"],
      },
      attributes: { exclude: ['password'] },
      where: {
        role: 'USER_ROLE'
    }
    });

    res.json({
      ok: true,
      users,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Error inesperado hable con el administrador",
    });
  }
};


const getUsuarioById = async (req,res) => {

  const uid = req.params.id;

  try {

      const user = await User.findByPk(uid);

      res.json({
          ok: true,
          user
        });
      
  } catch (error) {
      console.log(error)
      res.status(400).json({
          ok: false,
          message: 'Usuario no existe'
      });
  }

   

}


const crearUsuario = async (req, res) => {

    const {nombre, apellidoP, apellidoM, email, role ,calle} = req.body;
    let {password} = req.body;
  
  
    try {

      const existeEmail = await User.findOne({where: {email}});
  
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Este correo ya a sido registrado",
        });
      }
  
  
  
      // Encriptar contraseña
      const salt = bcrypt.genSaltSync();
      password = bcrypt.hashSync(password, salt);
  
  
      const usuarioGuardado = await User.create({
        nombre,
        apellidoP,
        apellidoM,
        password,
        email,
        role,
        domicilio: {
            calle: calle
        }
      
    }, {
        include: 'domicilio'
    });
  


      res.json({
        ok: true,
        msg: 'Usuario guardado correctamente',
        uid: usuarioGuardado.id,
        name: usuarioGuardado.nombre,
        rol: usuarioGuardado.role,
  
    });
  
  
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Error al tratar de guardar usuario",
      });
    }
  
};



const actualizarUsuario = async (req, res) => {

  const usuario = req.body;
  const uid = req.params.id;

  try {

    const usuarioDB = await User.findByPk(uid);

    if(!usuarioDB) {
        return res.status(404).json({
            ok:false,
            msg: 'No existe un usuario con ese Id'
        });
    }

     await User.update(usuario, {
          where: {
              id: req.params.id
            }
      });

      res.json({
          ok: true,
          msg: 'Usuario actualizado correctamente',
          usuario
      });
      
  } catch (error) {
      console.log(error)
      res.status(500).json({
          ok: false,
          msg: 'Error al tratar de actualizar usuario'
      });
  }

}


const eliminarUsuario = async (req,res) => {

  // const {uid} = req;
  
  try {

          await User.destroy({
          where: {
              id: req.params.id
            }
      });

      res.json({
          ok: true,
          msg: 'Usuario eliminado correctamente',
      });
      
  } catch (error) {
      console.log(error)
      res.status(500).json({
          ok: false,
          msg: 'Error al tratar de eliminar usuario'
      });
  }

}


module.exports = {
    getUsuarios,
    getUsuarioById,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario 
}