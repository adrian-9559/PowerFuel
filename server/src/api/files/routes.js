const express = require('express');
const { upload, deleteImages } = require('./controller'); // replace 'yourFilePath' with the actual path to your file

const router = express.Router();

router.route('/upload/:id')
        .post(upload)
        .delete(deleteImages);

module.exports = router;