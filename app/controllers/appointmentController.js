const {Appointment} = require('../models/index');
const {Specialty} = require('../models/index');
const {User} = require('../models/index');
const {sendEmail} = require('../helpers/appointment-email');
const { cancelEmail } = require('../helpers/emails/appointment-cancel-email');
const moment = require('moment');


const crearReserva = async(req,res) => {

    const {descripcion, idEspecialidad, idDoctor, fecha, hora, tipo, status} = req.body;
    const idPaciente = req.uid;

  try {

    const reservaDB = await Appointment.create({
        descripcion,
        idEspecialidad, 
        idDoctor,
        idPaciente,
        fecha,
        hora,
        tipo,
        status
    });

      const doctor = await reservaDB.getDoctor({
      attributes: ['id','nombre', 'apellidoP', 'email']})

      const paciente = await reservaDB.getPaciente({
        attributes: ['id','nombre', 'apellidoP', 'email']})

        const especialidad = await reservaDB.getSpecialty({
          // attributes: ['id','nombre', 'apellidoP', 'email']
        })

       
    
    res.json({
      ok: true,
      msg: "Reserva guardada correctamente",
      reservaDB,
      doctor,
      paciente,
      especialidad
    });
    
    sendEmail(reservaDB, doctor, paciente, especialidad);

  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "Error al tratar de crear una reserva",
    });
  }

    

}


//=================================================//
//                   Paciente                      //
//================================================//
const getAppointmentsUser = async (req, res) => {
  const idUser = req.uid;

  try {
    const reservas = await Appointment.findAll({
      where: {
        idPaciente: idUser,
        status: ["Atendida", "Cancelada"],
      },
      include: [
        {
          model: User,
          as: "Doctor",
          attributes: ["nombre", "apellidoP"],
        },
        {
          model: Specialty,
        },
      ],
    });

    res.json({
      ok: true,
      reservas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado hable con el administrador",
    });
  }
};


const getAppointmentsPendingUser = async (req, res) => {
  const idUser = req.uid;

  try {
    const reservas = await Appointment.findAll({
      where: {
        idPaciente: idUser,
        status: "Reservada",
      },
      include: [
        {
          model: User,
          as: "Doctor",
          attributes: ["nombre", "apellidoP"],
        },
        {
          model: Specialty,
          // attributes: ["nombre"],
        },
      ],
    });

    res.json({
      ok: true,
      reservas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado hable con el administrador",
    });
  }
};


const getAppointmentsConfirmedUser = async (req, res) => {
  const idUser = req.uid;

  try {
    const reservas = await Appointment.findAll({
      where: {
        idPaciente: idUser,
        status: "Confirmada",
      },
      include: [
        {
          model: User,
          as: "Doctor",
          attributes: ["nombre", "apellidoP"],
        },
        {
          model: Specialty,
          // attributes: ["nombre"],
        },
      ],
    });

    res.json({
      ok: true,
      reservas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado hable con el administrador",
    });
  }
};


//================================================//
//                   Doctor                       //
//================================================//
const getAppointmentsDoctor = async (req, res) => {
  const idUser = req.uid;

  try {
    const reservas = await Appointment.findAll({
      where: {
        idPaciente: idUser,
        status: ["Atendida", "Cancelada"],
      },
      include: [
        {
          model: User,
          as: 'Paciente',
          attributes: ["nombre", "apellidoP"],
        },
        {
          model: Specialty,
        },
      ],
    });

    res.json({
      ok: true,
      reservas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado hable con el administrador",
    });
  }
};


const getAppointmentsPendingDoctor = async (req, res) => {
  const idUser = req.uid;


  try {
    const reservas = await Appointment.findAll({
      where: {
        idDoctor: idUser,
        status: "Reservada",
      },
      include: [
        {
          model: User,
          as: 'Paciente',
          attributes: ["nombre", "apellidoP"],
        },
        {
          model: Specialty,
        },
      ],
    });

    res.json({
      ok: true,
      reservas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado hable con el administrador",
    });
  }
};



