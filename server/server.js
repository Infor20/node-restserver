require('./config/config.js');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


const app = express();
const bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

// habilitar carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

app.use(require('./rutas/index'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (err, res) => {


        if (err) throw err;

        console.log('Bases de datos ONLINE');
    });

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto: ', 3000);
});