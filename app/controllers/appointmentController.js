const {Appointment} = require('../models/index');

const crearReserva = async(req,res) => {

    const {descripcion, idEspecialidad, idDoctor, fecha, hora, tipo} = req.body;
    const idPaciente = req.uid;

  try {

    const reservaDB = await Appointment.create({
        descripcion,
        idEspecialidad, 
        idDoctor,
        idPaciente,
        fecha,
        hora,
        tipo
    });


    res.json({
        ok: true,
        msg: "Hola",
        reservaDB
    });


  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      message: "Error al cargar especialidades",
    });
  }

    

}


module.exports = {
    crearReserva
}