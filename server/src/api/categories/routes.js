const express = require('express');
const router = express.Router();
const { getCategories, getCategoryById, addCategory, updateCategoryById, deleteCategoryById, getParentCategories, getChildCategories, getAllCategories } = require('./controller');

router.route('/')
    /**
     * Endpoint para obtener todas las categorías con paginación.
     * Endpoint to get all categories with pagination.
     * 
     * @route GET /
     * @param {number} req.query.page - La página que se quiere obtener. | The page to be obtained.
     * @param {number} req.query.limit - El número de categorías por página. | The number of categories per page.
     * @returns {Array} 200 - Un array de categorías. | An array of categories.
     * @returns {Error} 500 - Error al obtener las categorías. | Error when getting the categories.
     */
    .get(async (req, res) => {
        try {
            const categories = await getCategories(req.query.page, req.query.limit);
            res.json(categories);
        } catch (error) {
            res.status(500).json({ message: 'Error getting the categories' });
        }
    })
    /**
     * Endpoint para añadir una nueva categoría.
     * Endpoint to add a new category.
     * 
     * @route POST /
     * @param {Object} req.body - El objeto con los datos de la nueva categoría. | The object with the new category data.
     * @returns {Object} 200 - El objeto de la nueva categoría añadida. | The object of the added new category.
     * @returns {Error} 500 - Error al añadir la categoría. | Error when adding the category.
     */
    .post(async (req, res) => {
        try {
            const category = await addCategory(req.body);
            res.json(category);
        } catch (error) {
            res.status(500).json({ message: 'Error adding the category' });
        }
    });

router.route('/parent')
    /**
     * Endpoint para obtener todas las categorías padre.
     * Endpoint to get all parent categories.
     * 
     * @route GET /parent
     * @returns {Array} 200 - Un array de categorías padre. | An array of parent categories.
     * @returns {Error} 500 - Error al obtener las categorías padre. | Error when getting the parent categories.
     */
    .get(async (req, res) => {
        try {
            const parentCategories = await getParentCategories();
            res.json(parentCategories);
        } catch (error) {
            res.status(500).json({ message: 'Error getting the parent categories' });
        }
    });

router.route('/:categoryId')
    /**
     * Endpoint para obtener una categoría por su ID.
     * Endpoint to get a category by its ID.
     * 
     * @route GET /:categoryId
     * @param {string} req.params.categoryId - El ID de la categoría que se quiere obtener. | The ID of the category to be obtained.
     * @returns {Object} 200 - El objeto de la categoría. | The category object.
     * @returns {Error} 404 - Categoría no encontrada. | Category not found.
     * @returns {Error} 500 - Error al obtener la categoría. | Error when getting the category.
     */
    .get(async (req, res) => {
        try {
            const category = await getCategoryById(req.params.categoryId);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.json(category);
        } catch (error) {
            res.status(500).json({ message: 'Error getting the category' });
        }
    })
    /**
     * Endpoint para modificar una categoría por su ID.
     * Endpoint to modify a category by its ID.
     * 
     * @route PUT /:categoryId
     * @param {string} req.params.categoryId - El ID de la categoría que se quiere modificar. | The ID of the category to be modified.
     * @param {Object} req.body - El objeto con los datos de la categoría modificada. | The object with the modified category data.
     * @returns {Object} 200 - Mensaje de éxito. | Success message.
     * @returns {Error} 404 - Categoría no encontrada. | Category not found.
     * @returns {Error} 500 - Error al modificar la categoría. | Error when modifying the category.
     */
    .put(async (req, res) => {
        try {
            const category = await updateCategoryById(req.params.categoryId, req.body);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.json({ message: 'Category modified successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error modifying the category' });
        }
    })
    /**
     * Endpoint para eliminar una categoría por su ID.
     * Endpoint to delete a category by its ID.
     * 
     * @route DELETE /:categoryId
     * @param {string} req.params.categoryId - El ID de la categoría que se quiere eliminar. | The ID of the category to be deleted.
     * @returns {Object} 200 - Mensaje de éxito. | Success message.
     * @returns {Error} 404 - Categoría no encontrada. | Category not found.
     * @returns {Error} 500 - Error al eliminar la categoría. | Error when deleting the category.
     */
    .delete(async (req, res) => {
        try {
            const deletedCategory = await deleteCategoryById(req.params.categoryId);
            if (!deletedCategory) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.json({ message: 'Category deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting the category' });
        }
    });

router.route('/:categoryId/child')
    /**
     * Endpoint para obtener todas las categorías hijas de una categoría padre especificada por su ID.
     * Endpoint to get all child categories of a parent category specified by its ID.
     * 
     * @route GET /:categoryId/child
     * @param {string} req.params.categoryId - El ID de la categoría padre. | The ID of the parent category.
     * @returns {Array} 200 - Un array de categorías hijas. | An array of child categories.
     * @returns {Error} 404 - Categorías hijas no encontradas. | Child categories not found.
     * @returns {Error} 500 - Error al obtener las categorías hijas. | Error when getting the child categories.
     */
    .get(async (req, res) => {
        try {
            const childCategories = await getChildCategories(req.params.categoryId);
            if (!childCategories) {
                return res.status(404).json({ message: 'Child categories not found' });
            }
            res.json(childCategories);
        } catch (error) {
            res.status(500).json({ message: 'Error getting the child categories' });
        }
    });

    
router.route('/all')
    /**
     * Endpoint para obtener todas las categorías.
     * Endpoint to get all categories.
     * 
     * @route POST /all
     * @returns {Array} 200 - Un array de todas las categorías. | An array of all categories.
     * @returns {Error} 500 - Error al obtener todas las categorías. | Error when getting all categories.
     */
    .post(async (req, res) => {
        try {
            const categories = await getAllCategories();
            res.json(categories);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching all categories' });
        }
    });

module.exports = router;