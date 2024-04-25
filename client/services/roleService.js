import api from './axios';

class RoleService{

    async getRoleById(roleId) {
        const response = await api.get(`/roles/${roleId}`);
        return response.data;
    }

    async getUserRole(token) {
        if (token) {
            const response = await api.post(`/roles/userRole`, {}, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            return response.data.role_id;
        }

        return null;
    }

    async deleteRole(roleId) {
        const response = await api.delete(`/roles/${roleId}`);
        return response.data;
    }

    async getAllRoles(page = 1, limit = 10) {
        const response = await api.get(`/roles?page=${page}&limit=${limit}`);
        return response.data;
    }

    async updateRole(id, roleName) {
        const response = await api.put(`/roles/${id}`, {
            name: roleName,
        });
        return response.data;
    }

    async addRole(roleName) {
        const response = await api.post(`/roles`, {
            name: roleName,
        });
        return response.data;
    }
}

export default RoleService;