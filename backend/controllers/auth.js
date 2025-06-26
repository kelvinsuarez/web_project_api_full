const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { HttpStatus, HttpResponseMessage } = require('../enums/http');
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hashedPassword) => {
     return User.create({ name, about, avatar, email, password: hashedPassword});
    })
    .then((user) => res.status(HttpStatus.CREATED).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        err.statusCode = HttpStatus.BAD_REQUEST;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        const error = new Error(HttpResponseMessage.UNAUTHORIZED);
        error.statusCode = HttpStatus.UNAUTHORIZED;
        return next(error);
      }

      console.log('Usuario encontrado:', user);

      return bcrypt.compare(password, user.password)
        .then((isMatch) => {
          console.log('Coinciden?', isMatch);
          if (!isMatch) {
            const error = new Error(HttpResponseMessage.UNAUTHORIZED);
            error.statusCode = HttpStatus.UNAUTHORIZED;
            return next(error);
          }

          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
          res.send({ token });
        });
    })
    .catch((err) => {
      console.error('Error durante el proceso de login:', err);
      next(err);
    });
};
