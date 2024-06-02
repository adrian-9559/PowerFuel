const { Brand, Category, Product } = require('../../model');
const sequelize = require('../../model/database');
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

    async getProductsId(){
        const products = await Product.findAll({
            attributes: ['product_id'],
            include: [{
                model: Category
            }, {
                model: Brand
            }],
            subQuery: false
        });
        return products;
    }
    
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
    
    getProductsSearch = async (query, limit = 10, page = 1) => {
        const skip = (page - 1) * limit;
        let products = await Product.findAll({
            where: {
                [Op.or]: [
                    {product_name: {[Op.like]: `%${query}%`}},
                    {'$Category.category_name$': {[Op.like]: `%${query}%`}},
                    {'$Brand.brand_name$': {[Op.like]: `%${query}%`}}
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
                        [Op.like]: `%${query}%`
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
            stripe_price_id: product.stripe_price_id,
            resgistration_date: product.resgistration_date
        });
    
        return newProduct.product_id;
    };
    
    modifyProduct = async (productId, productData) => {
        const product = await Product.findByPk(productId);
        console.log("product", product);
        if (product) {
            const updateProduct = await Product.update({
                product_name: productData.name,
                description: productData.description,
                price: productData.price,
                stock_quantity: productData.stock_quantity,
                id_brand: productData.id_brand,
                category_id: productData.category_id,
            }, {
                where: {
                    product_id: parseInt(productId)
                }
            });

            console.log("updateProduct", updateProduct);
    
            return updateProduct;
        }
        return null;
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

    async getProductsByDate(limit = 15, skip = 0, startDate, endDate, order = 'ASC') {
        let whereCondition = {};
        if(startDate && endDate && !isNaN(new Date(startDate)) && !isNaN(new Date(endDate))) {
            whereCondition.registration_date = {
                [Op.between]: [startDate, endDate]
            };
        }
    
        let products = await Product.findAll({
            where: whereCondition,
            order: [
                ['registration_date', order]
            ],
            offset: skip,
            limit: limit
        });
        
        return products;
    }

    getRandomProducts = async (limit) => {
        return await Product.findAll({
          order: sequelize.random(),
          limit: limit
        });
    }
}

module.exports = new model();