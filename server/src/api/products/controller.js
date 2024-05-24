// controller.js

const jwt = require('jsonwebtoken');
const model = require('./productModel');
const multer = require('multer');
const path = require('path');
const appRoot = path.dirname(require.main.filename);
const fs = require('fs');
const {createProduct} = require('../stripe/controller');


const addProduct = async (productData) => {
    const {productId, priceId} = await createProduct(productData.product_name, productData.description, productData.price);

    productData.stripe_product_id = productId;
    productData.stripe_price_id = priceId;


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

const getProducts = async (page, limit) => {
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;
    let products = await model.getProducts(skip, limit);
    const total = await model.getProductsCount();

    if (products.length > 0) {
        products = products.map(product => {
            return {
                "id": product.product_id,
                "product_id": product.product_id,
                "product_name": product.product_name,
                "description": product.description,
                "price": product.price,
                "stock_quantity": product.stock_quantity,
                "category_name": product.Category.category_name,
                "brand_name": product.Brand.brand_name,
                "status": product.status,
                "brand_name": product.Brand.brand_name,
            };
        });
    }

    return {
        total,
        pages: Math.ceil(total / limit),
        products
    };
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

const getImageCount = async (id) => {
    const directoryPath = path.join(appRoot, `/../public/images/product/${id}`);
    const files = fs.readdirSync(directoryPath);
    return { count: files.length };
};

const getProductsByDate = async (page, limit, startDate, endDate, order) => {
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 15;
    const skip = (page - 1) * limit;
    let products = await model.getProductsByDate(limit, skip, startDate, endDate, order);
    return products;
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
    getProductsByDate
};