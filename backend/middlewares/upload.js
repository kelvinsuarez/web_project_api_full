const multer = require('multer');
const path = require('path');

//configuracion de almacenamiento local
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); //carpeta donde se guardaran las imagenes
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, uniqueName);
  },
});

//Filtro de tipo de archivo
const fileFilter = (req, file, cb) => {
  if (/image\/(jpeg|png|jpg|webp)/.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imagenes'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = upload;