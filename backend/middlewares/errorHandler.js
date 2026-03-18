const { isCelebrateError } = require('celebrate');
const { HttpStatus, HttpResponseMessage } = require('../enums/http');

module.exports = (err, req, res, next) => {
  console.error('🧨 Error capturado en middleware:', err);

  if (isCelebrateError(err)) {
    return res.status(HttpStatus.BAD_REQUEST).send({
      message: HttpResponseMessage.BAD_REQUEST,
    });
  }

  const { statusCode = HttpStatus.INTERNAL_SERVER_ERROR, message } = err;

  res.status(statusCode).send({
    message:
      statusCode === HttpStatus.INTERNAL_SERVER_ERROR
        ? HttpResponseMessage.SERVER_ERROR
        : message,
  });
};