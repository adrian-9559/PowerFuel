const { Brand, Category, Product } = require('../../model');
const { Op } = require('sequelize');

class model {
    getProductsByCategory = async (skip = 0, limit = 10, categoryId) => {
        skip = parseInt(skip);
        limit = parseInt(limit);
        const products = await Product.findAll({
            where: categoryId ? { category_id: categoryId } : {},
            offset: skip,
            limit: limit,
            include: [{
                model: Category
            }, {
                model: Brand
            }],
            subQuery: false
        });
        return products;
    };
    
    getProducts = async (skip = 0, limit = 10, productId) => {
        skip = parseInt(skip);
        limit = parseInt(limit);
        const products = await Product.findAll({
            where: productId ? { product_id: productId } : {},
            offset: skip,
            limit: limit,
            include: [{
                model: Category
            }, {
                model: Brand
            }],
            subQuery: false
        });
        return products;
    };
    
    async getChildCategories(categoryIds) {
        let childCategories = [];
        for (let id of categoryIds) {
            let category = await Category.findOne({ where: { parent_category_id: id } });
            if (category) {
                childCategories.push(category.category_id);
            }
        }
        return childCategories;
    }
    
    getProductsSearch = async (search) => {
        const skip = 0;
        const limit = 10;
        let products = await Product.findAll({
            where: {
                [Op.or]: [
                    {product_name: {[Op.like]: `%${search}%`}},
                    {'$Category.category_name$': {[Op.like]: `%${search}%`}},
                    {'$Brand.brand_name$': {[Op.like]: `%${search}%`}}
                ],
            },
            offset: skip,
            limit: limit,
            include: [{
                model: Category
            }, {
                model: Brand
            }]
        });
    
            const categories = await Category.findAll({
                where: {
                    category_name: {
                        [Op.like]: `%${search}%`
                    }
                }
            });
    
    
            if (categories.length > 0) {
                const categoryIds = categories.map(category => category.category_id).filter(id => id !== undefined);
                if (categoryIds.length > 0) {
                    const childCategories = await this.getChildCategories(categoryIds);
                    products.push(... await Product.findAll({
                        where: {
                            '$Category.category_id$': {
                                [Op.in]: childCategories
                            }
                        },
                        include: [{
                            model: Category
                        }, {
                            model: Brand
                        }]
                    }));
                }
            }
    
        return products;
    }
    
    insertProduct = async (product) => {
        const newProduct = await Product.create({
            product_name: product.product_name,
            description: product.description,
            price: product.price,
            stock_quantity: product.stock_quantity,
            id_brand: product.id_brand,
            category_id: product.category_id,
            stripe_product_id: product.stripe_product_id,
            stripe_price_id: product.stripe_price_id
        });
    
        return newProduct.product_id;
    };
    
    modifyProduct = async (productId, product) => {
        const updatedProduct = await Product.findByPk(productId);
    
        if (updatedProduct) {
            await updatedProduct.update({
                product_name: product.name,
                description: product.description,
                price: product.price,
                stock_quantity: product.quantity,
                id_brand: product.id_brand,
                category_id: product.category_id, // Add this line
            });
        }
    };
    
    deleteProduct = async (productId) => {
        if (!productId) {
            return false;
        }
        const result = await Product.destroy({
            where: {
                product_id: productId
            }
        });
        return result > 0;
    };
    
    getProductsCount = async () => {
        return await Product.count();
    };
    
    getProductsCountByCategory = async (categoryId) => {
        return await Product.count({
            where: {
                category_id: categoryId
            }
        });
    }
}

module.exports = new model();