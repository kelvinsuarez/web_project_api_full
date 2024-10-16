# Tripleten web_project_around_express API

## Descripción del Proyecto
Objetivo: Crear un servidor con una API y autenticación del usuario.

## Estructura del Proyecto:

data/: Contiene los archivos JSON con los datos de usuarios (users.json) y tarjetas (cards.json).
routes/: Contiene los archivos de rutas (users.js y cards.js) que manejan las solicitudes HTTP.
app.js: Archivo principal que configura el servidor y las rutas.

## Funcionalidad
Rutas de Usuarios:
GET /users: Devuelve una lista JSON de todos los usuarios.
GET /users/:id: Devuelve los datos de un usuario específico basado en el ID proporcionado. Si el ID no existe, devuelve un error 404 con el mensaje {"message": "ID de usuario no encontrado"}.
Rutas de Tarjetas:
GET /cards: Devuelve una lista JSON de todas las tarjetas.
Manejo de Rutas No Existentes:
Cualquier solicitud a una ruta no definida devuelve un error 404 con el mensaje {"message": "Recurso solicitado no encontrado"}.

## Tecnologías Utilizadas
Node.js: Entorno de ejecución para JavaScript en el servidor.
Express: Framework para aplicaciones web que facilita la creación de APIs.
fs: Módulo de Node.js para trabajar con el sistema de archivos, utilizado para leer los archivos JSON.
path: Módulo de Node.js para manejar y transformar rutas de archivos.

## Cómo Probar la API
Puedes probar la API utilizando herramientas como Postman para enviar solicitudes HTTP a las diferentes rutas y verificar las respuestas.

## Enlace al repositorio GitHub
https://github.com/kelvinsuarez/web_project_around_express.git
