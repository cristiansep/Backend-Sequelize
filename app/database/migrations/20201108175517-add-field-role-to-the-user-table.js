'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {

      return Promise.all([

        queryInterface.addColumn('users', 'role', {
          type: Sequelize.DataTypes.STRING,
          defaultValue: 'USER_ROLE',
          allowNull: false,
        }, { transaction: t }),

      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('users', 'role', { transaction: t })
      ]);
    });
  }
};
