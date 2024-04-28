import api from './axios';

class AddressService{
    async getAddressById(id) {
        const response = await api.get(`/address/${id}`);
        return response.data;
    }

    async getAllAddresses(page = 1, limit = 10) {
        const response = await api.get(`/address?page=${page}&limit=${limit}`);
        return response.data;
    }

    async getAddressByUserId(userId=null) {

        const response = await api.get(`/address/user/${userId}`);
        return response.data;
    }

    async addAddress(address) {
        const token = sessionStorage.getItem('token');
        const response = await api.post(`/address`, address, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }

    async updateAddress(id, address) {
        const response = await api.put(`/address/${id}`, address);
        return response.data;
    }

    async deleteAddress(id) {
        const response = await api.delete(`/address/${id}`);
        return response.data;
    }
}

export default new AddressService();