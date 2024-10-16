const User = require('../models/user');
const {HttpStatus, HttpResponseMessage,} = require("../enums/http");

module.exports.getUsers = (req, res) => {
  User.find({})
  .then(user => res.send({data: user}))
  .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: HttpResponseMessage.SERVER_ERROR}))
}

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
  .orFail(() => {
    const error = new Error(HttpResponseMessage.NOT_FOUND);
    error.statusCode = HttpStatus.NOT_FOUND;
    throw error;
  })
  .then(user => res.send({data: user}))
  .catch(err => {
    if(err.statusCode === HttpStatus.NOT_FOUND){
      res.status(HttpStatus.NOT_FOUND).send({message: HttpResponseMessage.NOT_FOUND})
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: HttpResponseMessage.SERVER_ERROR})
    }
  });
};

module.exports.createUser = (req, res) => {
  const {name, about, avatar} = req.body;
  User.create({name, about, avatar})
    .then(user => res.status(HttpStatus.CREATED).send({data: user}))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(HttpStatus.BAD_REQUEST).send ({message: HttpResponseMessage.BAD_REQUEST});
      } else {res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: HttpResponseMessage.SERVER_ERROR});
      }
    });
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about} = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId, {name, about}, {new: true, runValidators: true}
  )
  .orFail(() => {
    const error = new Error(HttpResponseMessage.NOT_FOUND);
    error.statusCode = HttpStatus.NOT_FOUND;
    throw error;
  })
  .then(user => res.send({data: user}))
  .catch(err => {
    if(err.statusCode === HttpStatus.NOT_FOUND){
      res.status(HttpStatus.NOT_FOUND).send({message: HttpResponseMessage.NOT_FOUND})
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: HttpResponseMessage.SERVER_ERROR})
    }
  });
};

module.exports.updateUserAvatar = (req, res) => {
  const {avatar} = req.body;
  const userId = req.user._id;

  User.findOneAndUpdate(
    userId, {avatar}, {new: true, runValidators: true}
  )
  .orFail(() => {
    const error = new Error(HttpResponseMessage.NOT_FOUND);
    error.statusCode = HttpStatus.NOT_FOUND;
    throw error;
  })
  .then(user => res.send({data: user}))
  .catch(err => {
    if(err.statusCode === HttpStatus.NOT_FOUND){
      res.status(HttpStatus.NOT_FOUND).send({message: HttpResponseMessage.NOT_FOUND})
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: HttpResponseMessage.SERVER_ERROR})
    }
  });
};

module.exports