const express = require('express');
const { getBrands, getBrandById, addBrand, updateBrandById, deleteBrandById } = require('./controller');

const router = express.Router();

router.route('/:brandId')
    .get(getBrandById)
    .put(updateBrandById)
    .delete(deleteBrandById);

router.route('/')
    .get(getBrands)
    .post(addBrand);

module.exports = router;