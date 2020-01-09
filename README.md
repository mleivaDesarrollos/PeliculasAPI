# PeliculasAPI
# Desafio para búsqueda de desarrollador JR/SSR en NodeJS

## Descripción
Un videoclub necesita exponer una API que permita gestionar películas. El proyecto está basado en el modelo-vista-controlador. El framework de MVC esta personalizado para el proyecto (no está basado en un Framework específico). 

## Indice
- Requisitos
- Instalación
- Configuración
- Utilización

## Requisitos
Para poder utilizar el repositorio en cuestión se necesita tener instalado los siguientes aplicativos
- MariaDB
- NodeJS (Versión estable)

Al instalar MariaDB es necesario configurar el usuario y la contraseña, además de crear la base de datos que almacenaría todos los registros relacionados.

## Instalación
Una vez instalado los aplicativos mencionados anteriormente es necesario clonar el repositorio en la PC local.

Una vez clonado, dirigirse a la carpeta mediante linea de comandos CMD/BASH y ejecutar "NPM INSTALL" para poder instalar todas las dependendencias relacionadas

## Configuración
En el raíz del directorio en cuestión es necesario es posible crear un archivo llamado **vars.env** que contiene las variables de configuración de la base de datos. Este archivo acepta las siguientes propiedades:
 - DB_USER : Usuario configurado en el motor SQL con permisos de modificacion en base de datos
 - DB_PASS : Contraseña del usuario anterior
 - DB_HOST : Ruta del servidor SQL (En caso de ser local 127.0.0.1 o localhost)
 - DB_PORT : Por defecto es 3306
 - DB_NAME : La base de datos que contendrá toda la información relacionada de la API
 - HTTP_PORT : Puerto de servidor, por navegador se podrá acceder por medio localhost:(puerto)

### Ejemplo
DB_USER=root

DB_PASS=root

DB_HOST=127.0.0.1

DB_PORT=3306

DB_NAME=videoclub

HTTP_PORT=80

Una vez configurado todo lo indicado e iniciada la instancia de MariaDB, iniciar mediante **node index.js**

## Utilización

Para poder probar el funcionamiento de la API se puede utilizar ***CURL*** o ***POSTMAN***. La dirección de URL para las peticiones API es: **/api/v1/peliculas**.

Es necesario que en las peticiones se agregue el header **Content-Type**:**application/json** para poder enviar respuesta.

Los métodos existentes para la operación sobre la api son las siguientes:

- URL: **/api/v1/peliculas** - Metodo: **GET**
Obtiene el listado de peliculas almacenadas en la API ordenados por nombre. Se debe especificar un json en el body de la petición con la propiedad **cantidad**, de otra forma la petición no se puede completar. Tambien se puede aplicar la propiedad **pagina** que permite filtrar cantidad de resultados devueltos por la petición.

- URL: **/api/v1/pelicula** - Metodo: **GET**
Obtiene una película. Se debe enviar un payload JSON con el parametro **nombre** para poder obtener una respuesta adecuada. No es necesario escribir la totalidad del nombre de la película, con escribir una parte ya es suficiente.

- URL: **/api/v1/peliculas** - Metodo: **POST**
Crea una nueva película en la API. Se tiene que especificar el parametro **nombre** para que la mismasea creada. Acepta los parametros opcionales **pais**, **fecha_estreno**, **director** y **actores**. Para actores debe ser comunicado un array de objetos JSON con todos los actores que participan en el rodaje. Para cada actor se debe especificar **nombre** y **apellido**.

- URL: **/api/v1/peliculas** - Metodo: **PUT**
Actualiza una película almacenada en la API. La película debe ser ubicada mediante **nombre** o **id** en el JSON. Los parametros a actualizar pueden ser **pais**, **fecha_estreno**, **director** y **actores**.

- URL: **/api/v1/peliculas** - Metodo: **DELETE**
Elimina una película de la API. Para poder completar con la eliminación se debe indicar **nombre** o **id** de la misma.

Ante cualquier duda o consulta no duden en contactarse conmigo al mail m.d.leiva@outlook.com si necesitan información adicional. 

Desde ya, muchisimas gracias por el tiempo dedicado a revisar el código

Un saludo

Maximiliano Leiva


