const mongoose = require('mongoose');
const validator = require('validator');
const isValidURL = require('../utils/isValidURL');
const { valid } = require('joi');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Nuevo Usuario',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Explorador en RD',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
    validate: {
      validator: isValidURL,
      message: (props) => `${props.value} no es una URL válida!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: (props) => `${props.value} no es un email válido!`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 6,
  },
});

module.exports = mongoose.model('user', userSchema);