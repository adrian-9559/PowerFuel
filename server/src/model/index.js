const Brand = require('./brand');
const UserAddress = require('./userAddress');
const Product = require('./product');
const Role = require('./role');
const UserRoles = require('./userRoles');
const UserCredentials = require('./userCredentials');
const OldPasswords = require('./oldPasswords');
const UserInfo = require('./userInfo');
const Category = require('./category');

// Relaciones
UserCredentials.hasOne(UserInfo, { foreignKey: 'user_id' });
UserCredentials.hasMany(UserAddress, { foreignKey: 'user_id' });
UserCredentials.hasMany(UserRoles, { foreignKey: 'user_id' });
UserCredentials.belongsToMany(Role, { through: UserRoles, foreignKey: 'user_id' });
UserCredentials.hasMany(OldPasswords, { foreignKey: 'user_id' });

UserRoles.belongsTo(UserCredentials, { foreignKey: 'user_id' });
UserRoles.belongsTo(Role, { foreignKey: 'role_id' });

UserAddress.belongsTo(UserCredentials, { foreignKey: 'user_id' });

OldPasswords.belongsTo(UserCredentials, { foreignKey: 'user_id' });

Role.belongsToMany(UserCredentials, { through: UserRoles, foreignKey: 'role_id' });
Role.hasMany(UserRoles, { foreignKey: 'role_id' });

Product.belongsTo(Brand, { foreignKey: 'id_brand' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

Category.hasMany(Product, { foreignKey: 'category_id' });
Category.hasMany(Category, { as: 'children', foreignKey: 'parent_category_id' });

module.exports = {
    Brand,
    UserAddress,
    Product,
    Role,
    UserRoles,
    UserCredentials,
    OldPasswords,
    UserInfo,
    Category
};