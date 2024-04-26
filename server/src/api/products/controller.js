const jwt = require('jsonwebtoken');
const model = require('../../model/productModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const addProduct = async (req, res) => {
    const newProduct = req.body;
    try {
        const product = await model.insertProduct(newProduct);
        res.json(product);
    } catch (error) {
        console.error('Error adding the product:', error);
        res.status(500).json({ message: 'Error adding the product' });
    }
};

const deleteProductById = async (req, res) => {
    const deletedProduct = await model.deleteProduct(req.params.productId);

    if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
};

const modifyProductById = async (req, res) => {
    const { productId } = req.params;
    const product = await model.modifyProduct(productId, req.body);
    if (!product) {
        throw new Error('Not found');
    }
    res.json({ message: 'Product modified successfully' });
};

const getProductById = async (req, res) => {
    try {
        const product = await model.getProducts(null, null, req.params.productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({product});
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
};

const getProducts = async (req, res) => {
    const products = await model.getProducts();
    if (!products) {
        throw new Error('Not found');
    }

    res.json({products});
};

const getProductsSearch = async (req, res) => {
    const { input } = req.params;
    
    let products = await model.getProductsSearch(input);
    if (!products) {
        res.status(404).json({ message: 'Products not found' });
    }
    
    res.json({products});
};

const getProductsByCategory = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { id } = req.params;
    console.log(id);
    let products = await model.getProductsByCategory(id);
    if (!products) {
        res.status(404).json({ message: 'Products not found' });
    }
    
    res.json({products});
};

const getProductsInfo = async (req, res) => {
    console.log("hola");
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;


    let products = await model.getProducts(skip, limit);
    const total = await model.getProductsCount();

    products = products.map(product => {
        return {
            "id": product.product_id,
            "product_id": { display: "ID del Producto", value: product.product_id },
            "product_name": { display: "Nombre del Producto", value: product.product_name },
            "description": { display: "Descripción", value: product.description },
            "price": { display: "Precio", value: product.price },
            "stock_quantity": { display: "Cantidad en Stock", value: product.stock_quantity },
            "category": { display: "Categoría", value: product.Category.category_name },
            "brand": { display: "Marca", value: product.Brand.brand_name },
            "status": { display: "Estado", value: product.status ? "Activo" : "Inactivo" },
        };
    });

    res.json({
        total,
        pages: Math.ceil(total / limit),
        data: products
    });
};

const getImageCount = async (req, res) => {
    try {
        
        const { id } = req.params;
        const directoryPath = path.join(appRoot, `/../public/images/product/${id}`);
        fs.readdir(directoryPath, (err, files) => {
            
            if (err) {
                console.error('Error fetching image count:', err.message);
                res.status(500).json({ message: 'Error fetching image count' });
            } else {
                res.json({ count: files.length });
            }
        });
    } catch (error) {
        console.error('Error fetching image count:', error.message);
        res.status(500).json({ message: 'Error fetching image count' });
    }
};

module.exports = {
    addProduct,
    getProducts,
    getProductById,
    modifyProductById,
    deleteProductById,
    getProductsInfo,
    getImageCount,
    getProductsByCategory,
    getProductsSearch
};