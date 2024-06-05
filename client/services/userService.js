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

    async generalPanelInfo(){
        const response = await api.post(`/users/generalPanelInfo`);
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
        const response = await api.post(`/users/info`);
        return response.data;
    }

    async getUserByRegisterWeek(startDate, endDate) {
        const response = await api.post(`/users/usersByRegistrationDate`, { startDate, endDate });
        return response.data;
    }

    async setUserImage(images) {
        try {

            if(!images) return;

            const formData = new FormData();
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }
    
            const response = await api.post(`/files/uploadUser`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
    
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async getPasswordResetCode(email) {
        const response = await api.post(`/users/resetPasswordCode`, {
            email: email,
        });
        return response.data
    }
    
    async verifyPasswordResetCode(email, code) {
        return api.post(`/users/verifyPasswordResetCode`, {
            email: email,
            code: code,
        });
    }

    async resetPassword(email, code, newPassword, confirmPassword) {
        const response = await api.post(`/users/resetPassword`, {
            email: email,
            code: code,
            currentPassword: currentPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        });
        return response.data;
    }
}

const userService = new UserService();
export default userService;
