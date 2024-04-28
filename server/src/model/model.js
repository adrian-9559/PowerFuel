const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class Brand extends Model { }
Brand.init({
    id_brand: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    brand_name: {
        type: DataTypes.STRING,
        unique: true
    }
}, {
    sequelize,
    modelName: 'Brand',
    tableName: 'brands',
    timestamps: false
});

class Address extends Model { }
Address.init({
    address_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'UserCredentials',
            key: 'user_id'
        },
        onDelete: 'CASCADE'
    },
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    country: DataTypes.STRING,
    zip: DataTypes.STRING,
    phone_number: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'Address',
    tableName: 'user_address',
    timestamps: false
});

class Product extends Model { }
Product.init({
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10, 2),
    stock_quantity: DataTypes.INTEGER,
    id_brand: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    status: {
        type: DataTypes.ENUM('enable', 'disable'),
        allowNull: false,
        defaultValue: 'enable'
    }
}, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: false
});

class Role extends Model { }
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

class UserRoles extends Model { }
UserRoles.init({
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        defaultValue: 10,
        references: {
            model: 'Role',
            key: 'role_id'
        }
    },
}, {
    sequelize,
    modelName: 'UserRole',
    tableName: 'user_roles',
    timestamps: false
});

class UserCredentials extends Model { }
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

class OldPasswords extends Model { }
OldPasswords.init({
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'UserCredentials',
            key: 'user_id'
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

class UserInfo extends Model { }
UserInfo.init({
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'UserCredentials',
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
class Category extends Model { }
Category.init({
    category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category_name: DataTypes.STRING,
    parent_category_id: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: false
});

Product.belongsTo(Brand, { foreignKey: 'id_brand' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

Brand.hasMany(Product, { foreignKey: 'id_brand' });

Category.hasMany(Product, { foreignKey: 'category_id' });

Address.belongsTo(UserCredentials, { foreignKey: 'user_id' });

UserCredentials.hasOne(Address, { foreignKey: 'user_id' });
UserCredentials.hasMany(UserRoles, { foreignKey: 'user_id' });
UserCredentials.hasMany(OldPasswords, { foreignKey: 'user_id' });
UserCredentials.hasOne(UserInfo, { foreignKey: 'user_id' });

UserInfo.belongsTo(UserCredentials, { foreignKey: 'user_id' });

OldPasswords.belongsTo(UserCredentials, { foreignKey: 'user_id' });

UserRoles.belongsTo(UserCredentials, { foreignKey: 'user_id' });
UserRoles.belongsTo(Role, { foreignKey: 'role_id' });

Role.hasMany(UserRoles, { foreignKey: 'role_id' });



// Exporta los modelos
module.exports = {
    Brand,
    Address,
    Product,
    Role,
    UserRoles,
    UserCredentials,
    OldPasswords,
    UserInfo,
    Category
};
