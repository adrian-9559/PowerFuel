const model = require('./codesPasswordResetModel');
const errorDisplay = "(Error en el controlador de codesPasswordReset)";

const registerCodePasswordReset = async (code, user_id) => {
    try {
        if (!code ||!user_id) {
            console.log(`No se ha recibido toda la información necesaria ${errorDisplay}`);
        }
        const dateRegister = new Date();
        const dataUserFind = searchUserCodeReset(user_id);

        if(dataUserFind){
            await deleteCodeUser(user_id);
        }

        const result = await model.insertCode(code, user_id, dateRegister);

        return result;
    } catch (error) {
        console.error(error)
        console.log(`Error al registrar un código de reseteo de contraseñas dentro de la base de datos ${errorDisplay}`,error);
    }
}

const searchUserCodeReset = async (user_id) => {
    try {
        if (!user_id) {
            console.log(`No se ha recibido toda la información necesaria ${errorDisplay}`);
        }
        const result = await model.searchCodeUser(user_id);
        if(!result || result < 1){
            return 0;
        }else{
            return result;
        }
    } catch (error) {
        console.log(`Error al buscar un código de reseteo de contraseñas dentro de la base de datos ${errorDisplay}`,error);
    }
}

const deleteCodeUser = async (user_id) => {
    try {
        if (!user_id) {
            console.log(`No se ha recibido toda la información necesaria ${errorDisplay}`);
        }
        const result = await model.deleteCodeUser(user_id);
        return result;
    } catch (error) {
        console.log(`Error al eliminar un código de reseteo de contraseñas dentro de la base de datos ${errorDisplay}`,error);
    }
}

const verifyCode = async (code, userId) => {
    try {
        if (!code ||!userId) {
            console.log(`No se ha recibido toda la información necesaria ${errorDisplay}`);
        }

        console.log("code", code);
        console.log("userId", userId);
        try {
            const result = await searchUserCodeReset(userId);
            console.log("result", result);
    
            if (!result || result.length < 1) {
                return false;
            }
    
            return result.code === code;
        } catch (error) {
            console.log(`Error al verificar un código de reseteo de contraseñas dentro de la base de datos (codeError: 1) ${errorDisplay}`, error);
        }
    } catch (error) {
        console.log(`Error al verificar un código de reseteo de contraseñas dentro de la base de datos (codeError: 2) ${errorDisplay}`,error);
    }
}

module.exports = {
    registerCodePasswordReset,
    searchUserCodeReset,
    deleteCodeUser,
    verifyCode
}