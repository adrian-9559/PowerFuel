const express = require('express');
const { uploadProduct, deleteProductImages, uploadUser } = require('./controller');

const router = express.Router();

router.route('/uploadProduct/:id')
    .post(async (req, res) => {
        const { id } = req.params;
        await uploadProduct(id)
    });

router.route('/deleteProduct/:id/:image')
    .post(async (req, res) => {
        console
        const { id } = req.params;
        const { image } = req.params;
        await deleteProductImages(id, image)
    });

router.route('/uploadUser')
    .post(async (req, res) => {
        const { userId } = req.user;
        const { images } = req.body;
        await uploadUser(userId.toString(), images)
    });

module.exports = router;