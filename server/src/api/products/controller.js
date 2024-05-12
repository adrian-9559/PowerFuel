// controller.js

const jwt = require('jsonwebtoken');
const model = require('./productModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const addProduct = async (productData) => {
    const product = await model.insertProduct(productData);
    return product;
};

const deleteProductById = async (productId) => {
    const deletedProduct = await model.deleteProduct(productId);
    return deletedProduct;
};

const modifyProductById = async (productId, productData) => {
    const product = await model.modifyProduct(productId, productData);
    return product;
};

const getProductById = async (productId) => {
    const product = await model.getProducts(0, 1, productId);
    return product[0];
};

const getProducts = async () => {
    const products = await model.getProducts(0, 10);
    return products;
};

const getProductsSearch = async (input) => {
    let products = await model.getProductsSearch(input);
    return products;
};

const getProductsByCategory = async (page, limit, id) => {
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;
    let products = await model.getProductsByCategory(skip, limit, id);
    return products;
};

const getProductsInfo = async (page, limit) => {
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;
    let products = await model.getProducts(skip, limit);
    const total = await model.getProductsCount();

    if (products.length > 0) {
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
                "status": { display: "Estado", value: product.status},
            };
        });
    }

    return {
        total,
        pages: Math.ceil(total / limit),
        data: products
    };
};

const getImageCount = async (id) => {
    const directoryPath = path.join(appRoot, `/../public/images/product/${id}`);
    const files = fs.readdirSync(directoryPath);
    return { count: files.length };
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