const { UserAddress } = require('../../model');

class model {
    getAddresses = async () => {
        return await UserAddress.findAll();
    };
    
    getAddress = async (AddressId) => {
        return await UserAddress.findByPk(AddressId);
    };
    
    getAddressesByUserId = async (userId) => {
        return await UserAddress.findAll({
            where: {
                user_id: userId
            }
        });
    };
    
    insertAddress = async (address) => {
        if (!address) {
            return null;
        }
        try{
            const result = await UserAddress.create(address);
            return result.address_id;
        } catch (error) {
            return null;
        }
    };
    
    updateAddress = async (addressId, editedAddress) => {
        const updatedaddress = await UserAddress.findByPk(addressId);
        if (updatedaddress) {
            await UserAddress.update(editedAddress, {
                where: {
                    address_id: addressId
                }
            });
            return updatedaddress;
        }
        return null;
    };
    
    deleteAddress = async (addressId) => {
        if (!addressId) {
            return false;
        }
        const result = await UserAddress.destroy({
            where: {
                address_id: addressId
            }
        });
        return result > 0;
    };

    setDefaultAddress = async (userId, addressId) => {
        await UserAddress.update({ is_default: 0 }, { where: { user_id: userId , is_default: 1} });
        const result= await UserAddress.update({ is_default: 1 }, { where: { address_id: addressId } });
        return result;
    };
}

module.exports = new model();