const { Brand } = require('../../model');
const errorDisplay = "(Error en el modelo de Brands)";

class model {
    async insertBrand(brand) {
        try {
            return {id_brand} = await Brand.create({
                brand_name: brand.brand_name
            });
        } catch (error) {
            throw new Error(`Error al intentar insertar la marca ${errorDisplay}`, error);
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
            throw new Error(`Error al intentar actualizar la marca ${errorDisplay}`, error);
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

            return await Brand.findAll(query);
        } catch (error) {
            throw new Error(`Error al intentar obtener las marcas ${errorDisplay}`, error);
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
            throw new Error(`Error al intentar eliminar la marca ${errorDisplay}`, error);
        }
    }
    
    async getBrandsCount() {
        try {
            return await Brand.count();
        } catch (error) {
            throw new Error(`Error al intentar obtener el conteo de marcas ${errorDisplay}`, error);
        }
    }
}

module.exports = new model();