import Product from '../models/product';

/* Return ALL products */
export function getAllProducts(req, res) {
  Product.find({})
    .then((products) => {
      return products && products.length
        ? res.send(products)
        : res.status(404).send(JSON.stringify([]));
    });
}

/* Return SINGLE product */
export function getProductById(req, res) {
  const { id = '' } = req.params;

  Product.findOne({ id }).then((productById) => {
    return productById
      ? res.send(productById)
      : res.status(404).send(JSON.stringify({}));
  });
}

/* Return ALL reviews for a single product */
export function getSingleProductReviews(req, res) {
  const { id = '' } = req.params;

  Product.findOne({ id }).then((productById) => {
    const reviews = productById ? productById.reviews : null;
    return productById
      ? res.send(reviews)
      : res.status(404).send(JSON.stringify({}));
  });
}

/* Add NEW product and return it */
export function addNewProduct(req, res) {
  const newProduct = req.body;
  const isEmpty = !Object.keys(newProduct).length;

  if (isEmpty) {
    res.status(400).send('Bad request: body can not be empty');
  } else {
    Product.findOne({ id: newProduct.id })
      .then((productById) => {
        if (productById) {
          res.status(400).send('Product already exists');
        } else {
          Product.create(newProduct)
            .then(result => (res.status(201).send(result)));
        }
      });
  }
}

/* Delete product by id */
/**  FINISH later */
export function deleteProductById(req, res) {
  const { id } = req.params;
  Product.findOneAndDelete({ id });
}