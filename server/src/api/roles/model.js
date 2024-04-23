const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database');

class Role extends Model {}
Role.init({
    role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role_name: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
    timestamps: false
});

class UserRoles extends Model {}
UserRoles.init({
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        defaultValue: 10
    },
}, {
    sequelize,
    modelName: 'UserRole',
    tableName: 'user_roles',
    timestamps: false
});
Role.UserRole = Role.hasMany(UserRoles, { foreignKey: 'role_id' });
UserRoles.Role = UserRoles.belongsTo(Role, { foreignKey: 'role_id' });

const insertRole = async (role) => {
    try {
        const newRole = await Role.create({
            role_name: role.role_name
        });
        return newRole.role_id;
    } catch (error) {
        throw error;
    }
};

const updateRole = async (roleId, role) => {
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

const deleteRole = async (roleId) => {
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

const getRoles = async (skip = 0, limit = 10, id) => {
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

const getRolesCount = async () => {
    try {
        const count = await Role.count();
        return count;
    } catch (error) {
        throw error;
    }
};

const getRoleByUserId = async (userId) => {
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

module.exports = {
    insertRole,
    updateRole,
    deleteRole,
    getRoles,
    getRoleByUserId,
    deleteRole,
    Role,
    UserRoles,
    getRolesCount
};
