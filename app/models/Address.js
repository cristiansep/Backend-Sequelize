'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
  
    static associate(models) {
      Address.belongsTo(models.User, {as: 'residente'});
    }
  };
  Address.init({
    calle:{
      type:DataTypes.STRING,
      allowNull: false,
    }, 
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};