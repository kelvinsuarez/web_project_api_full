const User = require('../models/user');
const { HttpStatus, HttpResponseMessage } = require('../enums/http');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then(user => res.send(user))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error(HttpResponseMessage.NOT_FOUND);
      error.statusCode = HttpStatus.NOT_FOUND;
      throw error;
    })
    .then(user => res.send(user))
    .catch(next);
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, about} = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error(HttpResponseMessage.NOT_FOUND);
      error.statusCode = HttpStatus.NOT_FOUND;
      throw error;
    })
    .then(user => res.send(user))
    .catch(next);
};

module.exports.uploadUserAvatar = (req, res, next) => {
  console.log('Archivo recibido:', req.file);
  console.log('Usuario:', req.user);
  const baseURL = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;


  if (!req.file) {
    const error = new Error ('No se recibio ninguna imagen');
    error.statusCode = HttpStatus.BAD_REQUEST;
    return next(error);
  }

  const avatarURL = `${baseURL}/uploads/avatar/${req.file.filename}`;

  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar: avatarURL }, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error(HttpResponseMessage.NOT_FOUND);
      error.statusCode = HttpStatus.NOT_FOUND;
      throw error;
    })
    .then(user => res.send(user))
    .catch(next);
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true})
  .orFail(() => {
    const error = new Error(HttpResponseMessage.NOT_FOUND);
    error.statusCode = HttpStatus.NOT_FOUND;
    throw error;
  })
  .then(user => res.send(user))
  .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(() => {
      const error = new Error(HttpResponseMessage.NOT_FOUND);
      error.statusCode = HttpStatus.NOT_FOUND;
      throw error;
    })
    .then(user => res.send(user))
    .catch(next);
};