const model = require('./roleModel');

const getRoleById = async (roleId) => {
    let role = await model.getRoles(roleId);
    role =  role.map(role => ({
        "role_id": role.role_id ,
        "role_name": role.role_name ,
    }));

    return role[0];
};

const getRoles = async (limit, page) => {
    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);
    const skip = (parsedPage - 1) * parsedLimit;

    let roles = await model.getRoles(null, skip, parsedLimit);
    
    const total = await model.getRolesCount();


    roles =  roles.map(role => ({
        "role_id": role.role_id ,
        "role_name": role.role_name ,
    }));

    return {
        total,
        pages: Math.ceil(total / limit),
        roles
    };
};

const addRole = async (role) => {
    console.log('role', role);
    return await model.insertRole(role);
};

const updateRoleById = async (roleId, role) => {
    return await model.updateRole(roleId, role);
};

const deleteRoleById = async (roleId) => {
    return await model.deleteRole(roleId);
};

const getRoleByUserId = async (userId) => {
    const role = await model.getRoleByUserId(userId);
    return role;
};

module.exports = { getRoles, getRoleById, addRole, updateRoleById, deleteRoleById, getRoleByUserId };