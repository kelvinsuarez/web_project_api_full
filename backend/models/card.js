const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator(v) {
        if (!v) return true;
        const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
        return urlRegex.test(v);
      },
      message: (props) => `${props.value} no es una URL válida!`,
    },
  },

  imagePath: {
    type: String, // Ruta del archivo subido
    validate: {
      validator(v) {
        if (!v) return true; // Permite valores vacíos si no hay imagen
        const pathRegex = /^\/uploads\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+\.(jpg|jpeg|png)$/;
        return pathRegex.test(v);
      },
      message: (props) => `${props.value} no es una ruta válida para una imagen!`,
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },

});

cardSchema.pre('validate', function (next) {
  if (!this.link && !this.imagePath) {
    next(new Error('Debe proporcionar un enlace o subir una imagen.'))
  } else{
    next();
  }
})

module.exports = mongoose.model('card', cardSchema);