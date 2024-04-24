const { Brand } = require('./model');

class model {
    async insertBrand(brand) {
        try {
            const newBrand = await Brand.create({
                brand_name: brand.brand_name
            });
            return newBrand.id_brand; 
        } catch (error) {
            console.error(error);
            throw new Error('Error adding brand');
        }
    }

    async updateBrand(brandId, brand) {
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
    }

    async getBrands(skip, limit, brandId) {
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
    }

    async deleteBrand(brandId) {
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
    }

    async getBrandsCount() {
        try {
            const count = await Brand.count();
            return count;
        } catch (error) {
            console.error(error);
            throw new Error('Error getting brands count');
        }
    }
}

module.exports = new model();