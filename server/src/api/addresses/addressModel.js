const { UserAddress } = require('../../model');
const errorDisplay = "(Error en el modelo de Address)";

class model {
    getAddresses = async () => {
        try {
            return await UserAddress.findAll();
        } catch (error) {
            throw new Error(`Error al intentar obtener todas las direcciones ${errorDisplay}`, error);
        }
    };
    
    getAddress = async (AddressId) => {
        try {
            return await UserAddress.findByPk(AddressId);
        } catch (error) {
            throw new Error(`Error al intentar obtener la dirección por ID ${errorDisplay}`, error);
        }
    };
    
    getAddressesByUserId = async (userId) => {
        try {
            return await UserAddress.findAll({
                where: {
                    user_id: userId
                }
            });
        } catch (error) {
            throw new Error(`Error al intentar obtener las direcciones por ID de usuario ${errorDisplay}`, error);
        }
    };
    
    insertAddress = async (address) => {
        if (!address) {
            return null;
        }
        try {
            const existingAddresses = await UserAddress.findAll({
                where: {
                    user_id: address.user_id
                }
            });
    
            if (existingAddresses.length === 0) {
                address.is_default = "1";
            }
            // Rest of the code...
        } catch (error) {
            throw new Error(`Error al intentar insertar la dirección ${errorDisplay}`, error);
        }
    };
    
    updateAddress = async (addressId, editedAddress) => {
        try {
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
        } catch (error) {
            throw new Error(`Error al intentar actualizar la dirección ${errorDisplay}`, error);
        }
    };
    
    deleteAddress = async (addressId) => {
        try {
            if (!addressId) {
                return false;
            }
            const result = await UserAddress.destroy({
                where: {
                    address_id: addressId
                }
            });
            return result > 0;
        } catch (error) {
            throw new Error(`Error al intentar eliminar la dirección ${errorDisplay}`, error);
        }
    };

    setDefaultAddress = async (userId, addressId) => {
        try{
            await UserAddress.update({ is_default: 0 }, { where: { user_id: userId , is_default: 1} });
            const result= await UserAddress.update({ is_default: 1 }, { where: { address_id: addressId } });
            return result;
        }catch (error) {
            throw new Error(`Error al intentar establecer la dirección por defecto ${errorDisplay}`, error);
        }
    };
}

module.exports = new model();