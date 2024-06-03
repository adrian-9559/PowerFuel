const express = require('express');
const { getBrands, getBrandById, addBrand, updateBrandById, deleteBrandById } = require('./controller');

const router = express.Router();

router.route('/:brandId')
    /**
     * Endpoint para obtener una marca por su ID.
     * Endpoint to get a brand by its ID.
     * 
     * @route GET /:brandId
     * @param {number} req.params.brandId - El ID de la marca que se quiere obtener. | The ID of the brand to be obtained.
     * @returns {Object} 200 - El objeto de la marca obtenida. | The obtained brand object.
     * @returns {Error} 500 - Error al obtener la marca. | Error when getting the brand.
     */
    .get(async (req, res) => {
        try {
            const brandId = req.params.brandId;
            const brand = await getBrandById(brandId);
            res.status(200).json({brand});
        } catch (error) {
            res.status(500).send({message: 'Error get brands by id'});
        }
    })
    /**
     * Endpoint para actualizar una marca por su ID.
     * Endpoint to update a brand by its ID.
     * 
     * @route PUT /:brandId
     * @param {number} req.params.brandId - El ID de la marca que se quiere actualizar. | The ID of the brand to be updated.
     * @param {Object} req.body - El objeto con los datos actualizados de la marca. | The object with the updated brand data.
     * @returns {Object} 200 - Mensaje de éxito. | Success message.
     * @returns {Error} 500 - Error al actualizar la marca. | Error when updating the brand.
     */
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
    /**
     * Endpoint para eliminar una marca por su ID.
     * Endpoint to delete a brand by its ID.
     * 
     * @route DELETE /:brandId
     * @param {number} req.params.brandId - El ID de la marca que se quiere eliminar. | The ID of the brand to be deleted.
     * @returns {Object} 200 - Mensaje de éxito. | Success message.
     * @returns {Error} 500 - Error al eliminar la marca. | Error when deleting the brand.
     */
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
    /**
     * Endpoint para obtener todas las marcas con paginación.
     * Endpoint to get all brands with pagination.
     * 
     * @route GET /
     * @param {number} req.query.page - La página que se quiere obtener. | The page to be obtained.
     * @param {number} req.query.limit - El número de marcas por página. | The number of brands per page.
     * @returns {Array} 200 - Un array de marcas. | An array of brands.
     * @returns {Error} 500 - Error al obtener las marcas. | Error when getting the brands.
     */
    .get(async (req, res) => {
        try {
            const page = parseInt(req.query.page) || null; 
            const limit = parseInt(req.query.limit) || null;
            const data = await getBrands(page, limit);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).send({message: 'Error get brands by id'});
        }
    })
    /**
     * Endpoint para añadir una nueva marca.
     * Endpoint to add a new brand.
     * 
     * @route POST /
     * @param {Object} req.body - El objeto con los datos de la nueva marca. | The object with the new brand data.
     * @returns {Object} 200 - El objeto de la nueva marca añadida. | The object of the added new brand.
     * @returns {Error} 500 - Error al añadir la marca. | Error when adding the brand.
     */
    .post(async (req, res) => {
        try{
            const newBrand = req.body;
            const brand_id = await addBrand(newBrand);
            res.status(200).json({ brand_id: brandId, ...newBrand });
        } catch (error) {
            res.status(500).send({message: 'Error eliminar product images'});
        }
    });

module.exports = router;