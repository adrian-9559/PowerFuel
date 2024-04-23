import api from './axios.js';

const getAddressById = async (id) => {
    try {
        const response = await api.get(`/address/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching address:', error.message);
        throw error;
    }
};

const getAllAddresses = async (page = 1, limit = 10) => {
    try {
        const response = await api.get(`/address?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching addresses:', error.message);
        throw error;
    }
};

const getAddressByUserId = async (userId) => {
    try {
        const response = await api.get(`/address/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching addresses:', error.message);
        throw error;
    }
}

const addAddress = async (address) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await api.post('/address', address, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding address:', error.message);
        throw error;
    }
};

const updateAddress = async (id, address) => {
    try {
        const response = await api.put(`/address/${id}`, address);
        return response.data;
    } catch (error) {
        console.error('Error updating address:', error.message);
        throw error;
    }
};

const deleteAddress = async (id) => {
    try {
        const response = await api.delete(`/address/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting address:', error.message);
        throw error;
    }
};

export { 
    getAddressById, 
    getAllAddresses,
    getAddressByUserId,
    addAddress, 
    updateAddress, 
    deleteAddress 
};