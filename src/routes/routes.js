import express from 'express';
import {
  getAllProducts,
  getProductById,
  getSingleProductReviews,
  addNewProduct } from '../controllers/product-controller';
import { getAllUsers } from '../controllers/user-controller';

const router = express.Router();

router.get('/api/products', getAllProducts);
router.get('/api/products/:id', getProductById);
router.get('/api/products/:id/reviews', getSingleProductReviews);
router.post('/api/products', addNewProduct);

router.get('/api/users', getAllUsers);

export { router };