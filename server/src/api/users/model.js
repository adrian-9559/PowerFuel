const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database');
const { Role, UserRoles } = require('../roles/model');

class UserCredentials extends Model { }
class OldPasswords extends Model { }
class UserInfo extends Model { }

UserCredentials.init({
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    current_password: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'UserCredentials',
    tableName: 'user_credentials',
    timestamps: false
});

OldPasswords.init({
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model:
                UserCredentials, key: 'user_id'
        }
    },
    previous_password: DataTypes.STRING,
    change_date: DataTypes.DATE
}, {
    sequelize,
    modelName: 'OldPasswords',
    tableName: 'old_passwords',
    timestamps: false
});

UserInfo.init({
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: UserCredentials,
            key: 'user_id'
        }
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    dni: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'UserInfo',
    tableName: 'user_info',
    timestamps: false
});

UserCredentials.hasOne(UserInfo, {
    foreignKey: 'user_id'
});
UserInfo.belongsTo(UserCredentials, {
    foreignKey: 'user_id'
});
UserCredentials.hasOne(UserRoles, {
    foreignKey: 'user_id'
});
UserRoles.belongsTo(UserCredentials, {
    foreignKey: 'user_id'
});
UserCredentials.hasMany(OldPasswords, {
    foreignKey: 'user_id'
});
OldPasswords.belongsTo(UserCredentials, {
    foreignKey: 'user_id'
});

const addUser = async (user) => {
    if (!user.email || !user.current_password || !user.first_name || !user.last_name || !user.dni) {
        throw new Error('Missing required fields');
    }

    const newUserCredentials = await UserCredentials.create({ email: user.email, current_password: user.current_password });
    await UserInfo.create({
        user_id: newUserCredentials.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        dni: user.dni
    });

    if (user.role_id) {
        await UserRoles.create({
            user_id: newUserCredentials.user_id,
        });
    }else{
        await UserRoles.create({
            user_id: newUserCredentials.user_id,
            role_id: user.role_id
        });
    }
    
    return newUserCredentials.user_id;
};

const updateUser = async (userId, user) => {
    try{
    
        await UserCredentials.update({
            email: user.email,
            current_password: user.current_password
        },
            {
                where: { user_id: userId }
            }
        );
        await UserInfo.update({
            first_name: user.first_name,
            last_name: user.last_name,
            dni: user.dni
        },
            {
                where: { user_id: userId }
            }
        );
        await UserRoles.update({
            role_id: user.role_id
        },
            {
                where: { user_id: userId }
            }
        );
        
    }catch(error){
        console.error('Error updating user:', error.message);
        return null;
    }


    return await getUserByEmail(user.email);
};

const deleteUser = async (userId) => {
    await UserRoles.destroy(
        {
            where: { user_id: userId }
        });
    await UserInfo.destroy(
        {
            where: { user_id: userId }
        });
    await UserCredentials.destroy(
        {
            where: { user_id: userId }
        });
};

const getUserByEmail = async (email) => {
    return await UserCredentials.findOne(
        {
            where:
                { email: email },
            include: [{ model: UserInfo, required: true }]
        });
};

const getUsers = async (skip = 0, limit = 10, userId) => {
    const users = await UserCredentials.findAll({
        where: userId ? { user_id: userId } : {},
        offset: skip,
        limit: limit,
        include: [
            { model: UserInfo, required: true, attributes: ['first_name', 'last_name', 'dni'] },
            { model: UserRoles, required: true, attributes: ['role_id'], include: [{ model: Role, required: true, attributes: ['role_name'] }] }
        ]
    });

    return users;

};

const getUsersCount = () => UserCredentials.count();

const getTableColumns = async () => {
    const columns = await UserCredentials.describe();
    return Object.keys(columns);
};

module.exports = {
    addUser,
    updateUser,
    deleteUser,
    getUserByEmail,
    getUsers,
    getUsersCount,
    getTableColumns
};