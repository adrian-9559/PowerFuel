import api from './axios.js';

const getBrandById = async (id) => {
    try {
        const response = await api.get(`/brands/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching brand:', error.message);
        throw error;
    }
};

const getAllBrands = async (page = 1, limit = 10) => {
    try {
        const response = await api.get(`/brands?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching brands:', error.message);
        throw error;
    }
};

const getAllBrandsNoPagination = async () => {
    try {
        const response = await api.get('/brands');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching brands:', error.message);
        throw error;
    }
};

const addBrand = async (brand) => {
    try {
        const response = await api.post('/brands', brand);
        return response.data;
    } catch (error) {
        console.error('Error adding brand:', error.message);
        throw error;
    }
};

const updateBrand = async (id, brand) => {
    try {
        const response = await api.put(`/brands/${id}`, brand);
        return response.data;
    } catch (error) {
        console.error('Error updating brand:', error.message);
        throw error;
    }
};

const deleteBrand = async (id) => {
    try {
        const response = await api.delete(`/brands/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting brand:', error.message);
        throw error;
    }
};

export { getBrandById, 
        getAllBrands, 
        addBrand, 
        updateBrand, 
        deleteBrand ,
        getAllBrandsNoPagination
};