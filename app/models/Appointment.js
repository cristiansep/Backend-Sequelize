'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    
    static associate(models) {
      // Appointment.belongsTo(models.Specialty, {as: 'especialidad'});
      // Appointment.belongsTo(models.User, {as: 'doctor'});
      // Appointment.belongsTo(models.User, {as: 'idPaciente'});

      Appointment.belongsTo(models.Specialty, {foreignKey: 'idEspecialidad'});
      Appointment.belongsTo(models.User, {as: 'Doctor', foreignKey: 'idDoctor'});
      Appointment.belongsTo(models.User, {as: 'Paciente', foreignKey: 'idPaciente'});
    }
  };
  Appointment.init({
    descripcion: DataTypes.STRING,
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Reservada'
    },
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};




