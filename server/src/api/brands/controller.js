const model = require('./model');

const handleInternalServerError = (res, error) => {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
};

const getBrands = async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : null;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    const skip = page && limit ? (page - 1) * limit : null;

    try {
        let brands = await model.getBrands(skip, limit);
        const total = await model.getBrandsCount();

        if(page!==null && limit!==null && brands.length === 0) 
            brands = brands.map(brand => {
                return {
                    "id": brand.id_brand,
                    "brand_id": { display: "ID de la marca", value: brand.id_brand },
                    "brand_name": { display: "Nombre de la marca", value: brand.brand_name }
                };
            });

        res.json({
            total,
            pages: limit ? Math.ceil(total / limit) : 1,
            data: brands
        });
    } catch (error) {
        handleInternalServerError(res, error);
    }
};

const getBrandById = async (req, res) => {
    const { brandId } = req.params;
    try {
        const brand = await model.getBrands(null, null , brandId);
        res.json({brand});
    } catch (error) {
        handleInternalServerError(res, error);
    }
};

const addBrand = async (req, res) => {
    const newBrand = req.body;
    try {
        const brandId = await model.insertBrand(newBrand);
        res.json({ brand_id: brandId, ...newBrand });
    } catch (error) {
        handleInternalServerError(res, error);
    }
};

const updateBrandById = async (req, res) => {
    const { brandId } = req.params;
    const updatedBrand = req.body;
    try {
        await model.updateBrand(brandId, updatedBrand);
        res.json({ brand_id: brandId, ...updatedBrand });
    } catch (error) {
        handleInternalServerError(res, error);
    }
};

const deleteBrandById = async (req, res) => {
    const { brandId } = req.params;
    try {
        await model.deleteBrand(brandId);
        res.status(200).json({ message: 'Brand deleted successfully' });
    } catch (error) {
        handleInternalServerError(res, error);
    }
};

module.exports = {
    getBrands,
    getBrandById,
    addBrand,
    updateBrandById,
    deleteBrandById
};