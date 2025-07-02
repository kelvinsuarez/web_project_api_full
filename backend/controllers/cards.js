const Cards = require('../models/card');
const fs = require('fs');
const path = require('path');
const { HttpStatus, HttpResponseMessage } = require('../enums/http');

module.exports.getCards = (req, res, next) => {
  Cards.find({})
    .populate(['owner'])
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  console.log('Usuario autenticado:', req.user);

  const { name } = req.body;
  const owner = req.user._id;

  if (!req.file) {
    return res.status(HttpStatus.BAD_REQUEST).send({
      message: 'Se requiere una imagen para crear la targeta.',
    });
  }
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  Cards.create({ name, link: imageUrl, owner })
    .then((card) => {console.log('Carta creada:', card);
      res.status(HttpStatus.CREATED).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        err.statusCode = HttpStatus.BAD_REQUEST;
        next(err);
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const userId = req.user._id;
  Cards.findById(req.params.cardId)
    .orFail(() => {
      const error = new Error(HttpResponseMessage.NOT_FOUND);
      error.statusCode = HttpStatus.NOT_FOUND;
      throw error;
    })
    .then((card) => {
      if (card.owner.toString() !== userId) {
        const error = new Error(HttpResponseMessage.FORBIDDEN);
        error.statusCode = HttpStatus.FORBIDDEN;
        throw error;
      }

      return Cards.findByIdAndDelete(req.params.cardId)
        .then((deleteCard) =>{
          res.send({ message: 'Tarjeta eliminada'});

          const filePath = path.join(__dirname, '..', 'uploads', path.basename(deleteCard.link));
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error('No se pudo eliminar la imagen del disco:', err.message);
            } else {
              console.log('Imagen eliminada del disco:', deleteCard.link);
            }
          });
       });
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .populate(['owner'])
    .orFail(() => {
      const error = new Error(HttpResponseMessage.NOT_FOUND);
      error.statusCode = HttpStatus.NOT_FOUND;
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .populate(['owner'])
    .orFail(() => {
      const error = new Error(HttpResponseMessage.NOT_FOUND);
      error.statusCode = HttpStatus.NOT_FOUND;
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};