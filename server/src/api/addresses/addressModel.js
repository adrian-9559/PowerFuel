const { Address } = require('../../model/model');

class model {
    getAddresses = async () => {
        return await Address.findAll();
    };
    
    getAddress = async (addressId) => {
        return await Address.findByPk(addressId);
    };
    
    getAddressesByUserId = async (userId) => {
        return await Address.findAll({
            where: {
                user_id: userId
            }
        });
    };
    
    insertAddress = async (address) => {
        if (!address) {
            return null;
        }
        return await Address.create(address);
    };
    
    modifyAddress = async (addressId, address) => {
        const updatedAddress = await Address.findByPk(addressId);
    
        if (updatedAddress) {
            await updatedAddress.update(address);
        }
    };
    
    deleteAddress = async (addressId) => {
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
}

module.exports = new model();