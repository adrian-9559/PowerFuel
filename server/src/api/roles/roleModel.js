const { Role, UserRoles } = require('../../model');
const errorDisplay = "(Error en el modelo de Role)";

class model {
    insertRole = async (role) => {
        try {
            const newRole = await Role.create({
                role_name: role.role_name
            });
            return newRole.role_id;
        } catch (error) {
            throw new Error(`Error al insertar el rol ${errorDisplay}`, error);
        }
    };
    
    updateRole = async (roleId, role) => {
        try {
            return await Role.update({
                role_name: role.role_name
            }, {
                where: {
                    role_id: roleId
                }
            });
        } catch (error) {
            throw new Error(`Error al actualizar el rol ${errorDisplay}`, error);
        }
    };
    
    deleteRole = async (roleId) => {
        try {
            return await Role.destroy({
                where: {
                    role_id: roleId
                }
            });
        } catch (error) {
            throw new Error(`Error al eliminar el rol ${errorDisplay}`, error);
        }
    };
    
    getRoles = async (id, skip = 0, limit = 10 ) => {
        try {
            if (id) {
                return [await Role.findByPk(id)];
            } else {
                return await Role.findAll({
                    offset: skip,
                    limit: limit
                });
            }
        } catch (error) {
            throw new Error(`Error al obtener los roles ${errorDisplay}`, error);
        }
    };
    
    getRolesCount = async () => {
        try {
            return await Role.count();
        } catch (error) {
            throw new Error(`Error al obtener el conteo de roles ${errorDisplay}`, error);
        }
    };
    
    getRoleByUserId = async (userId) => {
        try {
            return await UserRoles.findOne({
                where: {
                    user_id: userId
                },
                include: Role
            });
        } catch (error) {
            throw new Error(`Error al obtener el rol por ID de usuario ${errorDisplay}`, error);
        }
    };
}

module.exports = new model();
