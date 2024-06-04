const model = require('./codesPasswordResetModel');
const errorDisplay = "(Error en el controlador de codesPasswordReset)";

const registerCodePasswordReset = async (code, user_id) => {
    try {
        if (!code ||!user_id) {
            throw new Error(`No se ha recibido toda la información necesaria ${errorDisplay}`);
        }
        const dateRegister = new Date();
        const result = await model.insertCode(code, user_id, dateRegister);
        return result;
    } catch (error) {
        throw new Error(`Error al registrar un código de reseteo de contraseñas dentro de la base de datos ${errorDisplay}`,error);
    }
}

module.exports = {
    registerCodePasswordReset,
}