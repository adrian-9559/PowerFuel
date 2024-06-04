const { Brand, Category, Product } = require('../../model');
const sequelize = require('../../model/database');
const { Op } = require('sequelize');
const errorDisplay = "(Error en el modelo de Product)";

class model {
    /**
     * Función para obtener los productos de una categoría con paginación.
     * Function to get the products of a category with pagination.
     * 
     * @param {number} skip - El número de productos a saltar. | The number of products to skip.
     * @param {number} limit - El límite de productos por página. | The limit of products per page.
     * @param {string} categoryId - El ID de la categoría. | The ID of the category.
     * 
     * @returns {Array} - Los productos de la categoría obtenidos. | The obtained products of the category.
     * @throws {Error} - Error al intentar obtener los productos por categoría. | Error when trying to get the products by category.
     */
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
    
    /**
     * Función para obtener los productos con paginación.
     * Function to get the products with pagination.
     * 
     * @param {number} skip - El número de productos a saltar. | The number of products to skip.
     * @param {number} limit - El límite de productos por página. | The limit of products per page.
     * @param {string} productId - El ID del producto. | The ID of the product.
     * 
     * @returns {Array} - Los productos obtenidos. | The obtained products.
     * @throws {Error} - Error al intentar obtener los productos. | Error when trying to get the products.
     */
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

    /**
     * Función para obtener los IDs de los productos.
     * Function to get the IDs of the products.
     * 
     * @returns {Array} - Los productos con sus IDs. | The products with their IDs.
     * @throws {Error} - Error al intentar obtener los IDs de los productos. | Error when trying to get the IDs of the products.
     */
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
    
    /**
     * Función para obtener las categorías hijas de una lista de categorías.
     * Function to get the child categories of a list of categories.
     * 
     * @param {Array} categoryIds - Los IDs de las categorías. | The IDs of the categories.
     * 
     * @returns {Array} - Las categorías hijas obtenidas. | The obtained child categories.
     * @throws {Error} - Error al intentar obtener las categorías hijas. | Error when trying to get the child categories.
     */
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
    
    /**
     * Función para buscar productos por nombre, categoría o marca con paginación.
     * Function to search for products by name, category or brand with pagination.
     * 
     * @param {string} query - La consulta de búsqueda. | The search query.
     * @param {number} limit - El límite de productos por página. | The limit of products per page.
     * @param {number} page - La página actual. | The current page.
     * 
     * @returns {Array} - Los productos que coinciden con la consulta de búsqueda. | The products that match the search query.
     * @throws {Error} - Error al intentar buscar los productos. | Error when trying to search for the products.
     */
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
    
    /**
     * Función para insertar un nuevo producto en la base de datos.
     * Function to insert a new product into the database.
     * 
     * @param {Object} product - El producto a insertar. | The product to insert.
     * 
     * @returns {string} - El ID del producto insertado. | The ID of the inserted product.
     * @throws {Error} - Error al intentar insertar el producto. | Error when trying to insert the product.
     */
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
    
    /**
     * Función para modificar un producto existente en la base de datos.
     * Function to modify an existing product in the database.
     * 
     * @param {string} productId - El ID del producto a modificar. | The ID of the product to modify.
     * @param {Object} productData - Los nuevos datos del producto. | The new data of the product.
     * 
     * @returns {Object|null} - El producto modificado o null si el producto no existe. | The modified product or null if the product does not exist.
     * @throws {Error} - Error al intentar modificar el producto. | Error when trying to modify the product.
     */
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
    
    /**
     * Función para eliminar un producto de la base de datos.
     * Function to delete a product from the database.
     * 
     * @param {string} productId - El ID del producto a eliminar. | The ID of the product to delete.
     * 
     * @returns {boolean} - Verdadero si el producto se eliminó correctamente, falso en caso contrario. | True if the product was deleted successfully, false otherwise.
     * @throws {Error} - Error al intentar eliminar el producto. | Error when trying to delete the product.
     */
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
    
    /**
     * Función para obtener el conteo total de productos en la base de datos.
     * Function to get the total count of products in the database.
     * 
     * @returns {number} - El conteo total de productos. | The total count of products.
     * @throws {Error} - Error al intentar obtener el conteo de productos. | Error when trying to get the count of products.
     */
    getProductsCount = async () => {
        try {
            return await Product.count();
        } catch (error) {
            throw new Error(`Error al obtener el conteo de productos ${errorDisplay}`, error);
        }
    };
    
    /**
     * Función para obtener el conteo de productos en una categoría específica.
     * Function to get the count of products in a specific category.
     * 
     * @param {string} categoryId - El ID de la categoría. | The ID of the category.
     * 
     * @returns {number} - El conteo de productos en la categoría. | The count of products in the category.
     * @throws {Error} - Error al intentar obtener el conteo de productos por categoría. | Error when trying to get the count of products by category.
     */
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

    /**
     * Función para obtener productos por fecha de registro.
     * Function to get products by registration date.
     * 
     * @param {number} limit - El límite de productos por página. | The limit of products per page.
     * @param {number} skip - El número de productos a omitir. | The number of products to skip.
     * @param {string} startDate - La fecha de inicio para la búsqueda. | The start date for the search.
     * @param {string} endDate - La fecha de fin para la búsqueda. | The end date for the search.
     * @param {string} order - El orden de los productos ('ASC' para ascendente, 'DESC' para descendente). | The order of the products ('ASC' for ascending, 'DESC' for descending).
     * 
     * @returns {Array} - Los productos que coinciden con las fechas de búsqueda. | The products that match the search dates.
     * @throws {Error} - Error al intentar obtener los productos por fecha. | Error when trying to get the products by date.
     */
    async getProductsByDate(limit = 15, skip = 0, startDate, endDate, order = 'ASC') {
        try {
            let whereCondition = {
                status: 'Enabled'
            };
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

    /**
     * Función para obtener productos aleatorios.
     * Function to get random products.
     * 
     * @param {number} limit - El límite de productos a obtener. | The limit of products to get.
     * 
     * @returns {Array} - Los productos aleatorios obtenidos. | The obtained random products.
     * @throws {Error} - Error al intentar obtener los productos aleatorios. | Error when trying to get the random products.
     */
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