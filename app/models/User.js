'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
   
    static associate(models) {
      User.hasMany(models.Address, {as: 'domicilio', foreignKey: 'residenteId'});
      User.hasMany(models.Appointment, { foreignKey: 'idDoctor'});
      User.hasMany(models.Appointment, { foreignKey: 'idPaciente'});
      User.belongsToMany(models.Specialty, {through: 'doctor_especialty', foreignKey: 'idUser'});
    }
  };
  User.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El campo no puede ser nulo'
        },
        len: {
          args: [2,255],
          msg: 'El nombre tiene que tener 2 o mas caracteres'
        }
      },
    },
    apellidoP:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El campo no puede ser nulo'
        },
        len: {
          args: [2,255],
          msg: 'El nombre tiene que tener 2 o mas caracteres'
        }
      },
    },
    apellidoM:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El campo no puede ser nulo'
        },
        len: {
          args: [2,255],
          msg: 'El nombre tiene que tener 2 o mas caracteres'
        }
      },
    },
    rut: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Debe ingresar un correo valido'
        }
      }
    },
    telefono: DataTypes.STRING,
    img: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'USER_ROLE'
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};