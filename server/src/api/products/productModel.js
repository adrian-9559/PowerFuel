const { Brand, Category, Product } = require('../../model');
const sequelize = require('../../model/database');
const { Op } = require('sequelize');
const errorDisplay = "(Error en el modelo de Product)";

class model {
    getProductsByCategory = async (skip = 0, limit = 10, categoryId) => {
        try {
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
        } catch (error) {
            throw new Error(`Error al obtener los productos por categoría ${errorDisplay}`, error);
        }
    };
    
    getProducts = async (skip = 0, limit = 10, productId) => {
        try {
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
        } catch (error) {
            throw new Error(`Error al obtener los productos ${errorDisplay}`, error);
        }
    };

    async getProductsId() {
        try {
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
        } catch (error) {
            throw new Error(`Error al obtener los IDs de los productos ${errorDisplay}`, error);
        }
    }
    
    async getChildCategories(categoryIds) {
        try {
            let childCategories = [];
            for (let id of categoryIds) {
                let category = await Category.findOne({ where: { parent_category_id: id } });
                if (category) {
                    childCategories.push(category.category_id);
                }
            }
            return childCategories;
        } catch (error) {
            throw new Error(`Error al obtener las categorías hijas ${errorDisplay}`, error);
        }
    }
    
    getProductsSearch = async (query, limit = 10, page = 1) => {
        try {
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
        } catch (error) {
            throw new Error(`Error al buscar productos ${errorDisplay}`, error);
        }
    }
    
    insertProduct = async (product) => {
        try {
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
        } catch (error) {
            throw new Error(`Error al insertar el producto ${errorDisplay}`, error);
        }
    };
    
    modifyProduct = async (productId, productData) => {
        try {
            const product = await Product.findByPk(productId);
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
            
                return updateProduct;
            }
            return null;
        } catch (error) {
            throw new Error(`Error al modificar el producto ${errorDisplay}`, error);
        }
    };
    
    deleteProduct = async (productId) => {
        try {
            if (!productId) {
                return false;
            }
            const result = await Product.destroy({
                where: {
                    product_id: productId
                }
            });
            return result;
        } catch (error) {
            throw new Error(`Error al eliminar el producto ${errorDisplay}`, error);
        }
    };
    
    getProductsCount = async () => {
        try {
            return await Product.count();
        } catch (error) {
            throw new Error(`Error al obtener el conteo de productos ${errorDisplay}`, error);
        }
    };
    
    getProductsCountByCategory = async (categoryId) => {
        try {
            return await Product.count({
                where: {
                    category_id: categoryId
                }
            });
        } catch (error) {
            throw new Error(`Error al obtener el conteo de productos por categoría ${errorDisplay}`, error);
        }
    };

    async getProductsByDate(limit = 15, skip = 0, startDate, endDate, order = 'ASC') {
        try {
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
        } catch (error) {
            throw new Error(`Error al obtener los productos por fecha ${errorDisplay}`, error);
        }
    }

    getRandomProducts = async (limit) => {
        try {
            return await Product.findAll({
                order: sequelize.random(),
                limit: limit
            });
        } catch (error) {
            throw new Error(`Error al obtener productos aleatorios ${errorDisplay}`, error);
        }
    };
}

module.exports = new model();