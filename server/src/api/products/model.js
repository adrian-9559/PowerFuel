const { DataTypes, Model, Op} = require('sequelize');
const sequelize = require('../../database');
const { Brand } = require('../brands/model');
const { Category } = require('../categories/model');

class Product extends Model {}
Product.init({
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10, 2),
    stock_quantity: DataTypes.INTEGER,
    id_brand: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER, // Added this line
    status: {
        type: DataTypes.ENUM('enable', 'disable'),
        allowNull: false,
        defaultValue: 'enable'
    }
}, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: false
});

Brand.hasMany(Product, {
    foreignKey: 'id_brand',
    as: 'products'
});
Product.belongsTo(Brand, {
    foreignKey: 'id_brand',
    as: 'brand'
});

Product.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category'
});
Category.hasMany(Product, {
    foreignKey: 'category_id',
    as: 'products'
});

const getProductsByCategory = async (skip = 0, limit = 10, categoryId) => {
    skip = parseInt(skip);
    limit = parseInt(limit);
    const products = await Product.findAll({
        where: categoryId ? { category_id: categoryId } : {},
        offset: skip,
        limit: limit,
        include: [{
            model: Category,
            as: 'category',
        }, {
            model: Brand,
            as: 'brand'
        }],
        subQuery: false
    });
    return products;
};

const getProducts = async (skip = 0, limit = 10, productId) => {
    const products = await Product.findAll({
        where: productId ? { product_id: productId } : {},
        include: [{
            model: Category,
            as: 'category',
        }, {
            model: Brand,
            as: 'brand'
        }],
        subQuery: false
    });
    return products;
};

const getProductsSearch = async (search) => {
    const skip = 0;
    const limit = 10;
    let products = await Product.findAll({
        where: {
            [Op.or]: [
                {product_name: {[Op.like]: `%${search}%`}},
                {'$category.category_name$': {[Op.like]: `%${search}%`}},
                {'$brand.brand_name$': {[Op.like]: `%${search}%`}}
            ],
        },
        offset: skip,
        limit: limit,
        include: [{
            model: Category,
            as: 'category',
        }, {
            model: Brand,
            as: 'brand'
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
                const childCategories = await getChildCategories(categoryIds);
                console.log(childCategories);
                products.push(... await Product.findAll({
                    where: {
                        '$category.category_id$': {
                            [Op.in]: childCategories
                        }
                    },
                    include: [{
                        model: Category,
                        as: 'category',
                    }, {
                        model: Brand,
                        as: 'brand'
                    }]
                }));
            }
        }

    return products;
}

const getChildCategories = async (categoryIds) => {
    let childCategories = [];
    for (let categoryId of categoryIds) {
        const children = await Category.findAll({
            where: {
                parent_category_id: categoryId
            }
        });
        childCategories.push(...children.map(child => child.category_id));
        if (children.length > 0) {
            childCategories.push(...await getChildCategories(children.map(child => child.category_id)));
        }
    }
    return childCategories;
}

const insertProduct = async (product) => {
    console.log(product);   
    const newProduct = await Product.create({
        product_name: product.product_name,
        description: product.description,
        price: product.price,
        stock_quantity: product.stock_quantity,
        id_brand: product.id_brand,
        category_id: product.category_id, // Add this line
    });

    return newProduct.product_id;
};

const modifyProduct = async (productId, product) => {
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

const deleteProduct = async (productId) => {
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

const getProductsCount = async () => {
    return await Product.count();
};

const getProductsCountByCategory = async (categoryId) => {
    return await Product.count({
        where: {
            category_id: categoryId
        }
    });
}

module.exports = {
    getProducts,
    insertProduct,
    modifyProduct,
    deleteProduct,
    getProductsCount,
    getProductsByCategory,
    getProductsSearch,
    getProductsCountByCategory
};