const User = require('../models/user');
const {HttpStatus, HttpResponseMessage,} = require("../enums/http");
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
  .then(user => res.send({data: user}))
  .catch(next);
}

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
  .orFail(() => {
    const error = new Error(HttpResponseMessage.NOT_FOUND);
    error.statusCode = HttpStatus.NOT_FOUND;
    throw error;
  })
  .then(user => res.send({data: user}))
  .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {name, about, avatar, email, password} = req.body;
  User.create({name, about, avatar, email, password})
    .then(user => res.status(HttpStatus.CREATED).send({data: user}))
    .catch(err => {
      if (err.name === 'ValidationError') {
        err.status = HttpStatus.BAD_REQUEST;
        next(err);
      } else {
        next(err);
      }
    });
};

module.exports.updateUserProfile = (req, res, next) => {
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
  .catch(next);
};

module.exports.updateUserAvatar = (req, res, next) => {
  const {avatar} = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId, {avatar}, {new: true, runValidators: true}
  )
  .orFail(() => {
    const error = new Error(HttpResponseMessage.NOT_FOUND);
    error.statusCode = HttpStatus.NOT_FOUND;
    throw error;
  })
  .then(user => res.send({data: user}))
  .catch(next);
};

module.exports.login = (req, res, next) => {
  const {email, password} = req.body;

  User.findOne({email}).select('+password')
    .then(user => {
      if (!user) {
        const error = new Error(HttpResponseMessage.UNAUTHORIZED);
        error.statusCode = HttpStatus.UNAUTHORIZED;
        throw error;
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return next(err);
        }
        if (!isMatch) {
          const error = new Error(HttpResponseMessage.UNAUTHORIZED);
          error.statusCode = HttpStatus.UNAUTHORIZED;
          throw error;
        }
        const token = jwt.sign({ _id: user._id}, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {expiresIn: '7d'});
        res.send({token});
      });
    })
    .catch(next);
}

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(() => {
      const error = new Error(HttpResponseMessage.NOT_FOUND);
      error.statusCode = HttpStatus.NOT_FOUND;
      throw error;
    })
    .then(user => res.send({ data: user }))
    .catch(next);
};