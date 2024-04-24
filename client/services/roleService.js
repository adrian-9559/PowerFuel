import BaseService from './BaseService';

class RoleService extends BaseService {
    constructor() {
        super('roles');
    }

    async getRoleById(roleId) {
        return this.getById(roleId);
    }

    async getUserRole(token) {
        if (token) {
            const response = await this.api.post(`/${this.resource}/userRole`, {}, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            return response.data.role_id;
        }

        return null;
    }

    async deleteRole(roleId) {
        return this.delete(roleId);
    }

    async getAllRoles(page = 1, limit = 10) {
        return this.getAll(page, limit);
    }

    async updateRole(id, roleName) {
        return this.update(id, {
            name: roleName,
        });
    }

    async addRole(roleName) {
        return this.create({
            name: roleName,
        });
    }
}

export default new RoleService();