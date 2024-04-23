import api from './axios.js';

const getCategoryById = async (id) => {
    try {
        const response = await api.get(`/categories/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching category:', error.message);
        throw error;
    }
};

const getAllCategories = async (page = 1, limit = 10) => {
    try {
        const response = await api.get(`/categories?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        throw error;
    }
};

const addCategory = async (category) => {
    try {
        const response = await api.post('/categories', category);
        return response.data;
    } catch (error) {
        console.error('Error adding category:', error.message);
        throw error;
    }
};

const updateCategory = async (id, category) => {
    try {
        const response = await api.put(`/categories/${id}`, category);
        return response.data;
    } catch (error) {
        console.error('Error updating category:', error.message);
        throw error;
    }
};

const deleteCategory = async (id) => {
    try {
        const response = await api.delete(`/categories/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting category:', error.message);
        throw error;
    }
};

const getParentCategories = async () => {
    try {
        const response = await api.get('/categories/parent');
        return response.data.categories;
    } catch (error) {
        console.error('Error fetching parent categories:', error.message);
        throw error;
    }
};

const getChildCategories = async (categoryId) => {
    try {
        const response = await api.get(`/categories/${categoryId}/child`);
        if (!response.data.categories) {
            return [];
        }
        return response.data.categories;
    } catch (error) {
        console.error('Error fetching child categories:', error.message);
        throw error;
    }
};

export { getCategoryById, 
        getAllCategories, 
        addCategory, 
        updateCategory, 
        deleteCategory, 
        getParentCategories, 
        getChildCategories};