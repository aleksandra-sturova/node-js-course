import City from '../models/city';

/* Return ALL cities */
export function getAllCities(req, res) {
  City.find({})
    .then((cities) => {
      return cities && cities.length
        ? res.send(cities)
        : res.status(404).send(JSON.stringify([]));
    });
}

/* Add NEW city and return it */
export function addNewCity(req, res) {
  const newProduct = req.body;
  const isEmpty = !Object.keys(newProduct).length;

  if (isEmpty) {
    res.status(400).send('Bad request: body can not be empty');
  } else {
    City.findOne({ id: newProduct.id })
      .then((productById) => {
        if (productById) {
          res.status(400).send('City already exists');
        } else {
          City.create(newProduct)
            .then(result => (res.status(201).send(result)));
        }
      });
  }
}

/* Delete city by id */
export function deleteCityById(req, res) {
  const { id } = req.params;

  City.findOneAndRemove({ id }, (err, city) => {
    if (!city) {
      res.status(400).send({ message: 'City not found' });
    } else {
      res.status(200).send({ message: `City with id ${city.id} was successfully removed` });
    }
    if (err) {
      res.status(500).send({ message: 'An error occurred while deleting city' });
    }
  });
}

/* Update city by id */
export function updateCityById(req, res) {
  const { id, location } = req.body;
  const update = {
    location: {
      lat: location.lat,
      long: location.long,
    },
  };

  City.findOneAndUpdate({ id }, update, { new: true }, (err, city) => {
    console.log('!!!!!!!', city);
    if (!city) {
      res.status(400).send({ message: 'City not found' });
    } else {
      return res.status(200).send({ message: `City ${city.name} was successfully updated` });
    }
    if (err) {
      res.status(500).send({ message: 'An error occurred while deleting city' });
    }
  });
}
