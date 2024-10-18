const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const {PORT = 3000} = process.env;
const app = express();
const {HttpStatus, HttpResponseMessage,} = require("./enums/http");

console.log(process.env.NODE_ENV); // producción

mongoose.connect('mongodb://localhost:27017/aroundb', {});

app.use(express.json());

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res) => {
  res.status(HttpStatus.NOT_FOUND).json({message: HttpResponseMessage.NOT_FOUND})
})

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`)
});

