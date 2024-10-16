# web_project_around_react


### Descripción

`web_project_around_react` es una aplicación web interactiva creada con React. Permite a los usuarios ver, agregar y eliminar tarjetas de lugares interesantes, así como actualizar su perfil y avatar. La aplicación se comunica con una API para gestionar los datos en el servidor.

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

- React
- JavaScript
- HTML
- CSS
- API REST

### Instalación

1. Clona el repositorio en tu máquina local:
    ```sh
    git clone https://github.com/kelvinsuarez/web_project_around_react.git
    ```

2. Navega al directorio del proyecto:
    ```sh
    cd web_project_around_react
    ```

3. Instala las dependencias necesarias:
    ```sh
    npm install
    ```

### Uso

1. Inicia el servidor de desarrollo:
    ```sh
    npm start
    ```

2. Abre tu navegador web y ve a `http://localhost:3000` para ver la aplicación en acción.

### Estructura del Proyecto

El proyecto sigue la siguiente estructura de directorios:

```plaintext
web_project_around_react/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── AddPlacePopup.js
│   │   ├── App.js
│   │   ├── Card.js
│   │   ├── ConfirmationDeletePopup.js
│   │   ├── EditAvatarPopup.js
│   │   ├── EditProfilePopup.js
│   │   ├── Footer.js
│   │   ├── Header.js
│   │   ├── ImagePopup.js
│   │   ├── Main.js
│   │   └── PopupWithForm.js
│   ├── contexts/
│   │   └── CurrentUserContext.js
│   ├── utils/
│   │   ├── api.js
│   │   └── FormValidator.js
│   ├── index.js
│   └── ...
├── .gitignore
├── package.json
├── README.md
└── ...

API
La aplicación interactúa con una API para realizar las siguientes operaciones:

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

Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

¡Gracias por visitar este proyecto! Si tienes alguna pregunta o sugerencia, no dudes en contactarme.