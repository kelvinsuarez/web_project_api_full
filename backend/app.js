const express = require('express');
const mongoose = require('mongoose');
const {PORT = 3000} = process.env;
const app = express();
const {HttpStatus, HttpResponseMessage,} = require("./enums/http");


mongoose.connect('mongodb://localhost:27017/aroundb', {});

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '66bcee520149c1190744fd04'
  }
  next();
})

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

