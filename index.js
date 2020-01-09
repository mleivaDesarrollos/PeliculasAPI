// Cargamos la librería express
const express = require('express');
const app = express();


// Cargamos las rutas
const router = require('./routes');

// Cargamos las variables de entorno
require('dotenv').config({path:'vars.env'});

const PORT = process.env.HTTP_PORT || 80;

// Cargamos la base de datos
const db = require('./config/db');

// Cargamos los modelos
require('./models/Actores');
require('./models/Peliculas');

// Sincronizamos la base de datos
db.sync();

// Configuramos el parseo de peticiones de tipo form y json
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// Escuchamos las rutas configuradas
app.use(router);

app.listen(PORT, () => {
    console.log(`El servidor esta activo escuchando sobre el puerto ${PORT}`);
});