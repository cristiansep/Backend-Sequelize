'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Schedule.belongsTo(models.User, {foreignKey: 'idDoctor'});
    }
  };
  Schedule.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};