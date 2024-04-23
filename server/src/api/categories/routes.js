const express = require('express');
const router = express.Router();
const { getCategories, getCategoryById, addCategory, updateCategoryById, deleteCategoryById, getParentCategories, getChildCategories } = require('./controller');

router.get('/parent', getParentCategories);
router.get('/:categoryId/child', getChildCategories);

router.route('/:categoryId')
    .get(getCategoryById)
    .put(updateCategoryById)
    .delete(deleteCategoryById);

router.route('/')
    .get(getCategories)
    .post(addCategory);

module.exports = router;
