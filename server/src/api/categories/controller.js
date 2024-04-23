const model= require('./model');

const handleInternalServerError = (res, error) => {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
};

const getCategories = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        let categories = await model.getCategories(skip, limit);
        const total = await model.getCategoriesCount();

        categories = categories.map(category => {
            return {
                "id": category.category_id,
                "category_id": { display: "ID de la categoría", value: category.category_id },
                "category_name": { display: "Nombre de la categoría", value: category.category_name },
                "parent_category_id": { display: "ID de la categoría padre", value: category.parent_category_id ?? "Ninguno" }
            };
        });

        res.json({
            total,
            pages: Math.ceil(total / limit),
            data: categories
        });
    } catch (error) {
        handleInternalServerError(res, error);
    }
};

const getCategoryById = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const category = await model.getCategories(null, null , categoryId);
        res.json({category});
    } catch (error) {
        handleInternalServerError(res, error);
    }
};

const addCategory = async (req, res) => {
    const newCategory = req.body;
    try {
        const categoryId = await model.addCategory(newCategory);
        res.json({ category_id: categoryId, ...newCategory });
    } catch (error) {
        handleInternalServerError(res, error);
    }
};

const updateCategoryById = async (req, res) => {
    const { categoryId } = req.params;
    const updatedCategory = req.body;
    try {
        await model.updateCategory(categoryId, updatedCategory);
        res.json({ category_id: categoryId, ...updatedCategory });
    } catch (error) {
        handleInternalServerError(res, error);
    }
};

const deleteCategoryById = async (req, res) => {
    const { categoryId } = req.params;
    try {
        await model.deleteCategory(categoryId);
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        handleInternalServerError(res, error);
    }
};

const getParentCategories = async (req, res) => {
    try {
        const categories = await model.getParentCategories();
        res.json({categories});
    } catch (error) {
        handleInternalServerError(res, error);
    }
};

const getChildCategories = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const categories = await model.getChildCategories(categoryId);
        res.json({categories});
    } catch (error) {
        handleInternalServerError(res, error);
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
