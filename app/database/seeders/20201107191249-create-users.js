'use strict';

const faker = require('faker');

module.exports = {
  // se ejecuta cuando hacemos la siembra
  up: async (queryInterface, Sequelize) => {

    const users = [
      {
        nombre: 'Test1', 
        rut: '1234567810', 
        password: '123', 
        email: 'test1@gmail.com',
        role: 'ADMIN_ROLE'
      },
      {nombre: faker.name.findName(), rut: faker.random.word(), password: faker.random.word(), email: faker.internet.email(), role: 'USER_ROLE'},
      {nombre: faker.name.findName(), rut: faker.random.word(), password: faker.random.word(), email: faker.internet.email(), role: 'USER_ROLE'},
      {nombre: faker.name.findName(), rut: faker.random.word(), password: faker.random.word(), email: faker.internet.email(), role: 'USER_ROLE'},
      {nombre: faker.name.findName(), rut: faker.random.word(), password: faker.random.word(), email: faker.internet.email(), role: 'USER_ROLE'},
    ];
  
      await queryInterface.bulkInsert('users', users, {});
    
  },

  //esto se ejecuta cuando se desace la siembra
  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('users', null, {});
    
  }
};
