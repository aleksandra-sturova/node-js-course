import { Product } from '../models';

/* 8.1 Return ALL products */
export function getAllProducts(req, res) {
  Product.findAll()
    .then((products) => {
      return products && products.length
        ? res.send(JSON.stringify(products))
        : res.status(404).send(JSON.stringify([]));
    });
}

/* 8.2 Return SINGLE product */
export function getProductById(req, res) {
  const { id = '' } = req.params;
  Product.findAll({ where: { id } }).then((productById) => {
    return productById && productById[0]
      ? res.send(JSON.stringify(productById[0]))
      : res.status(404).send(JSON.stringify({}));
  });
}

/* 8.3 Return ALL reviews for a single product */
export function getSingleProductReviews(req, res) {
  const { id = '' } = req.params;

  Product.findAll({ where: { id } }).then((productById) => {
    const reviews = productById ? productById[0].reviews : null;
    return productById
      ? res.send(reviews)
      : res.status(404).send(JSON.stringify({}));
  });
}

/* 8.4 Add NEW product and return it */
export function addNewProduct(req, res) {
  const newProduct = req.body;
  const isEmpty = !Object.keys(newProduct).length;
  if (isEmpty) {
    res.status(400).send('Bad request: body can not be empty');
  } else {
    Product.create(newProduct)
      .then((result) => {
        res.status(201).send(result.dataValues);
      });
  }
}
