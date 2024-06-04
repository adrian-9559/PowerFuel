const { Op } = require('sequelize');
const sequelize = require('../../model/database');
const { PasswordResetCode } = require('../../model');
const errorDisplay = "(Error en el modelo de codesPasswordResetModel)";

class model {
    insertCode = async (code, user_id, dateRegister) => {
        try {

            return await PasswordResetCode.create({
                code: code,
                user_id: user_id,
                create_at: dateRegister,
            });
        } catch (error) {
            throw new Error(`Error al intentar insertar en la base de datos el codigo vinculado a un usuario para resetear la contraseña ${errorDisplay}`, error);
        }
    }
}

module.exports = new model();