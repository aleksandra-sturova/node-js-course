import http from 'http';
import mongoose from 'mongoose';

const citiesCollectionUrl = 'mongodb://localhost:27017/mydb';
const server = http.createServer();

let City = null;

export function getRandomCity(req, res) {
  mongoose.connect(citiesCollectionUrl, { useNewUrlParser: true }, () => {
    if (!City) {
      City = mongoose.model('City', new mongoose.Schema({
        name: String,
        country: String,
        capital: Boolean,
        location: {
          lat: Number,
          long: Number,
        },
      }));
    }

    City.find({}).then((cities) => {
      mongoose.connection.close();

      const randomIndex = Math.floor(Math.random() * cities.length);
      return res.end(JSON.stringify(cities[randomIndex]));
    });
  });
}

server.on('request', (req, res) => {
  getRandomCity(req, res);
}).listen(8080);

