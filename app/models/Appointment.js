'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    
    static associate(models) {
      Appointment.belongsTo(models.Specialty, {as: 'idEspecialidad'});
      Appointment.belongsTo(models.User, {as: 'idDoctor'});
      Appointment.belongsTo(models.User, {as: 'idPaciente'});
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
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};