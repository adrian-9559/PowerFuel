const model = require('./oldPasswordModel');
const errorDisplay = "(Error en el controlador de oldPassword)";

const saveOldPassword = async (userId, oldPassword) => {
    try {
        const changeTime = new Date();
        await model.saveOldPassword(userId, oldPassword, changeTime);
    } catch (error) {
        throw new Error(`Error al intentar guardar la contraseña antigua ${errorDisplay}`, error);
    }
};

const getAllOldPasswordByUserId = async (userId) => {
    try {
        return await model.getAllOldPasswordByUserId(userId);
    } catch (error) {
        throw new Error(`Error al intentar obtener todas las contraseñas antiguas por ID de usuario ${errorDisplay}`, error);
    }
};

module.exports = {
    saveOldPassword,
    getAllOldPasswordByUserId
}