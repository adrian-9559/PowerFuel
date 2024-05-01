const express = require('express');
const { uploadProduct, deleteImages, uploadUser } = require('./controller'); // replace 'yourFilePath' with the actual path to your file

const router = express.Router();

router.route('/upload/:id')
        .delete(deleteImages);

router.route('/uploadProduct/:id')
        .post(uploadProduct)

router.route('/uploadUser')
        .post(uploadUser)
        
module.exports = router;