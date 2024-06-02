const model = require('./roleModel');
const errorDisplay = "(Error en el controlador de Roles)";

const getRoleById = async (roleId) => {
    try {
        let role = await model.getRoles(roleId);
        role =  role.map(role => ({
            "role_id": role.role_id ,
            "role_name": role.role_name ,
        }));

        return role[0];
    } catch (error) {
        throw new Error(`Error al intentar obtener el rol por ID ${errorDisplay}`, error);
    }
};

const getRoles = async (limit, page) => {
    try {
        const parsedLimit = parseInt(limit);
        const parsedPage = parseInt(page);
        const skip = (parsedPage - 1) * parsedLimit;

        let roles = await model.getRoles(null, skip, parsedLimit);
        
        const total = await model.getRolesCount();

        return {
            total,
            pages: Math.ceil(total / limit),
            roles
        };
    } catch (error) {
        throw new Error(`Error al intentar obtener los roles ${errorDisplay}`, error);
    }
};

const addRole = async (role) => {
    try {
        console.log('role', role);
        return await model.insertRole(role);
    } catch (error) {
        throw new Error(`Error al intentar añadir el rol ${errorDisplay}`, error);
    }
};

const updateRoleById = async (roleId, role) => {
    try {
        return await model.updateRole(roleId, role);
    } catch (error) {
        throw new Error(`Error al intentar actualizar el rol ${errorDisplay}`, error);
    }
};

const deleteRoleById = async (roleId) => {
    try {
        return await model.deleteRole(roleId);
    } catch (error) {
        throw new Error(`Error al intentar eliminar el rol ${errorDisplay}`, error);
    }
};

const getRoleByUserId = async (userId) => {
    try {
        return await model.getRoleByUserId(userId);
    } catch (error) {
        throw new Error(`Error al intentar obtener el rol por ID de usuario ${errorDisplay}`, error);
    }
};

module.exports = { getRoles, getRoleById, addRole, updateRoleById, deleteRoleById, getRoleByUserId };