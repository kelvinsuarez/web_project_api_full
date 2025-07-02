const jwt = require('jsonwebtoken');
const { HttpStatus, HttpResponseMessage } = require('../enums/http');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  //Obtener el token de los encabezados de la solicitud
  const token = req.headers.authorization?.replace('Bearer ', '');
  console.log('🔐 Token recibido:', token);


  if (!token) {
    console.log('🚫 No se recibió token');

    return res.status(HttpStatus.FORBIDDEN).send({ message: HttpResponseMessage.FORBIDDEN });
  }

  let payload;

  try {
    //Verificar el token usando el JWT secreto
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    console.log('✅ Token verificado, payload:', payload);
  } catch (err) {
    console.log('❌ Error al verificar token:', err.message);
    return res.status(HttpStatus.FORBIDDEN).send({ message: HttpResponseMessage.FORBIDDEN });
  }
  // Añadir el payload del token verificado al objeto de solicitud
  req.user = payload;
  console.log('📦 req.user asignado:', req.user);
  //Continuar al siguiente middleware
  next();
};
