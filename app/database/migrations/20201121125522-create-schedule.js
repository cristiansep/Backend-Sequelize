'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      start: {
        type: Sequelize.DATE ,
        allowNull: false,
      },
      end: {
        type: Sequelize.DATE ,
        allowNull: false,
      },
      idDoctor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('schedules');
  }
};