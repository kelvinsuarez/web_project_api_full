const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const {errors} = require('celebrate');
const {PORT = 3000} = process.env;
const  errorHandler = require('./middlewares/errorHandler');
const {HttpStatus, HttpResponseMessage,} = require("./enums/http");
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const authRouter = require('./routes/auth');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// conección a MongoDB
mongoose.connect('mongodb://localhost:27017/aroundb', {});

const app = express();
console.log(process.env.NODE_ENV); // producción

// Middleware
app.use(cors({ origin: 'https://p18.ignorelist.com' }));
app.options('*',cors());
app.use(express.json());
//registrador de solicitudes
app.use(requestLogger);

//controladores de rutas
app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);
app.use('/auth', authRouter);

//resgistrador de errores
app.use(errorLogger);

app.use((req, res) => {
  res.status(HttpStatus.NOT_FOUND).json({message: HttpResponseMessage.NOT_FOUND})
});

app.use(errors());
app.use(errorHandler);

//Inicializar el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`App listening at port ${PORT}`)
});

