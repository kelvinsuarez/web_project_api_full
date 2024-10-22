const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {getUsers, getUserById, createUser, updateUserProfile, updateUserAvatar, login, getCurrentUser} = require('../controllers/users');
const { celebrate } = require('celebrate');
const { signupSchema, loginSchema, updateProfileSchema, updateAvatarSchema } = require('../validation/schemas');


//Rutas puclicas
//Crear usuario
router.post('/signup', celebrate(signupSchema), createUser);
//loguearse
router.post('/login', celebrate(loginSchema), login);

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
router.patch('/me', celebrate(updateProfileSchema), updateUserProfile);
//Actualizar avatar
router.patch('/me/avatar', celebrate(updateAvatarSchema), updateUserAvatar);

module.exports = router;