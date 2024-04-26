import api from "./axios";

class BrandService{
    async getBrandById(id) {
        const response = await api.get(`/brands/${id}`);
        return response.data.data;
    }

    async getAllBrands(page = 1, limit = 10) {
        const response = await api.get(`/brands?page=${page}&limit=${limit}`);
        return response.data.data;
    }

    async getAllBrandsNoPagination() {
        const response = await api.get(`/brands`);
        return response.data.data;
    }

    async addBrand(brand) {
        const response = await api.post(`/brands`, brand);
        return response.data.data;
    }

    async updateBrand(id, brand) {
        const response = await api.put(`/brands/${id}`, brand);
        return response.data.data;
    }

    async deleteBrand(id) {
        const response = await api.delete(`/brands/${id}`);
        return response.data.data;
    }
}

export default new BrandService();