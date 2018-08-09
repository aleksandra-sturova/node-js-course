import express from 'express';
import {
  getAllCities,
  addNewCity,
  deleteCityById,
  updateCityById,
} from '../controllers/cities-controller';

const citiesRouter = express.Router();

citiesRouter.get('/', getAllCities);
citiesRouter.post('/', addNewCity);
citiesRouter.delete('/:id', deleteCityById);
citiesRouter.put('/', updateCityById);

export default citiesRouter;
