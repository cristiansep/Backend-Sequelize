'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([

        //Agregar campos a una tabla existente

        //campo 1 
        queryInterface.addColumn('users', 'telefono', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),

        //campo 2
        queryInterface.addColumn('users', 'img', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([

        //Remover campos agregados
        
        queryInterface.removeColumn('users', 'telefono', { transaction: t }),

        queryInterface.removeColumn('users', 'img', { transaction: t })

      ]);
    });
  }
};
