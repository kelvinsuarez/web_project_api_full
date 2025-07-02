const { HttpStatus, HttpResponseMessage } = require('../enums/http');

module.exports = (err, req, res, next) => {
  console.error('🧨 Error capturado en middleware:', err);

  const { statusCode = HttpStatus.INTERNAL_SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === HttpStatus.INTERNAL_SERVER_ERROR
        ? HttpResponseMessage.SERVER_ERROR
        : message,
  });
};