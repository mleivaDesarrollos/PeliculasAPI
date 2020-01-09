const Sequelize = require('sequelize');
const db = require('../config/db');

const Actores = db.define('actores', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING,
    apellido: Sequelize.STRING
});

module.exports = Actores;