const { Brand } = require('../../model');

class model {
    async insertBrand(brand) {
        return {id_brand} = await Brand.create({
                brand_name: brand.brand_name
        });
    }

    async updateBrand(brandId, brand) {
        await Brand.update({
            brand_name: brand.brand_name
        }, {
            where: {
                id_brand: brandId
            }
        });
    }

    async getBrands(skip, limit, brandId) {
            const query = {
                where: brandId ? {id_brand: brandId} : {},
            };

            if (typeof skip !== 'undefined') {
                query.offset = skip;
            }

            if (typeof limit !== 'undefined') {
                query.limit = limit;
            }

            return await Brand.findAll(query);
    }

    async deleteBrand(brandId) {
        await Brand.destroy({
            where: {
                id_brand: brandId
            }
        });
    }

    async getBrandsCount() {
        return await Brand.count();
    }
}

module.exports = new model();