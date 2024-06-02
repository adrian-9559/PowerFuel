const model = require('./brandModel');
const errorDisplay = "(Error en el controlador de Brands)";

const getBrands = async (page = 1, limit = 10) => {
    try {
        const skip = page && limit ? (page - 1) * limit : null;
        let brands = await model.getBrands(skip, limit);
        const total = await model.getBrandsCount();

        return {
            total,
            pages: Math.ceil(total / limit),
            brands
        };
    } catch (error) {
        throw new Error(`Error al obtener las marcas ${errorDisplay}`);
    }
};

const getBrandById = async (brandId) => {
    try {
        return await model.getBrands(null, null , brandId);
    } catch (error) {
        throw new Error(`Error al obtener la marca por ID ${errorDisplay}`);
    }
};

const addBrand = async (newBrand) => {
    try {
        return await model.insertBrand(newBrand);
    } catch (error) {
        throw new Error(`Error al añadir la marca ${errorDisplay}`);
    }
};

const updateBrandById = async (brandId, updatedBrand) => {
    try {
        return await model.updateBrand(brandId, updatedBrand);
    } catch (error) {
        throw new Error(`Error al actualizar la marca por ID ${errorDisplay}`);
    }
};

const deleteBrandById = async (brandId) => {
    try {
        await model.deleteBrand(brandId);
    } catch (error) {
        throw new Error(`Error al eliminar la marca por ID ${errorDisplay}`);
    }
};

module.exports = {
    getBrands,
    getBrandById,
    addBrand,
    updateBrandById,
    deleteBrandById
};