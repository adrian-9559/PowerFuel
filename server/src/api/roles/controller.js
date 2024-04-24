const model = require('../../model/roleModel');

const getRoles = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let roles = await model.getRoles(skip, limit);
    const total = await model.getRolesCount();

    roles =  roles.map(role => ({
        "id": role.role_id,
        "role_id": { display: "ID de Rol", value: role.role_id },
        "role_name": { display: "Nombre de Rol", value: role.role_name },
    }));

    res.json({
        total,
        pages: Math.ceil(total / limit),
        data: roles
    });
};

const getRoleById = async (req, res) => {
    const { roleId } = req.params;
    try {
        const role = await model.getRoles(null, null, roleId);
        res.json(role);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getRoleByUserId = async (req, res) => {
    const userId = req.user.userId;
    try {
        const role = await model.getRoleByUserId(userId);

        res.json(role);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const addRole = async (req, res) => {
    const newRole = req.body;
    try {
        const roleId = await model.insertRole(newRole);
        res.json({ role_id: roleId, ...newRole });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateRoleById = async (req, res) => {
    const { roleId } = req.params;
    const updatedRole = req.body;
    try {
        await updateRole(roleId, updatedRole);
        res.json({ role_id: roleId, ...updatedRole });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteRoleById = async (req, res) => {
    const { roleId } = req.params;
    try {
        await deleteRole(roleId);
        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { getRoles, getRoleById, getRoleByUserId, addRole, updateRoleById, deleteRoleById };