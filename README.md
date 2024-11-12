# web_project_api_full


### Descripción

Este es un proyecto fullstack que incluye un frontend y un backend. El proyecto se despliega en el dominio [p18.ignorelist.com](https://www.p18.ignorelist.com) Es una aplicación web interactiva creada con React. Permite a los usuarios ver, agregar y eliminar tarjetas de lugares interesantes, así como actualizar su perfil y avatar. La aplicación se comunica con una API para gestionar los datos en el servidor.

### Enlace a la Página

Puedes ver la aplicación en vivo [aquí](https://kelvinsuarez.github.io/web_project_around_react/).

### Características Principales

- Visualización de tarjetas con imágenes y descripciones.
- Funcionalidad para agregar nuevas tarjetas.
- Eliminación de tarjetas existentes.
- Actualización del perfil del usuario.
- Actualización del avatar del usuario.
- Validación de formularios para asegurar entradas correctas.
- Interacción con una API para persistencia de datos.

### Tecnologías Utilizadas
 ## Frontend:
  - React
  - JavaScript
  - HTML
  - CSS
  - API REST
 ## Backend:
  - Node.js
  - Express
  - MongoDB
  - Mongose

### Instalación

Sigue estos pasos para configurar el proyecto localmente:
## EN el backend
1. Clona el repositorio en tu máquina local:
    ```sh
    git clone https://github.com/kelvinsuarez/web_project_api_full.git
    ```

2. Navega al directorio backend del proyecto:
    ```sh
    cd backend
    ```

3. Instala las dependencias necesarias:
    ```sh
    npm install
    ```
4. Configurar las variables de entorno en un archivo .env:
   NODE_ENV=production
    JWT_SECRET="token secreto"
    PORT=3000
5. iniciar el servidor:
   ```sh
    npm start
## EN el frontend

1.Navega al directorio del frontend:
  cd frontend
2. Instala las dependencias:
  npm install
3. Iniciar la aplicacion:
  npm start

### Despliegue   

    El proyecto está desplegado en el dominio p18.ignorelist.com.
    para hacer despliegue del frontend construye y despliega la aplicacion:
    npm run deploy

### Uso

1. Inicia el servidor de desarrollo:
    ```sh
    npm start
    ```

2. Abre tu navegador web y ve a `http://localhost:3000` para ver la aplicación en acción.

### Estructura del Proyecto

- **frontend/**: Contiene el código del frontend construido con React.
- **backend/**: Contiene el código del backend construido con Node.js y Express.

### API
La aplicación interactúa con la API api.p18.ignorelis.com para realizar las siguientes operaciones:

Obtener información del usuario
Actualizar información del usuario
Actualizar el avatar del usuario
Obtener tarjetas
Agregar una nueva tarjeta
Eliminar una tarjeta
Dar "me gusta" a una tarjeta
Quitar "me gusta" a una tarjeta
Contribuciones


Si deseas contribuir al proyecto, por favor sigue los siguientes pasos:

Haz un fork del repositorio.
Crea una nueva rama (git checkout -b feature/nueva-caracteristica).
Realiza tus cambios y haz commit (git commit -am 'Agrega nueva característica').
Sube los cambios a tu rama (git push origin feature/nueva-caracteristica).
Abre un Pull Request.


¡Gracias por visitar este proyecto! Si tienes alguna pregunta o sugerencia, no dudes en contactarme. k_suarez22@hotmail.com
