const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const {errors} = require('celebrate');
const {PORT = 3000} = process.env;
const  errorHandler = require('./middlewares/errorHandler');
const {HttpStatus, HttpResponseMessage,} = require("./enums/http");
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { requestLogger, errorLogger } = require('./middlewares/logger');


mongoose.connect('mongodb://localhost:27017/aroundb', {});

const app = express();

console.log(process.env.NODE_ENV); // producción

app.use(express.json());

//registrador de solicitudes
app.use(requestLogger);

//controladores de rutas
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

//resgistrador de errores
app.use(errorLogger);

app.use((req, res) => {
  res.status(HttpStatus.NOT_FOUND).json({message: HttpResponseMessage.NOT_FOUND})
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`)
});

