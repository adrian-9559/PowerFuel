const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database');
const Users = require('../users/model');

class Address extends Model {}
Address.init({
    address_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Users,
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

const getAddresses = async () => {
    return await Address.findAll();
};

const getAddress = async (addressId) => {
    return await Address.findByPk(addressId);
};

const getAddressesByUserId = async (userId) => {
    return await Address.findAll({
        where: {
            user_id: userId
        }
    });
};

const insertAddress = async (address) => {
    if (!address) {
        return null;
    }
    return await Address.create(address);
};

const modifyAddress = async (addressId, address) => {
    const updatedAddress = await Address.findByPk(addressId);

    if (updatedAddress) {
        await updatedAddress.update(address);
    }
};

const deleteAddress = async (addressId) => {
    if (!addressId) {
        return false;
    }
    const result = await Address.destroy({
        where: {
            address_id: addressId
        }
    });
    return result > 0;
};

module.exports = {
    getAddresses,
    getAddress,
    insertAddress,
    getAddressesByUserId,
    modifyAddress,
    deleteAddress
};