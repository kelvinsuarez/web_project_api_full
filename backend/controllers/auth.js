const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { HttpStatus, HttpResponseMessage } = require('../enums/http');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    // Validar que el email exista
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error('El email ya está registrado');
      error.statusCode = HttpStatus.CONFLICT;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: hashedPassword,
    });
    const { _id } = user;
    res.status(HttpStatus.CREATED).send({
      data: {
        _id, name, about, avatar, email,
      },
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.statusCode = HttpStatus.BAD_REQUEST;
    }
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      const error = new Error(HttpResponseMessage.UNAUTHORIZED);
      error.statusCode = HttpStatus.UNAUTHORIZED;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error(HttpResponseMessage.UNAUTHORIZED);
      error.statusCode = HttpStatus.UNAUTHORIZED;
      throw error;
    }

    const token = jwt.sign(
      { _id: user.id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' },
    );

    res.send({ token });
  } catch (err) {
    next(err);
  }
};
