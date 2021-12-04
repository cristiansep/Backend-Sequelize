'use strict';


const faker = require('faker');
const {User} = require('../../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {


    let addresses = [];

    let users = await User.findAll();

    //Recorrer usuarios y le añadimos una direccion aleatoria
    users.forEach(user => {
      addresses.push({
        calle: faker.address.streetName(),
        residenteId: user.id
      });
    });

 
      await queryInterface.bulkInsert('Addresses', addresses, {});
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkDelete('Addresses', null, {});
  
  }
};

