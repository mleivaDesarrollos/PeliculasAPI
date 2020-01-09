const Sequelize = require('sequelize');
const db = require('../config/db');
const Actores = require('./Actores');

const Peliculas = db.define('peliculas', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING,
    pais: Sequelize.STRING,
    fecha_estreno: Sequelize.DATE,
    director: Sequelize.STRING
});

Peliculas.hasMany(Actores);

module.exports = Peliculas;

