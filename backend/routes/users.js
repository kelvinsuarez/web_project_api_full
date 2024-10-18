const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {getUsers, getUserById, createUser, updateUserProfile, updateUserAvatar, login, getCurrentUser} = require('../controllers/users');

//Rutas puclicas
//Crear usuario
router.post('/signup', createUser);
//loguearse
router.post('/login', login);

//Middleware de autorizacion
router.use(auth);

//Rutas protegidas
//Obtener un usuario por id
router.get ('/:id', getUserById);
//Obtener todos los usuarios
router.get ('/', getUsers);
//Obtener datos del usuario actual
router.get ('/me', getCurrentUser);
//Actualizar usuario
router.patch('/me', updateUserProfile);
//Actualizar avatar
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;