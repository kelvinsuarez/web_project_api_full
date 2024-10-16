const Cards = require('../models/card');
const {HttpStatus, HttpResponseMessage,} = require("../enums/http");

module.exports.getCards = (req, res) => {
  Cards.find({})
  .populate(['owner'])
  .then(cards => res.send({data: cards}))
  .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: HttpResponseMessage.SERVER_ERROR}))
};

module.exports.createCard = (req, res) => {
  const {name, link} = req.body;
  Cards.create({name, link, owner: req.user._id})
    .then(card => res.status(HttpStatus.CREATED).send({data: card}))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(HttpStatus.CREATED).send ({message: HttpResponseMessage.BAD_REQUEST});
      } else {res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: HttpResponseMessage.SERVER_ERROR});
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Cards.findByIdAndDelete(req.params.cardId)
  .orFail(() => {
    const error = new Error(HttpResponseMessage.NOT_FOUND);
    error.statusCode = HttpStatus.NOT_FOUND;
    throw error;
  })
  .then(card => res.send({message: 'Tarjeta eliminada'}))
  .catch(err =>  {
    if (err.statusCode === HttpStatus.NOT_FOUND){
      res.status(HttpStatus.NOT_FOUND).send({message: HttpResponseMessage.NOT_FOUND});
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: HttpResponseMessage.SERVER_ERROR});
    }
  });
};

module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: {likes: req.user._id}},
    {new: true}
  )
  .orFail(() => {
    const error = new Error(HttpResponseMessage.NOT_FOUND);
    error.statusCode = HttpStatus.NOT_FOUND;
    throw error;
  })
  .then(card => res.send(card))
  .catch((err) =>
      res
    .status(HttpStatus.NOT_FOUND)
    .send({message: HttpResponseMessage.NOT_FOUND})
  );
}

module.exports.dislikeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    {$pull: {likes: req.user._id}},
    {new: true}
  )
  .orFail(() => {
    const error = new Error(HttpResponseMessage.NOT_FOUND);
    error.statusCode = HttpStatus.NOT_FOUND;
    throw error;
  })
  .then(card => res.send(card))
  .catch((err) =>
      res
    .status(HttpStatus.NOT_FOUND)
    .send({message: HttpResponseMessage.NOT_FOUND})
  );
}