// UserService.js
import BaseService from './BaseService';

class UserService extends BaseService {
    constructor() {
        super('users');
    }

    async loginUser(email, password) {
        const response = await this.api.post(`/${this.resource}/login`, {
            email: email,
            current_password: password,
        });


        if (response.status === 401) {
            throw new Error('Incorrect credentials');
        }
        return response.data.token;
    }

    async registerUser(email, password, firstName, lastName, dni, roleId) {
        const response = await this.create({
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
        return this.update(id, {
            email: email,
            current_password: password,
            first_name: firstName,
            last_name: lastName,
            dni: dni,
            role_id: roleId,
        });
    }

    async addUser(email, password, firstName, lastName, dni, roleId) {
        return this.create({
            email: email,
            current_password: password,
            first_name: firstName,
            last_name: lastName,
            dni: dni,
            role_id: roleId,
        });
    }

    async getUserInfo(token) {
        if (token) {
            const response = await this.api.post(`/${this.resource}/info`, {}, 
            {
                headers: { 
                    authorization: `Bearer ${token}`
                } 
            });

            return response.data[0];
        }


        return null;
    }

    async getAllUsersInfo(page = 1, limit = 10) {
        return this.getAll(page, limit);
    }

    async deleteUser(id) {
        return this.delete(id);
    }

    async getUserById(id) {
        return this.getById(id);
    }
}

export default new UserService();