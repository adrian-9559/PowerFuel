const express = require('express');
const router = express.Router();
const { getCategories, getCategoryById, addCategory, updateCategoryById, deleteCategoryById, getParentCategories, getChildCategories } = require('./controller');

router.route('/')
    .get(async (req, res) => {
        try {
            const categories = await getCategories(req.query.page, req.query.limit);
            res.json(categories);
        } catch (error) {
            console.error('Error getting the categories:', error);
            res.status(500).json({ message: 'Error getting the categories' });
        }
    })
    .post(async (req, res) => {
        try {
            const category = await addCategory(req.body);
            res.json(category);
        } catch (error) {
            console.error('Error adding the category:', error);
            res.status(500).json({ message: 'Error adding the category' });
        }
    });

router.route('/parent')
    .get(async (req, res) => {
        try {
            const parentCategories = await getParentCategories();
            res.json(parentCategories);
        } catch (error) {
            console.error('Error getting the parent categories:', error);
            res.status(500).json({ message: 'Error getting the parent categories' });
        }
    });

router.route('/:categoryId')
    .get(async (req, res) => {
        try {
            const category = await getCategoryById(req.params.categoryId);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.json(category);
        } catch (error) {
            console.error('Error getting the category:', error);
            res.status(500).json({ message: 'Error getting the category' });
        }
    })
    .put(async (req, res) => {
        try {
            const category = await updateCategoryById(req.params.categoryId, req.body);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.json({ message: 'Category modified successfully' });
        } catch (error) {
            console.error('Error modifying the category:', error);
            res.status(500).json({ message: 'Error modifying the category' });
        }
    })
    .delete(async (req, res) => {
        try {
            const deletedCategory = await deleteCategoryById(req.params.categoryId);
            if (!deletedCategory) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.json({ message: 'Category deleted successfully' });
        } catch (error) {
            console.error('Error deleting the category:', error);
            res.status(500).json({ message: 'Error deleting the category' });
        }
    });

router.route('/:categoryId/child')
    .get(async (req, res) => {
        try {
            const childCategories = await getChildCategories(req.params.categoryId);
            if (!childCategories) {
                return res.status(404).json({ message: 'Child categories not found' });
            }
            res.json({childCategories});
        } catch (error) {
            console.error('Error getting the child categories:', error);
            res.status(500).json({ message: 'Error getting the child categories' });
        }
    });

module.exports = router;