const Peliculas = require('../models/Peliculas');
const Actores = require('../models/Actores');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.listar = async(req, res) => {
    // El usuario puede pedir cantidad por rango y página, por tanto recolectamos los datos
    let {cantidad, pagina} = req.body;
    // Validamos si fueron pasados estos datos
    if(!cantidad) {
        return res.status(400).send('Es necesario indicar la propiedad "cantidad" en el payload.')
    }
    // Definimos el offset
    let offset = 0;
    // Si se comunicó la página se calcula el offset
    if(pagina && pagina > 1){  
        // La pagina 0 es la primera o de offset inicial, la 1 por comprension al consumidor de la api tambien, apartir de la 2 en adelante nos basariamos en offsets
        pagina--;      
        offset = cantidad * pagina
    }
    // Obtenemos las peliculas usando el método del ORM
    const peliculas = await Peliculas.findAll({offset, limit: cantidad, order:[['nombre','ASC']] });
    // Respondemos la petición usando el método json
    res.json(peliculas);
}

exports.primeraPorNombre = async (req, res) => {
    // Obtenemos el nombre de los parametros
    const {nombre} = req.body;
    // Validamos el parametro
    if(!nombre) {
        return res.status(400).send('Es necesario indicar el parametro -nombre-');
    }
    // Obtenemos la pelicula basandonos en el total y parte del nombre
    const pelicula = await Peliculas.findAll({
        limit:1, 
        where:{
            nombre: {
                [Op.substring]: nombre
            }
        },
        order: [
            ['id', 'ASC']
        ]
    })
    if(pelicula.length) {
        // Devolvemos el objeto procesado
        res.json(pelicula[0]);
    } else {
        res.status(404).send("Pelicula no encontrada");
    }
}

exports.nueva = async (req, res) => {
    // Obtenemos todos los elementos pertenecientes a la nueva pelicula
    const {
        nombre,
        pais,
        fecha_estreno,
        director,
        actores
    } = req.body;
    // Validamos si existe nombre
    if(!nombre) {
        return res.status(400).send('Es necesario indicar minimamente el -nombre- de la pelicula para generar una nueva.')
    }
    let pelicula;
    if(actores) {
        // Una vez validada las entradas pasamos a generar la nueva pelicula
        pelicula = await Peliculas.create({nombre, pais, fecha_estreno, director, actores}, {include: Actores});
    } else {
        // Generamos una pelicula en base a actores
        pelicula = await Peliculas.create({nombre, pais, fecha_estreno, director});
    }
    // Validamos que la pelicula haya sido creada
    if(pelicula) {
        res.status(200).send(`Se ha creado la película ${nombre} de manera exitosa.`)
    }
}

exports.actualizar = async(req, res) => {
    // Capturamos el nombre y el ID del JSON enviado, estos datos son determinantes para saber que actualizar
    const {nombre, id} = req.body;
    // Estos son los datos a actualizar
    const {nuevo_nombre, pais, fecha_estreno, director, actores} = req.body;
    // Disponemos del acumulador por pelicula
    let pelicula;
    // Son dos caminos diferentes dependiendo de si viene el nombre y el ID
    if(nombre) {
        // Hacemos la búsqueda de la película por nombre
        pelicula = await Peliculas.findOne({where: {nombre}, include: [{model: Actores}]});
    } else if (id) {
        // Buscamos la película por id
        pelicula = await Peliculas.findOne({where: {id}, include: [{model: Actores}]});
    } else {
        return res.status(400).send(`Para poder actualizar una película se necesita indicar -id- o -nombre- a actualizar. 
        Para indicar un nuevo nombre de película se tiene que utilizar el campo -nuevo_nombre-. Otros campos a actualizar son -pais-, -fecha_estreno-, -director- y -actores- `);
    }
    // Validamos si viene cargada la pelicula
    if(pelicula) {
        // Actualizamos los campos indicados
        if(nuevo_nombre) {
            pelicula.nombre = nuevo_nombre;
        }
        if(pais) {
            pelicula.pais = pais;
        }
        if(fecha_estreno) {
            pelicula.fecha_estreno = fecha_estreno;
        }
        if(director) {
            pelicula.director = director;
        }
        if(actores) {            
            // Eliminamos los actores registrados de la pelicula obtenido
            await Actores.destroy({where: {peliculaId: pelicula.id}})
            // Iteramos sobre todos los actores pasados y los vamos agregando
            actores.forEach( async(actor) => {
                await Actores.create({ nombre: actor.nombre, apellido: actor.apellido, peliculaId: pelicula.id});
            });
        }
        // Realizamos el guardado de la pelicula
        await pelicula.save();
        // Enviamos la respuesta
        res.send('Se ha actualizado la película de manera correcta');
    } else {
        res.status(404).send(`No se ha encontrado la película indicada.`);
    }    
}

exports.eliminar = async (req, res) => {
    // Recolectamos el id y el nombre de la petición
    const {id, nombre} = req.body;
    // Disponemos de las peliculas
    let pelicula;
    if(nombre) {
        // Buscamos una pelicula
        pelicula = await Peliculas.findOne({where: {nombre}});
    } else if(id) {
        // Buscamos una pelicula por id
        pelicula = await Peliculas.findOne({where: {id}});
    }
    // Validamos si encontramos alguna película
    if(pelicula) {
        await pelicula.destroy();
        // Se manda mensaje informando que la pelicula fue eliminada
        res.send('La pelicula fue eliminada de manera correcta.');
    } else {
        return res.status(404).send('La pelicula que intentaste localizar no fue encontrada');
    }
}