//common js sintaxis:  const express = require('express');
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';


console.log(process.env.DATABASE)

const app = express();

//Conectar a la base de datos
db.authenticate()
    .then( () => console.log('base de datos conectada'))
    .catch( error => console.log(error) );

//Definir puerto
const port = process.env.PORT || 4000;

//Habilitar PUG
app.set('view engine','pug');

// Otener año actual
app.use( (req, res, next) => {
    const year = new Date();

    res.locals.currentYear = year.getFullYear();
    res.locals.nombresitio = 'Agencia de viajes';
    return next();
    
});

//Agregar body parse para leer datos de formulario
app.use(express.urlencoded({extended: true}))

//Definir carpeta publica
app.use(express.static('public'));

//Agregar router
app.use('/', router)

//Arranca la aplicación
app.listen( port, () => {
    console.log(`El Servidor esta funcionando en el puerto ${port}`)
});