const model = require('./oldPasswordModel');

const saveOldPassword = async (userId, oldPassword) => {
    const changeTime = new Date();
    await model.saveOldPassword(userId, oldPassword, changeTime);
};

const getAllOldPasswordByUserId = async (userId) => {
    return await model.getAllOldPasswordByUserId(userId);
};

module.exports = {
    saveOldPassword,
    getAllOldPasswordByUserId
}