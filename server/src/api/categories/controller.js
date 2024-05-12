const model = require('./categoryModel');

const handleInternalServerError = (error) => {
    console.error(error);
    return { status: 500, json: { message: 'Internal Server Error' } };
};

const getCategories = async (page, limit) => {
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;

    try {
        let categories = await model.getCategories(skip, limit);
        const total = await model.getCategoriesCount();

        const categoriesWithParentNames = await Promise.all(
            categories.map(async category => {
                const parentCategory = await getCategoryById(category.parent_category_id);
                return {
                    "category_id": category.category_id,
                    "category_name": category.category_name,
                    "parent_category_id": category.parent_category_id ?? null,
                    "parent_category_name": parentCategory ? parentCategory.category_name : null
                };
            })
        );

        return {
            total,
            pages: Math.ceil(total / limit),
            categories: categoriesWithParentNames
        };
    } catch (error) {
        return handleInternalServerError(error);
    }
};

const getCategoryById = async (categoryId) => {
    try {
        const category = await model.getCategories(null, null , categoryId);
        return category[0];
    } catch (error) {
        return handleInternalServerError(error);
    }
};

const addCategory = async (newCategory) => {
    try {
        const categoryId = await model.addCategory(newCategory);
        return { category_id: categoryId, ...newCategory };
    } catch (error) {
        return handleInternalServerError(error);
    }
};

const updateCategoryById = async (categoryId, updatedCategory) => {
    try {
        await model.updateCategory(categoryId, updatedCategory);
        return { category_id: categoryId, ...updatedCategory };
    } catch (error) {
        return handleInternalServerError(error);
    }
};

const deleteCategoryById = async (categoryId) => {
    try {
        await model.deleteCategory(categoryId);
        return { status: 200, json: { message: 'Category deleted successfully' } };
    } catch (error) {
        return handleInternalServerError(error);
    }
};

const getParentCategories = async () => {
    try {
        const categories = await model.getParentCategories();
        return categories;
    } catch (error) {
        return handleInternalServerError(error);
    }
};

const getChildCategories = async (categoryId) => {
    try {
        const categories = await model.getChildCategories(categoryId);
        return {categories};
    } catch (error) {
        return handleInternalServerError(error);
    }
};

module.exports = {
    getCategories,
    getCategoryById,
    addCategory,
    updateCategoryById,
    deleteCategoryById,
    getParentCategories,
    getChildCategories
};