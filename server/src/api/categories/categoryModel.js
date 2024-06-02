const { Category } = require('../../model');
const errorDisplay = "(Error en el modelo de Categories)";

class model {
    addCategory = async (category) => {
        try {
            const newCategory = await Category.create({
                category_name: category.category_name,
                parent_category_id: category.parent_category_id
            });
            return newCategory.category_id;
        } catch (error) {
            throw new Error(`Error al añadir la categoría ${errorDisplay}`, error);
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
            throw new Error(`Error al actualizar la categoría ${errorDisplay}`, error);
        }
    };
    
    getCategories = async (skip = null, limit = null, categoryId) => {
        try {
            const query = {
                where: categoryId ? {category_id: categoryId} : {},
            };

            if (skip !== null) {
                query.offset = skip;
            }

            if (limit !== null) {
                query.limit = limit;
            }

            return await Category.findAll(query);
        } catch (error) {
            throw new Error(`Error al obtener las categorías ${errorDisplay}`, error);
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
            throw new Error(`Error al obtener las categorías principales ${errorDisplay}`, error);
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
        } catch (error) {
            throw new Error(`Error al obtener las categorías hijas ${errorDisplay}`, error);
        }
    };
    
    deleteCategory = async (categoryId) => {
        try {
            await Category.destroy({
                where: {
                    category_id: categoryId
                }
            });
        } catch (error) {
            console.error(error);
            throw new Error(`Error al eliminar la categoría ${errorDisplay}`, error);
        }
    };
    
    getCategoriesCount = async () => {
        try {
            return await Category.count();
        } catch (error) {
            throw new Error(`Error al obtener el conteo de categorías ${errorDisplay}`, error);
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
            throw new Error(`Error al obtener todas las categorías ${errorDisplay}`, error);
        }
    };
}


module.exports = new model();