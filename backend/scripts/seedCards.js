const mongoose = require('mongoose');
const Card = require('../models/card');

const seedCards = [
  {
    name: "Santo Domingo",
    link: "https://www.visitcentroamerica.com/wp-content/uploads/2021/06/av-winston-churchill-santo-domingo-centroamerica.jpg"
  },
  {
    name: "La Vega",
    link: "https://images.prismic.io/prismic-rd-2/Z46aHJbqstJ99ptK_SANTO_CERRO_1_LA_VEGA_8512dcb1-7cb5-42bf-a769-03365e4430dc.jpg?auto=format,compress"
  },
  {
    name: "Santiago",
    link: "https://novalproperties.com/uploads/1675282405.jpg"
  },
  {
    name: "Puerto Plata",
    link: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/d3/10/a1/be-live-collection-marien.jpg?w=600&h=-1&s=1"
  },
  {
    name: "Constaza",
    link: "https://hoy.com.do/wp-content/uploads/2017/09/3-5.jpg"
  },
  {
    name: "Jarabacoa",
    link: "https://everythingpuntacana.com/wp-content/uploads/2022/03/jarabacoa-dominican-republic-86-850x567.jpg"
  },
  {
    name: "La Romana",
    link: "https://republicadominicana.es/wp-content/uploads/2023/12/invertir-en-la-romana.jpg"
  },
  {
    name: "Punta Cana",
    link: "https://media.staticontent.com/media/pictures/83239c0a-50e5-44c5-bbb2-bea8292543e4"
  },
  {
    name: "Higüey",
    link: "https://transportrosario.com/wp-content/uploads/2024/07/historia-higuey.jpg"
  },
  {
    name: "Barahona",
    link: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/de/3e/c8/playa-san-rafael.jpg?w=500&h=500&s=1"
  },
  {
    name: "Bani",
    link: "https://images.visitarepublicadominicana.org/dunas-de-bani-republica-dominicana.jpg"
  },
  {
    name: "Samana",
    link: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/d8/43/20/cayo-levantado-is-the.jpg?w=1200&h=700&s=1"
  }
];

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => Card.insertMany(seedCards))
.then(() => {
  console.log('cartas sembradas exitosamente.');
  return mongoose.disconnect();
})
.catch((err) => {
  console.error ('Error al sembrar imagenes:', err);
  mongoose.disconnect();
});