const getAppointmentsConfirmedDoctor = async (req, res) => {
  const idUser = req.uid;

  try {
    const reservas = await Appointment.findAll({
      where: {
        idDoctor: idUser,
        status: "Confirmada",
      },
      include: [
        {
          model: User,
          as: 'Paciente',
          attributes: ["nombre", "apellidoP"],
        },
        {
          model: Specialty,
        },
      ],
    });

    res.json({
      ok: true,
      reservas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado hable con el administrador",
    });
  }
};




//================================================//
//                   Admin                        //
//================================================//
const getAppointmentsAdmin = async (req, res) => {


  try {
    const reservas = await Appointment.findAll({
      where: {
        status: ["Atendida", "Cancelada"],
      },
      include: [
        {
          model: User,
          as: "Doctor",
          attributes: ["nombre", "apellidoP"],
        },
        {
          model: User,
          as: 'Paciente',
          attributes: ["nombre", "apellidoP"],
        },
        {
          model: Specialty,
        },
      ],
    });

    res.json({
      ok: true,
      reservas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado hable con el administrador",
    });
  }
};



const getAppointmentsPendingAdmin = async (req, res) => {


  try {
    const reservas = await Appointment.findAll({
      where: {
        status: "Reservada",
      },
      include: [
        {
          model: User,
          as: "Doctor",
          attributes: ["nombre", "apellidoP"],
        },
        {
          model: User,
          as: 'Paciente',
          attributes: ["nombre", "apellidoP"],
        },
        {
          model: Specialty,
        },
      ],
    });

    res.json({
      ok: true,
      reservas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado hable con el administrador",
    });
  }
};



const getAppointmentsConfirmedAdmin = async (req, res) => {


  try {
    const reservas = await Appointment.findAll({
      where: {
        status: "Confirmada",
      },
      include: [
        {
          model: User,
          as: "Doctor",
          attributes: ["nombre", "apellidoP"],
        },
        {
          model: User,
          as: 'Paciente',
          attributes: ["nombre", "apellidoP"],
        },
        {
          model: Specialty,
        },
      ],
    });

    res.json({
      ok: true,
      reservas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado hable con el administrador",
    });
  }
};



//======================================================//

const appointmentUpdate = async (req, res) => {

  const appointment = req.body;

  try {

     await Appointment.update(appointment, {
          where: {
              id: req.params.id
            }
      });

      res.json({
          ok: true,
          msg: 'Actualización realizada correctamente!',
          appointment
      });
      
  } catch (error) {
      console.log(error)
      res.status(500).json({
          ok: false,
          msg: 'Hable con el administrador'
      });
  }

}




const appointmentUpdateStatusCancel = async (req, res) => {

  const appointment = req.body;

  try {

     await Appointment.update(appointment, {
          where: {
              id: req.params.id
            }
      });


      cancelEmail(appointment);
      // console.log(appointment);

      res.json({
          ok: true,
          msg: 'Reserva cancelada correctamente!',
          appointment
      });
      
  } catch (error) {
      console.log(error)
      res.status(500).json({
          ok: false,
          msg: 'Hable con el administrador'
      });
  }

}


// (async () => {
  

//    try {
    
//       const fechaReserva = Appointment.fecha;
//       const fechaFormat = moment(fechaReserva).format('MM-DD-YYYY');
//       const now = moment().format('MM-DD-YYYY');

//       const reservas = await Appointment.findAll({where: {status: 'Confirmada'}});

//       console.log(reservas.status);
//       // if(fechaFormat === now || fechaFormat > now){
//       //   reservas.dataValues.status = "Atendida";
//       //   await reservas.DataValues.save();

//       // }
      
     
//    } catch (error) {
//      console.log(error)
//    }


// })();




module.exports = {
    crearReserva,
    getAppointmentsUser,
    getAppointmentsPendingUser,
    getAppointmentsConfirmedUser,
    getAppointmentsDoctor,
    getAppointmentsPendingDoctor,
    getAppointmentsConfirmedDoctor,
    getAppointmentsAdmin,
    getAppointmentsPendingAdmin,
    getAppointmentsConfirmedAdmin,
    appointmentUpdate,
    appointmentUpdateStatusCancel
}