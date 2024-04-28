import api from './axios';

// UserService.js

class UserService {
    async loginUser(email, password) {
        const response = await api.post(`/users/login`, {
            email: email,
            current_password: password,
        });
        return response.data.token;
    }

    async registerUser(email, password, firstName, lastName, dni, roleId) {
        const response = await api.post(`/users`, {
            email: email,
            current_password: password,
            first_name: firstName,
            last_name: lastName,
            dni: dni,
            role_id: roleId,
        });

        if (!response.data) {
            console.error('Error registering user:', response.status);
            throw new Error('Error al registrar el usuario');
        }

        return response.data;
    }

    async updateUser(id, email, password, firstName, lastName, dni, roleId) {
        return api.put(`/users/${id}`, {
            email: email,
            current_password: password,
            first_name: firstName,
            last_name: lastName,
            dni: dni,
            role_id: roleId,
        });
    }

    async addUser(email, password, firstName, lastName, dni, roleId) {
        return api.post(`/users`, {
            email: email,
            current_password: password,
            first_name: firstName,
            last_name: lastName,
            dni: dni,
            role_id: roleId,
        });
    }

    async getUserInfo() {
        const response = await api.post(`/users/info`);

        return response.data[0];
    }

    async getAllUsersInfo(page = 1, limit = 10) {
        return api.get(`/users?page=${page}&limit=${limit}`);
    }

    async deleteUser(id) {
        return api.delete(`/users/${id}`);
    }

    async getUserById(id) {
        return api.get(`/users/${id}`);
    }
}

export default new UserService();
