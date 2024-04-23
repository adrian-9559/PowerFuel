const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database');

class Category extends Model {}
Category.init({
    category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category_name: DataTypes.STRING,
    parent_category_id: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: false 
}); 

const addCategory = async (category) => {
    try {
        const newCategory = await Category.create({
            category_name: category.category_name,
            parent_category_id: category.parent_category_id
        });
        return newCategory.category_id;
    } catch (error) {
        console.error(error);
        throw new Error('Error adding category');
    }
};

const updateCategory = async (categoryId, category) => {
    try {
        await Category.update({
            category_name: category.category_name,
            parent_category_id: category.parent_category_id
        }, {
            where: {
                category_id: categoryId
            }
        });
    } catch (error) {
        console.error(error);
        throw new Error('Error updating category');
    }
};

const getCategories = async (skip = 0, limit = 10, categoryId) => {
    try {
            const categories = await Category.findAll({
                where: categoryId ? {category_id: categoryId} : {},
                limit: limit,
                offset: skip
            });
            return categories;

    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener las categorías');
    }
};

const getParentCategories = async () => {
    try {
        const categories = await Category.findAll({
            where: {
                parent_category_id: null
            }
        });
        return categories;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting parent categories');
    }
};

const getChildCategories = async (parentCategoryId) => {
    try {
        const categories = await Category.findAll({
            where: {
                parent_category_id: parentCategoryId
            }
        });
        return categories;
    }
    catch (error) {
        console.error(error);
        throw new Error('Error getting child categories');
    }
}


const deleteCategory = async (categoryId) => {
    try {
        await Category.destroy({
            where: {
                category_id: categoryId
            }
        });
    } catch (error) {
        console.error(error);
        throw new Error('Error deleting category');
    }
};

const getCategoriesCount = async () => {
    try {
        const count = await Category.count();
        return count;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting categories count');
    }
};


module.exports = {
    Category,
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoriesCount,
    getParentCategories,
    getChildCategories,
    
};