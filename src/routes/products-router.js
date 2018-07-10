import express from 'express';
import {
  getAllProducts,
  getProductById,
  getSingleProductReviews,
  addNewProduct,
  deleteProductById,
} from '../controllers/product-controller';

const productsRouter = express.Router();

productsRouter.get('/', getAllProducts);
productsRouter.delete('/', deleteProductById);
productsRouter.get('/:id', getProductById);
productsRouter.get('/:id/reviews', getSingleProductReviews);
productsRouter.post('/', addNewProduct);

export default productsRouter;
