const model = require('./addressModel');
const errorDisplay = "(Error en el controlador de Direcciones)";

const addAddress = async (newAddress) => {
    try {
        const address = await model.insertAddress(newAddress);
        return address;
    } catch (error) {
        throw new Error(`Error al intentar agregar la dirección ${errorDisplay}`, error);
    }
};

const deleteAddressById = async (addressId) => {
    try {
        const deletedAddress = await model.deleteAddress(addressId);
        return deletedAddress;
    } catch (error) {
        throw new Error(`Error al intentar eliminar la dirección ${errorDisplay}`, error);
    }
};

const updateAddress = async (addressId, data) => {
    try {
        const address = await model.updateAddress(addressId, data);
        if (!address) {
            throw new Error('Not found');
        }
        return address;
    } catch (error) {
        throw new Error(`Error al intentar actualizar la dirección ${errorDisplay}`, error);
    }
};

const getAddressById = async (addressId) => {
    try {
        return await model.getAddress(addressId);
    } catch (error) {
        throw new Error(`Error al intentar obtener la dirección por ID ${errorDisplay}`, error);
    }
};

const getAddresses = async () => {
    try {
        const addresses = await model.getAddresses();
        if (!addresses) {
            throw new Error('Not found addresses');
        }
        return addresses;
    } catch (error) {
        throw new Error(`Error al intentar obtener las direcciones ${errorDisplay}`, error);
    }
};

const getAddressesByUserId = async (userId) => {
    try {
        const addresses = await model.getAddressesByUserId(userId);
        if (!addresses) {
            throw new Error('Not found');
        }
        return addresses;
    } catch (error) {
        throw new Error(`Error al intentar obtener las direcciones por ID de usuario ${errorDisplay}`, error);
    }
};

const setDefaultAddress = async (userId, addressId) => {
    try {
        const response = await model.setDefaultAddress(userId, addressId);
        if (!response) {
            throw new Error('Not found');
        }
        return response;
    } catch (error) {
        throw new Error(`Error al intentar establecer la dirección por defecto ${errorDisplay}`, error);
    }
};

module.exports = {
    addAddress,
    getAddresses,
    getAddressById,
    getAddressesByUserId,
    updateAddress,
    deleteAddressById,
    setDefaultAddress
};