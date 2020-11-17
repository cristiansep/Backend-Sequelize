'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Specialty.hasMany(models.Appointment, {as: 'especialidad', foreignKey: 'idEspecialidad'});
      Specialty.belongsToMany(models.User, {through: 'doctor_especialty', foreignKey: 'idSpecialty'});
    }
  };
  Specialty.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Specialty',
  });
  return Specialty;
};