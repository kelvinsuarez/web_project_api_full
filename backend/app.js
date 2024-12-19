const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
<<<<<<< Updated upstream
=======
const multer = require('multer');
>>>>>>> Stashed changes
const path = require('path');

const { PORT = 3000 } = process.env;
const errorHandler = require('./middlewares/errorHandler');
const { HttpStatus, HttpResponseMessage } = require('./enums/http');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const authRouter = require('./routes/auth');
const auth = require('./middlewares/auth');
const upload = require('./middlewares/multer');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname} - ${Date.now()} ${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

// conección a MongoDB
mongoose.connect('mongodb://localhost:27017/aroundb', {});

const app = express();
console.log(process.env.NODE_ENV); // producción


// Middleware
//app.use(cors({ origin: 'https://p18.ignorelist.com' }));
//app.options('*',cors());
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
//registrador de solicitudes
app.use(requestLogger);

app.use('/auth', authRouter);

//controladores de rutas
app.use('/users', auth, usersRouter);
app.use('/cards', auth, upload.single('file'), cardsRouter);

//Ruta para manejar la subida del archivo
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    res.send('Archivo subido exitosamente');
  } catch (err) {
    res.sendStatus(500);
  }
})

//resgistrador de errores
app.use(errorLogger);

app.use((req, res) => {
  res.status(HttpStatus.NOT_FOUND).json({ message: HttpResponseMessage.NOT_FOUND });
});

app.use(errors());
app.use(errorHandler);

//Inicializar el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`App listening at port ${PORT}`);
});
