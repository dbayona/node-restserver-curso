require('./config/config');

const express = require('express');
// Using Node.js `require()`
const mongoose = require('mongoose');

const path = require('path');

const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Habilitar la carpeta PUBLIC para que pueda ser accedida desde cualquier lugar
app.use(express.static(path.resolve(__dirname, '../public')));

//console.log('Ruta1: ' + __dirname + '../public');
//console.log('Ruta2: ' + path.resolve(__dirname, '../public'));

//Configuración global de rutas
app.use(require('./routes/index'));

const conexionDB = async() => {

    try {
        const conexionMongo = await mongoose.connect(process.env.URLDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("Base de Datos Mongo Online");
    } catch (e) {
        console.log("Error al conectar a Mongo");
    }
};

conexionDB();

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto ', process.env.PORT);
});