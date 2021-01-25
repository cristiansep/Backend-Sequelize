'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('appointments', 'hora', {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
        }, { transaction: t })
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('appointments', 'hora',{
          type: Sequelize.DataTypes.TIME,
          allowNull: false,
        }, { transaction: t })
      ]);
    });
  }
};
