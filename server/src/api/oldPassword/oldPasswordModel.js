const { Op } = require('sequelize');
const sequelize = require('../../model/database');
const { OldPasswords } = require('../../model');
const errorDisplay = "(Error en el modelo de oldPassword)";

class model {
    saveOldPassword = async (userId, oldPassword, changeTime) => {
        try {
            await OldPasswords.create({ 
                user_id: userId,
                old_password: oldPassword,
                change_date: changeTime 
            });
        } catch (error) {
            throw new Error(`Error al guardar la antigua contraseña ${errorDisplay}`, error);
        }
    };

    getAllOldPasswordByUserId = async (userId) => {
        try {
            return await OldPasswords.findAll({ 
                where: { user_id: userId } 
            });
        } catch (error) {
            throw new Error(`Error al obtener todas las antiguas contraseñas por ID de usuario ${errorDisplay}`, error);
        }
    };
}

module.exports = new model();