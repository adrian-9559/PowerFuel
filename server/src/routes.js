// routes.js

const express = require('express');
const router = express.Router();

router.use('/api/users', require('./api/users/routes'));
router.use('/api/products', require('./api/products/routes'));
router.use('/api/roles', require('./api/roles/routes'));
router.use('/api/categories', require('./api/categories/routes'));
router.use('/api/brands', require('./api/brands/routes'));
router.use('/api/files', require('./api/files/routes'));
router.use('/api/address', require('./api/addresses/routes'));
router.use('/api/payment', require('./api/payment/routes'));

module.exports = router;