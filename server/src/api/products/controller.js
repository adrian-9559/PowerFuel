// controller.js

const jwt = require('jsonwebtoken');
const model = require('./productModel');
const multer = require('multer');
const path = require('path');
const appRoot = path.dirname(require.main.filename);
const fs = require('fs');
const { createProduct, deleteProduct, updateProduct} = require('../stripe/controller');
const { deleteProductImages } = require('../files/controller');
const errorDisplay = "(Error en el controlador de Productos)";

const addProduct = async (productData) => {
    try {
        const {productId, priceId} = await createProduct(productData.product_name, productData.description, productData.price);

        productData.stripe_product_id = productId;
        productData.stripe_price_id = priceId;

        const product = await model.insertProduct(productData);
        return product;
    } catch (error) {
        throw new Error(`Error al intentar añadir el producto ${errorDisplay}`, error);
    }
};

const deleteProductById = async (productId) => {
    try {
        const product = await model.getProducts(0, 1, productId);
        const deletedProduct = await model.deleteProduct(productId);
        deleteProductImages(productId);
        console.log("product", product[0].stripe_product_id);
        deleteProduct(product[0].stripe_product_id);
        return deletedProduct;
    } catch (error) {
        throw new Error(`Error al intentar eliminar el producto ${errorDisplay}`, error);
    }
};

const modifyProductById = async (productId, productData) => {
    try {
        const product = await model.modifyProduct(productId, productData);

        updateProduct(product.stripe_price_id, product);
        return product;
    } catch (error) {
        throw new Error(`Error al intentar modificar el producto ${errorDisplay}`, error);
    }
};

const getProductById = async (productId) => {
    try {
        const product = await model.getProducts(0, 1, productId);
        return product[0];
    } catch (error) {
        throw new Error(`Error al intentar obtener el producto ${errorDisplay}`, error);
    }
};

const getProducts = async (page, limit) => {
    try {
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const skip = (page - 1) * limit;
        let products = await model.getProducts(skip, limit);
        const total = await model.getProductsCount();

        if (products.length > 0) {
            
            products = products.map(product => {
                product.brand_name = product.Brand.brand_name;
                product.category_name = product.Category.category_name;
                return product;
            });
        }

        return {
            total,
            pages: Math.ceil(total / limit),
            products
        };
    } catch (error) {
        throw new Error(`Error al intentar obtener los productos ${errorDisplay}`, error);
    }
};

const getProductsSearch = async (query, limit, page) => {
    try {
        let products = await model.getProductsSearch(query, limit, page);
        return products;
    } catch (error) {
        throw new Error(`Error al intentar obtener los productos ${errorDisplay}`, error);
    }
};

const getProductsByCategory = async (page, limit, id) => {
    try {
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const skip = (page - 1) * limit;
        let products = await model.getProductsByCategory(skip, limit, id);
        return products;
    } catch (error) {
        throw new Error(`Error al intentar obtener los productos por categoría ${errorDisplay}`, error);
    }
};

const getImageCount = async (id) => {
    try {
        const directoryPath = path.join(appRoot, `/../public/images/product/${id}`);
        const files = fs.readdirSync(directoryPath);
        if (!files) {
            return { count: 0 };
        }
        return { count: files.length };
    } catch (error) {
        throw new Error(`Error al intentar obtener el conteo de imágenes ${errorDisplay}`, error);
    }
};

const getProductsByDate = async (page, limit, startDate, endDate, order) => {
    try {
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 15;
        const skip = (page - 1) * limit;
        let products = await model.getProductsByDate(limit, skip, startDate, endDate, order);
        return products;
    } catch (error) {
        throw new Error(`Error al intentar obtener los productos por fecha ${errorDisplay}`, error);
    }
}

const getRandomProducts = async (limit) => {
    try {
        return await model.getRandomProducts(limit);
    } catch (error) {
        throw new Error(`Error al intentar obtener los productos aleatorios ${errorDisplay}`, error);
    }
}

module.exports = {
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
};