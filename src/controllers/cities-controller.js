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
          res.status(400).send('Product already exists');
        } else {
          City.create(newProduct)
            .then(result => (res.status(201).send(result)));
        }
      });
  }
}

/* Delete city by id */
/**  FINISH later */
export function deleteCityById(req, res) {}

/* Update city by id */
/**  FINISH later */
export function updateCityById(req, res) {}