import api from './axios';

class BaseService {

    constructor(resource) {

        this.resource = resource;
        this.api = api;
    }

    async getById(id) {
        const response = await api.get(`/${this.resource}/${id}`);
        return response.data;
    }

    async getAll(page = 1, limit = 10) {
        const response = await api.get(`/${this.resource}?page=${page}&limit=${limit}`);
        return response.data;
    }

    async create(item) {
        const response = await api.post(`/${this.resource}`, item);
        return response.data;
    }

    async update(id, item) {
        const response = await api.put(`/${this.resource}/${id}`, item);
        return response.data;
    }

    async delete(id) {
        const response = await api.delete(`/${this.resource}/${id}`);
        return response.data;
    }
}

export default BaseService;