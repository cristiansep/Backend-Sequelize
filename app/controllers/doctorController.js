const {User} = require('../models/index');
const {Specialty} = require('../models/index');
const {Schedule} = require('../models/index');
const bcrypt = require('bcrypt');





const getMedicos = async (req, res) => {

    try {
      const users = await User.findAll({
        include: [
            {
                association: "domicilio",
                attributes: ["calle"],
            },{
                model: Specialty,
                through: {
                    attributes: []
                  },
            }
        ],
        attributes: { exclude: ['password'] },
        where: {
            role: 'DOCTOR_ROLE'
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



   //ver doctores asociados a su especialidad
   const getSpecialtyDoctor = async (req, res) => {

    const uid = req.params.id;

    try {

        const specialty = await Specialty.findByPk(uid);
        const specialtyDoctor = await specialty.getUsers({
            attributes: ['id','nombre', 'apellidoP'],
            joinTableAttributes: [] 
            
        })
      

        res.json({
            ok: true,
            specialtyDoctor
          });
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            message: 'Usuario no existe'
        });
    }

  }





//Agregar doctor asociado a su especialidad
const crearDoctor = async (req, res) => {

    const {nombre, apellidoP, apellidoM, email, telefono,calle, especialidad} = req.body;
    let {password} = req.body;

    try {

        let usuario = await User.findOne({where: {email}});


        if(usuario) {
            return res.status(400).json({
                ok: false,
                message: 'Un doctor ya existe con ese correo electronico'
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
            telefono,
            domicilio: {
                calle: calle
            }
        }, {
            include: 'domicilio'
        });

        usuarioGuardado.addSpecialties(especialidad);

        res.json({
            ok: true,
            msg: 'Doctor guardado correctamente',
            uid: usuarioGuardado.id,
            name: usuarioGuardado.nombre,
            rol: usuarioGuardado.role,
        });
        
    } catch (error) {
        console.log(error)
        const {errors} = error
        res.status(500).json({
            ok: false,
            errors,
            msg: 'Error al tratar de crear doctor'
        });
    }

}



const actualizarMedico = (req, res) => {

    const {nombre, apellidoP, apellidoM, email, telefono,calle, especialidad} = req.body;
    const uid = req.params.id;

  
    try {
  
    //   const usuarioDB = await User.findByPk(uid);
  
    //   if(!usuarioDB) {
    //       return res.status(404).json({
    //           ok:false,
    //           msg: 'No existe un usuario con ese Id'
    //       });
    //   }
  
        //  const usuarioActualizado = await User.update({
        //     nombre,
        //     apellidoP,
        //     apellidoM,
        //     email,
        //     telefono,
        //     domicilio: {
        //         calle: calle
        //     }
        // },{  
        //     where: {
        //         id: req.params.id
        //     },
        // },{
        //     include:'domicilio',
        //     include: {
        //       model: Specialty
        //     }    
        // });

          // usuarioActualizado.addSpecialties(especialidad);
          // specialty.addUser(usuarioActualizado);

          
            User.findOne({where: {id: req.params.id}, include: {model: Specialty}})
              .then(user => {
                  Specialty.findByPk(req.params.id)
                    .then(specialty => {
                      user.setSpecialties(especialidad);
                      console.log(specialty)
                    });
                 user.update(req.body, {include: {model: Specialty}})
              });
        
  
        res.json({
            ok: true,
            msg: 'Usuario actualizado correctamente',
            // usuarioActualizado,

        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al tratar de actualizar usuario'
        });
    }
  
  }

 
 
  
  const eliminarMedico = async (req,res) => {

    
    try {
  
            await User.destroy({
            where: {
                id: req.params.id
              }
        });
  
        res.json({
            ok: true,
            msg: 'Doctor eliminado correctamente',
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al tratar de eliminar un doctor'
        });
    }
  
  }
  
  


module.exports = {
    crearDoctor,
    getMedicos,
    actualizarMedico,
    eliminarMedico,
    getSpecialtyDoctor
}