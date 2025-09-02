const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const User = require('../models/user');

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const avatarDir = path.join(__dirname, '../uploads/avatar');
const baseUrl = 'https://api.p18.ignorelist.com/uploads/avatar/';

(async () => {
  try {
    const usedAvatars = await User.distinct('avatar');
    const usedFiles = usedAvatars
      .filter(url => url.startsWith(baseUrl))
      .map(url => url.replace(baseUrl, ''));

    const allFiles = fs.readdirSync(avatarDir);
    const unusedFiles = allFiles.filter(file => !usedFiles.includes(file));

    if (unusedFiles.length === 0) {
      console.log('No hay avatares sin usar para eliminar.');
    } else {
      console.log(`Eliminando avatares sin usar...`);
      unusedFiles.forEach(file => {
        const filePath = path.join(avatarDir, file);
        fs.unlinkSync(filePath);
        console.log(`Eliminado: ${file}`);
      });
      console.log('Limpieza completada.');
    }
  } catch (error) {
    console.error('Error durante la limpieza de avatares:', error);
  } finally {
    mongoose.connection.close();
  }
})();
