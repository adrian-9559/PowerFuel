const { Op } = require('sequelize');
const sequelize = require('../../model/database');
const { OldPasswords } = require('../../model');

class model {
    saveOldPassword = async (userId, oldPassword, changeTime) => {
        await OldPasswords.create({ 
            user_id: userId,
            old_password: oldPassword,
            change_date: changeTime 
        });
    };

    getAllOldPasswordByUserId = async (userId) => {
        return await OldPasswords.findAll({ 
            where: { user_id: userId } 
        });
    };
}

module.exports = new model();