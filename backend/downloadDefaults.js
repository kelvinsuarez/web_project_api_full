const axios = require('axios');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const cardSchema = new mongoose.Schema({
  name: String,
  link: String,
  owner: mongoose.Schema.Types.ObjectId,
  likes:[mongoose.Schema.Types.ObjectId],
  createAt: Date,
});

const Card = mongoose.model('Card', cardSchema);
const uploadFolder = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);

const defaultCards = [{
        "name" : "Santo Domingo",
        "link" : "https://www.visitcentroamerica.com/wp-content/uploads/2021/06/av-winston-churchill-santo-domingo-centroamerica.jpg",
},
{
        "name" : "La Vega",
        "link" : "https://images.prismic.io/prismic-rd-2/Z46aHJbqstJ99ptK_SANTO_CERRO_1_LA_VEGA_8512dcb1-7cb5-42bf-a769-03365e4430dc.jpg?auto=format,compress"
},
{
        "name" : "Santiago",
        "link" : "https://novalproperties.com/uploads/1675282405.jpg"
},
{
        "name" : "Puerto Plata",
        "link" : "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/d3/10/a1/be-live-collection-marien.jpg?w=600&h=-1&s=1"
},
{
        "name" : "Constanza",
        "link" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0L8IP2C3WBas_ZsQ__NzaOdIwnKiqzgE3Lg&s"
},
{
        "name" : "Jarabacoa",
        "link" : "https://everythingpuntacana.com/wp-content/uploads/2022/03/jarabacoa-dominican-republic-86-850x567.jpg",
},
{
        "name" : "La Romana",
        "link" : "https://republicadominicana.es/wp-content/uploads/2023/12/invertir-en-la-romana.jpg"
},
{
        "name" : "Punta Cana",
        "link" : "https://media.staticontent.com/media/pictures/83239c0a-50e5-44c5-bbb2-bea8292543e4"
},
{
        "name" : "Higüey",
        "link" : "https://transportrosario.com/wp-content/uploads/2024/07/historia-higuey.jpg"
},
{
        "name" : "Barahona",
        "link" : "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/de/3e/c8/playa-san-rafael.jpg?w=500&h=500&s=1"
},
{
        "name" : "Bani",
        "link" : "https://images.visitarepublicadominicana.org/dunas-de-bani-republica-dominicana.jpg"
},
{
        "name" : "Samana",
        "link" : "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/d8/43/20/cayo-levantado-is-the.jpg?w=1200&h=700&s=1"
},
{
        "name" : "San Cristobal",
        "link" : "https://bellezassinlimites.com/wp-content/uploads/2022/11/22854_1643228121_large.jpg",
  }
];

const processCards = async () => {
  let countCreated = 0;

  for (const card of defaultCards) {
    const filename = `${card.name.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    const filePath = path.join(uploadFolder, filename);

    const existsInDB = await Card.findOne({name:card.name});
    if (existsInDB) {
      console.log(`Tarjeta ya existe en DB: ${card.name}`);
      continue;
    }
    if (fs.existsSync(filePath)) {
      console.log(`Imagen ya esta en uploads: ${filename}`);
    } else {
      try {
        const response = await axios.get(card.link, { responseType: 'stream'});
        const writer = fs.createWriteStream(filePath);

        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
          writer.on('finish', resolve);
          writer.on('error', reject);
        });
        console.log(`Imagen descargada: ${filename}`);
      } catch (err) {
        console.error(`Errores descargando ${card.name}:`, err.message);
        continue;
      }
    }
    //Crear tarjeta en MongoDB
    const newCard = new Card({
      name: card.name,
      link: `http://localhost:3000/uploads/${filename}`,
      owner: card.owner,
      likes: card.likes || [],
      createAt: new Date(),
    });

    await newCard.save();
    console.log(`Tarjeta guardada: ${card.name}`);
    countCreated++;
  }

  console.log(`Tarjetas nuevas creadas: ${countCreated}`);
  mongoose.connection.close();
};


// Card.deleteOne({ name: "Nombre aui" })
//   .then((result) => {
//     if (result.deletedCount === 1) {
//       console.log("Tarjeta eliminada con éxito.");
//     } else {
//       console.log("No se encontró ninguna tarjeta con ese nombre.");
//     }
//     //Si estás corriendo solo esta función, puedes cerrar la conexión aquí:
//     // mongoose.connection.close();
//   })
//   .catch((err) => {
//     console.error("Error al eliminar la tarjeta:", err.message);
//     // mongoose.connection.close();
//   });



processCards();



