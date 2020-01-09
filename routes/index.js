// Cargamos express
const express = require('express');
const router = express.Router();

// Cargamos los controladores de uso
const peliculasController = require('../controllers/peliculasController');

// Escuchamos las rutas relacionadas a la API de versión 1

// Obtenemos todas las películas paginadas y ordenadas por nombre
router.get('/api/v1/peliculas', peliculasController.listar);

// Obtenemos la primera pelicula basada en el nombre
router.get('/api/v1/pelicula', peliculasController.primeraPorNombre);

// Ruta para la generación de una nueva película
router.post('/api/v1/peliculas', peliculasController.nueva);

// Ruta para la actualización de una película
router.put('/api/v1/peliculas', peliculasController.actualizar);

// Ruta para la eliminación de una pelicula
router.delete('/api/v1/peliculas', peliculasController.eliminar);

// Exportamos el router para uso de otras librerías
module.exports = router;