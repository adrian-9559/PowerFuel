const express = require('express');
const { getBrands, getBrandById, addBrand, updateBrandById, deleteBrandById } = require('./controller');

const router = express.Router();

router.route('/:brandId')
    .get(async (req, res) => {
        try {
            const brandId = req.params.brandId;
            const brand = await getBrandById(brandId);
            res.json({brand});
        } catch (error) {
            res.status(500).send({message: 'Error get brands by id'});
        }
    })
    .put(async (req, res) => {
        try{
            const brandId = req.params.brandId;
            const updatedBrand = req.body;
            await updateBrandById(brandId, updatedBrand);
            res.status(200).json({message: 'Marca actualizada correctamente'});
        } catch (error) {
            res.status(500).send({message: 'Error uploading product images'});
        }
    })
    .delete(async (req, res) => {
        try{
            const brandId = req.params.brandId;
            await deleteBrandById(brandId);
            res.status(200).json({message: 'Marca eliminada correctamente'});
        } catch (error) {
            res.status(500).send({message: 'Error eliminar product images'});
        }
    });

router.route('/')
    .get(async (req, res) => {
        try {
            const page = parseInt(req.query.page) || null; 
            const limit = parseInt(req.query.limit) || null;
            const data = await getBrands(page, limit);
            console.log(data);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).send({message: 'Error get brands by id'});
        }
    })
    .post(async (req, res) => {
        try{
            const newBrand = req.body;
            const brand_id = await addBrand(newBrand);
            res.json({ brand_id: brandId, ...newBrand });
        } catch (error) {
            res.status(500).send({message: 'Error eliminar product images'});
        }
    });

module.exports = router;