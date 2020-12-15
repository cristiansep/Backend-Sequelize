require('dotenv').config();
const express = require('express');
const {sequelize} = require('./models/index');
const cors = require('cors');


const app = express();


// CORS 
app.use(cors());


// lectura y parseo del body
app.use(express.json());
app.use(express.urlencoded({extended: false}));



//Rutas 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/doctor', require('./routes/doctor'));
app.use('/api/address', require('./routes/address'));
app.use('/api/specialty', require('./routes/specialty'));
app.use('/api/appointment', require('./routes/appointment'));
app.use('/api/schedule', require('./routes/schedule'));
app.use('/api/upload', require('./routes/upload'));




app.listen(process.env.PORT, async() => {
    try {

        await sequelize.authenticate();
        console.log("La conexión se ha establecido con éxito.");
        
        console.log(`Sevidor corriendo en el puerto ${process.env.PORT}`);
        
      } catch (error) {

        console.error("No se puede conectar a la base de datos:", error);
      }

});