const { Category } = require('../../model');

class model {
    addCategory = async (category) => {
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
    
    updateCategory = async (categoryId, category) => {
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
    
    getCategories = async (skip = null, limit = null, categoryId) => {
        try {
                const categories = await Category.findAll({
                    where: categoryId ? {category_id: categoryId} : {},
                    limit: limit? limit : null,
                    offset: skip? skip : null
                });
                return categories;
    
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener las categorías');
        }
    };
    
    getParentCategories = async () => {
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
    
    getChildCategories = async (parentCategoryId) => {
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
    
    
    deleteCategory = async (categoryId) => {
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
    
    getCategoriesCount = async () => {
        try {
            const count = await Category.count();
            return count;
        } catch (error) {
            console.error(error);
            throw new Error('Error getting categories count');
        }
    };

    getAllCategories = async () => {
        try {
            const categories = await Category.findAll({
                where: { parent_category_id: null },
                include: [{
                    model: Category,
                    as: 'children',
                    hierarchy: true
                }]
            });
            return categories;
        } catch (error) {
            console.error(error);
            throw new Error('Error getting all categories');
        }
    };
}


module.exports = new model();