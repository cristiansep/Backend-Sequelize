module.exports = {
  username: "root",
  password: "",
  database: "sequelize",
  host: "127.0.0.1",
  dialect: "mysql",
  define: {
    timestamps: false
  },
  
  //Configurar seeds
  seederStorage: 'json',
  seederStoragePath: 'sequelizeSeeds.json',
  
  //Configurar migraciones
  migrationStorage: 'json',
  migrationStoragePath: 'sequelizeMigration.json',
  
}