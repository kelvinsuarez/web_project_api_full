const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isAvatar = file.fieldname === 'avatar';
    const targetFolder = isAvatar ? 'uploads/avatar' : 'uploads';
    cb(null, path.join(__dirname, targetFolder));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname).toLowerCase();
    const name = `${file.fieldname}-${uniqueSuffix}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024},
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const isMimeTypes = allowedTypes.test(file.mimetype);
    const isExtName = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (isMimeTypes && isExtName) {
      return cb(null, true);
    }
    cb(new Error('Only .jpg, .jpeg, and .png files are allowed!'))
  },
});

module.exports = upload;