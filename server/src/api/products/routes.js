// routes.js

const express = require('express');
const {
    addProduct,
    getProducts,
    getProductById,
    modifyProductById,
    deleteProductById,
    getImageCount,
    getProductsByCategory,
    getProductsSearch,
    getProductsByDate,
    getRandomProducts
} = require('./controller');

const router = express.Router();

router.route('/')
    .post(async (req, res) => {
        try {
            const product = await addProduct(req.body);
            res.status(200).json(product);
        } catch (error) {
            console.error('Error al agregar el producto:', error);
            res.status(500).json({ message: 'Hubo un problema al agregar el producto. Por favor, inténtalo de nuevo.' });
        }
    })
    .get(async (req, res) => {
        try {
            const data = await getProducts(req.query.page, req.query.limit);
            res.status(200).json(data);
        } catch (error) {
            console.error('Error al obtener la información del producto:', error);
            res.status(500).json({ message: 'Hubo un problema al obtener la información del producto. Por favor, inténtalo de nuevo.' });
        }
    });

router.route('/:productId')
    .get(async (req, res) => {
        try {
            const product = await getProductById(req.params.productId);
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.status(200).json(product);
        } catch (error) {
            console.error('Error al obtener el producto:', error);
            res.status(500).json({ message: 'Hubo un problema al obtener el producto. Por favor, inténtalo de nuevo.' });
        }
    })
    .put(async (req, res) => {
        try {
            const product = await modifyProductById(req.params.productId, req.body);
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.status(200).json({ message: 'Producto modificado exitosamente' });
        } catch (error) {
            console.error('Error al modificar el producto:', error);
            res.status(500).json({ message: 'Hubo un problema al modificar el producto. Por favor, inténtalo de nuevo.' });
        }
    })
    .delete(async (req, res) => {
        try {
            const deletedProduct = await deleteProductById(req.params.productId);
            if (!deletedProduct) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.status(200).json({ message: 'Producto eliminado exitosamente' });
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            res.status(500).json({ message: 'Hubo un problema al eliminar el producto. Por favor, inténtalo de nuevo.' });
        }
    });

    router.route('/search')
    .post(async (req, res) => {
        try {
            const { query, limit = 10, page = 1 } = req.body;
            const products = await getProductsSearch(query, limit, page);
            if (!products) {
                return res.status(404).json({ message: 'Productos no encontrados' });
            }
            res.status(200).json({products});
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            res.status(500).json({ message: 'Hubo un problema al obtener los productos. Por favor, inténtalo de nuevo.' });
        }
    });

router.route('/category/:id')
    .post(async (req, res) => {
        try {
            const products = await getProductsByCategory(req.query.page, req.query.limit, req.params.id);
            if (!products) {
                return res.status(404).json({ message: 'Productos no encontrados' });
            }
            res.status(200).json({products});
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            res.status(500).json({ message: 'Hubo un problema al obtener los productos. Por favor, inténtalo de nuevo.' });
        }
    });

router.route('/img/count/:id')
    .get(async (req, res) => {
        try {
            const count = await getImageCount(req.params.id);
            res.status(200).json(count);
        } catch (error) {
            console.error('Error al obtener el conteo de imágenes:', error);
            res.status(500).json({ message: 'Hubo un problema al obtener el conteo de imágenes. Por favor, inténtalo de nuevo.' });
        }
    });

router.route('/date')
    .post(async (req, res) => {
        try {
            const products = await getProductsByDate(req.query.page, req.query.limit, req.query.startDate, req.query.endDate, req.query.order);
            if (!products) {
                return res.status(404).json({ message: 'Productos no encontrados' });
            }
            res.status(200).json(products);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            res.status(500).json({ message: 'Hubo un problema al obtener los productos. Por favor, inténtalo de nuevo.' });
        }
    });


router.route('/random')
    .post(async (req, res) => {
        try {
            const products = await getRandomProducts(parseInt(req.query.limit));
            if (!products) {
                console.log('Productos no encontrados');
                return res.status(404).json({ message: 'Productos no encontrados' });
            }
            res.status(200).json(products);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            res.status(500).json({ message: 'Hubo un problema al obtener los productos. Por favor, inténtalo de nuevo.' });
        }
    });
module.exports = router;