import { products } from '../models/products';

/* 8.1 Return ALL products */
export function getAllProducts(req, res) {
  return products && products.length
    ? res.send(JSON.stringify(products))
    : res.status(404).send(JSON.stringify([]));
}

/* 8.2 Return SINGLE product */
export function getProductById(req, res) {
  const { id = '' } = req.params;
  const productById = products.find(elem => elem.id == id);
  return productById
    ? res.send(JSON.stringify(productById))
    : res.status(404).send(JSON.stringify({}));
}

/* 8.3 Return ALL reviews for a single product */
export function getSingleProductReviews(req, res) {
  const { id = '' } = req.params;
  const productById = products.find(elem => elem.id == id);
  const reviews = productById ? productById.reviews : null;

  return reviews
    ? res.send(JSON.stringify(reviews))
    : res.status(404).send(JSON.stringify({}));
}

/* 8.4 Add NEW product and return it */
export function addNewProduct(req, res) {
  const newProduct = req.body;
  const isEmpty = !Object.keys(newProduct).length;

  if (isEmpty) {
    res.status(400).send('Bad request: body can not be empty');
  } else {
    products.push(newProduct);
    res.status(201).send(products);
  }
}
