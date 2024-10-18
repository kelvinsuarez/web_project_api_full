const User = require('../models/user');
const {HttpStatus, HttpResponseMessage,} = require("../enums/http");
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

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
  const {name, about, avatar, email, password} = req.body;
  User.create({name, about, avatar, email, password})
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

  User.findByIdAndUpdate(
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

module.exports.login = (req, res) => {
  const {email, password} = req.body;

  User.findOne({email}).select('+password')
    .then(user => {
      if (!user) {
        return res.status(HttpStatus.UNAUTHORIZED).send({ message: HttpResponseMessage.UNAUTHORIZED});
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: HttpResponseMessage.SERVER_ERROR});
        }
        if (!isMatch) {
          return res.status(HttpStatus.UNAUTHORIZED).send({message: HttpResponseMessage.UNAUTHORIZED});
        }
        const token = jwt.sign({ _id: user._id}, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {expiresIn: '7d'});
        res.send({token});
      });
    })
    .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: HttpResponseMessage.SERVER_ERROR}));
}

module.exports.getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(() => {
      const error = new Error(HttpResponseMessage.NOT_FOUND);
      error.statusCode = HttpStatus.NOT_FOUND;
      throw error;
    })
    .then(user => res.send({ data: user }))
    .catch(err => {
      if (err.statusCode === HttpResponseMessage.NOT_FOUND) {
        res.status(HttpStatus.NOT_FOUND).send({ message: HttpResponseMessage.NOT_FOUND});
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: HttpResponseMessage.SERVER_ERROR });
      }
    });
}