module.exports = {
  username: "admin",
  password: "cristiansep",
  database: "sequelize",
  dialect: "mysql",

  // define: {
  //   timestamps: false
  // },

  host: 'database-1.cynbjadxdhvp.us-east-2.rds.amazonaws.com',
  port: "3306",
  maxConcurrentQueries: 100,
  dialectOptions: {
      ssl:'Amazon RDS'
  },
  pool: { maxConnections: 5, maxIdleTime: 30},
  // language: 'en',
  
  // //Configurar seeds
  // seederStorage: 'json',
  // seederStoragePath: 'sequelizeSeeds.json',
  
  // //Configurar migraciones
  // migrationStorage: 'json',
  // migrationStoragePath: 'sequelizeMigration.json',
  
}