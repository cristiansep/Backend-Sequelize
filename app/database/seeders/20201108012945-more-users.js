'use strict';

const {User} = require('../../models');
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    return Promise.all([
      User.create({
        nombre: faker.name.findName(), 
        rut: faker.random.word(), 
        password: faker.random.word(), 
        email: faker.internet.email(),
        domicilio: {
          calle: faker.address.streetName()
        }
      },{
        include: 'domicilio'
      }),

      User.create({
        nombre: faker.name.findName(), 
        rut: faker.random.word(), 
        password: faker.random.word(), 
        email: faker.internet.email(),
        domicilio: {
          calle: faker.address.streetName()
        }
      },{
        include: 'domicilio'
      }),

      User.create({
        nombre: faker.name.findName(), 
        rut: faker.random.word(), 
        password: faker.random.word(), 
        email: faker.internet.email(),
        domicilio: {
          calle: faker.address.streetName()
        }
      },{
        include: 'domicilio'
      }),
    ]);
    
  },

  down: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkDelete('users', null, {});
     
  }
};
