const express = require('express');
const { addProduct, getProducts, getProductById, modifyProductById, deleteProductById, getProductsInfo, getImageCount, getProductsByCategory, getProductsSearch } = require('./controller');

const router = express.Router();
  
router.route('/')
  .post(addProduct)
  .get(getProducts);

router.route('/:productId')
  .get(getProductById)
  .put(modifyProductById)
  .delete(deleteProductById);

router.route('/search/:input')
  .get(getProductsSearch);

router.route('/category/:id')
  .get(getProductsByCategory);

router.route('/info')
  .post(getProductsInfo);

router.route('/img/count/:id')
  .get(getImageCount);

module.exports = router;