import { products } from '../models/products';

/* 8.1 Return ALL products */
export function getAllProducts(req, res) {
  res.send(JSON.stringify(products));
};

/* 8.2 Return SINGLE product */
export function getProductById(req, res) {
  const { id = '' } = req.params;
  const productById = products.find(elem => elem.id == id) || null;
  res.send(JSON.stringify(productById));
}

/* 8.3 Return ALL reviews for a single product */
export function getSingleProductReviews(req, res) {
  const { id = '' } = req.params;
  const productById = products.find(elem => elem.id == id);
  const reviews = productById ? productById.reviews : null;

  res.send(JSON.stringify(reviews));
};

/* 8.4 Add NEW product and return it */
export function addNewProduct(req, res) {
  const newProduct = req.body;
  const isEmpty = !Object.keys(newProduct).length;

  if (isEmpty) {
    res.status(500).send('Body can not be empty');
  } else {
    products.push(newProduct);
    res.send(products);
  }  
};
