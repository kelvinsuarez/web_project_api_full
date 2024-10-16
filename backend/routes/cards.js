const express = require('express');
const router = express.Router();
const {getCards, createCard, deleteCard, likeCard, dislikeCard} = require("../controllers/cards")

// Obtener todas las tarjetas
router.get('/', getCards);

// Crear targetas
router.post('/', createCard);

// Borrar targetas
router.delete('/:cardId', deleteCard);

// Dar like
router.put('/:cardId/likes', likeCard);

// Quitar like
router.delete('/:cardId/likes', dislikeCard);

module.exports =router;