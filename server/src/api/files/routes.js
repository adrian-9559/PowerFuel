const express = require('express');
const { uploadProduct, deleteProductImages, uploadUser } = require('./controller');

const router = express.Router();

router.route('/uploadProduct/:id')
    .post(async (req, res) => {
        try {
            const { id } = req.params;
            const { images } = req.files;
            await uploadProduct(id, images);
            res.send({message: 'Files uploaded successfully'});
        } catch (error) {
            res.status(500).send({message: 'Error uploading product images'});
        }
    });

router.route('/deleteProduct/:id/:image')
    .post(async (req, res) => {
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