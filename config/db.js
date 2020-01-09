// Cargamos las variables de entorno
require('dotenv').config({path:'vars.env'});

// Cargamos el ORM Sequelize
const Sequelize = require('sequelize');

// Llevantamos todas las variables de entorno
const USER = process.env.DB_USER || 'root';
const PASS = process.env.DB_PASS || 'root';
const DATABASE = process.env.DB_NAME || 'videoclub';
const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || 3306;

const db = new Sequelize(DATABASE, USER, PASS, {
    dialect: 'mariadb',
    host: HOST,
    port: PORT,
    define: {
        timestamps: false
    },
    pool: {
        min: 0,
        max: 5,
        idle: 10000,
        acquire: 30000
    }
});

module.exports = db;