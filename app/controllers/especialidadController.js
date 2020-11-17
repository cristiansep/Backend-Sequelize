const {Specialty} = require("../models");




const getEspecialidades = async (req, res) => {

    try {

        const especialidades = await Specialty.findAll({});

        res.json({
          ok: true,
          especialidades
        });
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            message: 'Error al cargar especialidades'
        });
        
    }  
  
  }

  const getEspecialidadById = async (req,res) => {

    const uid = req.params.id;

    try {

        const especialidad = await Specialty.findByPk(uid);

        res.json({
            ok: true,
            especialidad
          });
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            message: 'Especialidad no existe'
        });
    }

     

  }



const crearEspecialidad = async (req, res) => {

    const {name} = req.body;

    try {

        const especialidadDB = await Specialty.create({
            name
        });

        res.json({
            ok: true,
            message: 'Especilidad guardada correctamente',
            especialidadDB
        });
        
    } catch (error) {
        console.log(error)
        const {errors} = error
        res.status(500).json({
            ok: false,
            errors,
            message: 'Hable con el administrador'
        });
    }

}


const actualizarEspecialidad = async (req, res) => {

    const especialidad = req.body;

    try {

       await Specialty.update(especialidad, {
            where: {
                id: req.params.id
              }
        });

        res.json({
            ok: true,
            message: 'Especialidad actualizada correctamente',
            especialidad
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: 'Hable con el administrador'
        });
    }

}

const eliminarEspecialidad = async (req,res) => {

    try {

            await Specialty.destroy({
            where: {
                id: req.params.id
              }
        });

        res.json({
            ok: true,
            message: 'Especialidad eliminada correctamente',
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: 'Error al tratar de eliminar usuario'
        });
    }

}


module.exports = {
    crearEspecialidad,
    getEspecialidades,
    getEspecialidadById,
    actualizarEspecialidad,
    eliminarEspecialidad
}