
const { Role, UserRoles } = require('../../model');

class model {
    insertRole = async (role) => {
        const newRole = await Role.create({
            role_name: role.role_name
        });
        return newRole.role_id;
    };
    
    updateRole = async (roleId, role) => {
        return await Role.update({
            role_name: role.role_name
        }, {
            where: {
                role_id: roleId
            }
        });


    };
    
    deleteRole = async (roleId) => {
        return await Role.destroy({
            where: {
                role_id: roleId
            }
        });
    };
    
    getRoles = async (id, skip = 0, limit = 10 ) => {
        if (id) {
           return [await Role.findByPk(id)];
        } else {
            return await Role.findAll({
                offset: skip,
                limit: limit,
            });
        }
    };
    
    getRolesCount = async () => {
        return await Role.count();
    };
    
    getRoleByUserId = async (userId) => {
        return await UserRoles.findOne({
            where: {
                user_id: userId
            },
            include: Role
        });
    };
}

module.exports = new model();
