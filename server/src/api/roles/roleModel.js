
const { Role, UserRoles } = require('../../model/model');

class model {
    insertRole = async (role) => {
        try {
            const newRole = await Role.create({
                role_name: role.role_name
            });
            return newRole.role_id;
        } catch (error) {
            throw error;
        }
    };
    
    updateRole = async (roleId, role) => {
        try {
            await Role.update({
                role_name: role.role_name
            }, {
                where: {
                    role_id: roleId
                }
            });
        } catch (error) {
            throw error;
        }
    };
    
    deleteRole = async (roleId) => {
        try {
            await Role.destroy({
                where: {
                    role_id: roleId
                }
            });
        } catch (error) {
            throw error;
        }
    };
    
    getRoles = async (id, skip = 0, limit = 10 ) => {
        let roles;
        if (id) {
            roles = [await Role.findByPk(id)];
        } else {
            roles = await Role.findAll({
                offset: skip,
                limit: limit,
            });
        }
    
        return roles;
    };
    
    getRolesCount = async () => {
        try {
            const count = await Role.count();
            return count;
        } catch (error) {
            throw error;
        }
    };
    
    getRoleByUserId = async (userId) => {
        try {
            const userRole = await UserRoles.findOne({
                where: {
                    user_id: userId
                },
                include: Role
            });
            if(!userRole) return null;
            
            return userRole.Role;
        } catch (error) {
            console.error(error);
            return null;
        }
    };
}

module.exports = new model();
