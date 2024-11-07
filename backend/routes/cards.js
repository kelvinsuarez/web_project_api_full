const express = require('express');
const router = express.Router();
const {getCards, createCard, deleteCard, likeCard, dislikeCard} = require("../controllers/cards");
const {celebrate} = require('celebrate');
const { createCardSchema, cardIdSchema } = require('../validation/schemas');

//const auth = require('../middlewares/auth');
//router.use(auth);

// Obtener todas las tarjetas
router.get('/', getCards);

// Crear targetas
router.post('/', celebrate(createCardSchema), createCard);

// Borrar targetas
router.delete('/:cardId', celebrate(cardIdSchema), deleteCard);

// Dar like
router.put('/:cardId/likes', celebrate(cardIdSchema), likeCard);

// Quitar like
router.delete('/:cardId/likes', celebrate(cardIdSchema), dislikeCard);

module.exports =router;