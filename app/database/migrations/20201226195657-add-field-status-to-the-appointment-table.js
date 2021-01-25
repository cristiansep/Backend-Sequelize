'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {

      return Promise.all([
        queryInterface.addColumn('appointments', 'status', {
          type: Sequelize.DataTypes.STRING,
          defaultValue: 'Reservada',
          allowNull: false,
        }, { transaction: t }),

      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('appointments', 'status', { transaction: t })
      ]);
    });
  }
};
