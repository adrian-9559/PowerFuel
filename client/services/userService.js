import api from './axios';

class UserService {
    async loginUser(email, password) {
        const response = await api.post(`/users/login`, {
            email: email,
            password: password,
        });
        localStorage.setItem('auth_token', response.data.auth_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        return response.data;
    }

    async registerUser(user) {
        const response = await api.post(`/users`, { user });
        return response.data;
    }

    async updateUser(user) {
        return api.put(`/users/${user.user_id}`, { user });
    }

    async getAllUsersInfo(page = 1, limit = 10) {
        const response = await api.get(`/users?page=${page}&limit=${limit}`);
        return response.data;
    }

    async deleteUser(id) {
        return await api.delete(`/users/${id}`);
    }

    async getUserById(id) {
        return await api.get(`/users/${id}`);
    }

    async getUserInfo() {
        return await api.post(`/users/info`);
    }

    async getUserByRegisterWeek(startDate, endDate) {
        const response = await api.post(`/users/usersByRegistrationDate`, { startDate, endDate });
        return response.data;
    }

    async setUserImage(image) {
        const formData = new FormData();
        formData.append('images', image);
        const response = await api.post(`/files/uploadUser`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    }
}

const userService = new UserService();
export default userService;
