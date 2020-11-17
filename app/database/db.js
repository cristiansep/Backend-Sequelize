const {Sequelize, DataTypes} = require('sequelize');
const config = require('../../config/database');


const sequelize = new Sequelize(config.database, config.username, config.password, config);


// Vincular modelos a BD
sequelize.User = require('../models/User')(sequelize,DataTypes);
sequelize.Address = require('../models/Address')(sequelize,DataTypes);


// asociar modelos
sequelize.User.associate(sequelize);
sequelize.Address.associate(sequelize)


// module.exports = sequelize;