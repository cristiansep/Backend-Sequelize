const {Schedule} = require('../models/index');
const {User} = require('../models/index');




const crearHorario = async (req, res) => {

  const { title, start, end } = req.body;
  const idDoctor = req.uid;

  try {
    const horarioGuardado = await Schedule.create({
      title,
      start,
      end,
      idDoctor,
    });

    return res.json({
      ok: true,
      msg: "Creado",
      horarioGuardado,
    });

  } catch (error) {
    console.log(error);
    const { errors } = error;
    res.status(500).json({
      ok: false,
      errors,
      msg: "Por favor hable con el administrador",
    });
  }
};



const getTurnos = async (req, res) => {

    try {
      const turnos = await Schedule.findAll({
        include: {
          model: User,
          attributes: ["nombre"],
        }
      });
  
      res.json({
        ok: true,
        turnos,
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Error inesperado hable con el administrador",
      });
    }
  };
  

  const actualizarHorario = async (req, res) => {

    const horarioId = req.params.id;
    const uid = req.uid;

    try {
      const horario = await Schedule.findByPk(horarioId);

      if (!horario) {
        return res.status(404).json({
          ok: false,
          msg: "No existe un horario con ese Id",
        });
      }

      if (horario.idDoctor !== uid) {
        return res.status(401).json({
          ok: false,
          msg: "No tiene privilegios para editar este horario",
        });
      }

      const nuevoHorario = {
        ...req.body,
        idDoctor: uid,
      };

      const horarioActualizado = await Schedule.update(nuevoHorario, {
        where: {
          id: horarioId,
        },
      });

      res.json({
        ok: true,
        msg: "Horario actualizado correctamente",
        horario: nuevoHorario,
        horarioActualizado
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Error inesperado hable con el administrador",
      });
    }
  };


  const eliminarHorario = async(req, res) => {

    const horarioId = req.params.id;
    const uid = req.uid;

    try {
      const horario = await Schedule.findByPk(horarioId);

      if (!horario) {
        return res.status(404).json({
          ok: false,
          msg: "No existe un horario con ese Id",
        });
      }

      if (horario.idDoctor !== uid) {
        return res.status(401).json({
          ok: false,
          msg: "No tiene privilegios para editar este horario",
        });
      }

      await Schedule.destroy({
        where: {
          id: horarioId,
        },
      });

      res.json({
        ok: true,
        msg: "Horario eliminado correctamente",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Error inesperado hable con el administrador",
      });
    }
  }


module.exports = {
    crearHorario,
    getTurnos,
    actualizarHorario,
    eliminarHorario 
}
