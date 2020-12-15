'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DoctorSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DoctorSchedule.belongsTo(models.User, {foreignKey: 'idDoctor'});
    }
  };
  DoctorSchedule.init({
    morning_start: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    morning_end: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    afternoon_start: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    afternoon_end: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'DoctorSchedule',
  });
  return DoctorSchedule;
};