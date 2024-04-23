const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database');
class Brand extends Model {}
Brand.init({
    id_brand: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    brand_name: {
        type: DataTypes.STRING,
        unique: true
    }
},{
    sequelize,
    modelName: 'Brand',
    tableName: 'brands',
    timestamps: false
});

const insertBrand = async (brand) => {
    try {
        const newBrand = await Brand.create({
            brand_name: brand.brand_name
        });
        return newBrand.id_brand; 
    } catch (error) {
        console.error(error);
        throw new Error('Error adding brand');
    }
};

const updateBrand = async (brandId, brand) => {
    try {
        await Brand.update({
            brand_name: brand.brand_name
        }, {
            where: {
                id_brand: brandId
            }
        });
    } catch (error) {
        console.error(error);
        throw new Error('Error updating brand');
    }
};

const getBrands = async (skip, limit, brandId) => {
    try {
        const query = {
            where: brandId ? {id_brand: brandId} : {},
        };

        if (typeof skip !== 'undefined') {
            query.offset = skip;
        }

        if (typeof limit !== 'undefined') {
            query.limit = limit;
        }

        const brands = await Brand.findAll(query);
        return brands;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting brands');
    }
};

const deleteBrand = async (brandId) => {
    try {
        await Brand.destroy({
            where: {
                id_brand: brandId
            }
        });
    } catch (error) {
        console.error(error);
        throw new Error('Error deleting brand');
    }
};

const getBrandsCount = async () => {
    try {
        const count = await Brand.count();
        return count;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting brands count');
    }
};

module.exports = {
    Brand,
    getBrands,
    insertBrand,
    updateBrand,
    deleteBrand,
    getBrandsCount
};