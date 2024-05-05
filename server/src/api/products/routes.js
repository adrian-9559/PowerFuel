// routes.js

const express = require('express');
const {
    addProduct,
    getProducts,
    getProductById,
    modifyProductById,
    deleteProductById,
    getProductsInfo,
    getImageCount,
    getProductsByCategory,
    getProductsSearch
} = require('./controller');

const router = express.Router();

router.route('/')
    .post(async (req, res) => {
        try {
            const product = await addProduct(req.body);
            res.json(product);
        } catch (error) {
            console.error('Error adding the product:', error);
            res.status(500).json({ message: 'Error adding the product' });
        }
    })
    .get(async (req, res) => {
        try {
            const products = await getProducts();
            res.json({products});
        } catch (error) {
            console.error('Error getting the products:', error);
            res.status(500).json({ message: 'Error getting the products' });
        }
    });

router.route('/:productId')
    .get(async (req, res) => {
        try {
            const product = await getProductById(req.params.productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            console.error('Error getting the product:', error);
            res.status(500).json({ message: 'Error getting the product' });
        }
    })
    .put(async (req, res) => {
        try {
            const product = await modifyProductById(req.params.productId, req.body);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json({ message: 'Product modified successfully' });
        } catch (error) {
            console.error('Error modifying the product:', error);
            res.status(500).json({ message: 'Error modifying the product' });
        }
    })
    .delete(async (req, res) => {
        try {
            const deletedProduct = await deleteProductById(req.params.productId);
            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json({ message: 'Product deleted successfully' });
        } catch (error) {
            console.error('Error deleting the product:', error);
            res.status(500).json({ message: 'Error deleting the product' });
        }
    });

router.route('/search/:input')
    .get(async (req, res) => {
        try {
            const products = await getProductsSearch(req.params.input);
            if (!products) {
                return res.status(404).json({ message: 'Products not found' });
            }
            res.json({products});
        } catch (error) {
            console.error('Error getting the products:', error);
            res.status(500).json({ message: 'Error getting the products' });
        }
    });

router.route('/category/:id')
    .get(async (req, res) => {
        try {
            const products = await getProductsByCategory(req.query.page, req.query.limit, req.params.id);
            if (!products) {
                return res.status(404).json({ message: 'Products not found' });
            }
            res.json({products});
        } catch (error) {
            console.error('Error getting the products:', error);
            res.status(500).json({ message: 'Error getting the products' });
        }
    });

router.route('/info')
    .post(async (req, res) => {
        try {
            const info = await getProductsInfo(req.body.page, req.body.limit);
            res.json(info);
        } catch (error) {
            console.error('Error getting the product info:', error);
            res.status(500).json({ message: 'Error getting the product info' });
        }
    });

router.route('/img/count/:id')
    .get(async (req, res) => {
        try {
            const count = await getImageCount(req.params.id);
            res.json(count);
        } catch (error) {
            console.error('Error getting the image count:', error);
            res.status(500).json({ message: 'Error getting the image count' });
        }
    });

module.exports = router;