const jwt = require('jsonwebtoken');
const model = require('./userModel');
const filesUpload = require('../files/controller');
const { createStripeCustomer } = require('../stripe/controller');
const { generateAuthToken, generateRefreshToken} = require('../../utils/tokenUtils');
const bcrypt = require('bcrypt');
const controllerOldPassword = require('./../oldPassword/controller');
const mailController = require('../mail/controller');
const { sendMailPassReset } = require('./../mail/controller');

const registerUser = async (user) => {
    const { email, current_password, first_name, last_name, dni } = user;

    if (!email || !current_password || !first_name || !last_name || !dni)
        return null;

    const salt = await bcrypt.genSalt(10);
    user.current_password = await bcrypt.hash(user.current_password, salt);

    user.stripeCustomer = await createStripeCustomer(email, first_name + ' ' + last_name);
    
    return await model.addUser(user);
};

const deleteUserById = async (userId) => {
    const deletedUser = await model.deleteUser(userId);
    return deletedUser;
};

const updateUserById = async (userId, user) => {
    const updatedUser = await model.updateUser(userId, user);
    return updatedUser;
};

const getUserById = async (userId) => {
    console.log('userId-controller', userId);
    let user = await model.getUsers(null, null, userId);

    user =  user.map(user => ({
        "user_id": user.user_id ,
        "email": user.email ,
        "first_name": user.UserInfo.first_name ,
        "last_name": user.UserInfo.last_name ,
        "dni": user.UserInfo.dni ,
        "role_id": user.Roles[0].role_id,
        "role_name": user.Roles[0].role_name,
        "stripe_customer_id": user.stripe_customer_id,
        "status": user.status
    }));

    return user[0];
};

const getUsers = async (limit, page) => {
    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);
    const skip = (parsedPage - 1) * parsedLimit;

    let users = await model.getUsers(skip, parsedLimit);
    
    const total = await model.getUsersCount();

    users =  users.map(user => ({
        "user_id": user.user_id ,
        "email": user.email ,
        "first_name": user.UserInfo.first_name ,
        "last_name": user.UserInfo.last_name ,
        "dni": user.UserInfo.dni ,
        "role_id": user.Roles[0].role_id,
        "role_name": user.Roles[0].role_name,
        "stripe_customer_id": user.stripe_customer_id,
        "status": user.status
    }));

    return {
        total,
        pages: Math.ceil(total / limit),
        users
    };
};


const loginUser = async (email, password) => {
    const user = await model.getUserByEmail(email);
    
    if (user && await bcrypt.compare(password, user.current_password) && user.status === 'Active'){
        const authToken = generateAuthToken(user);
        const refreshToken = generateRefreshToken(user);

        return {
            authToken,
            refreshToken
        };
    }

    return null;
};  

const getUsersByRegistrationDate = async (startDate, endDate) => {
    const users = await getUsersByRegistrationDate(new Date(startDate), new Date(endDate));
    return users;
};

const changePassword = async (userId, newPassword) => {
    const user = await model.getUsers(null, null, userId);

    if(await bcrypt.compare(newPassword, user.current_password)){
        console.error('Password igual a la anterior');
        return null;
    }

    const allOldPasswordUser = await controllerOldPassword.getAllOldPasswordByUserId(userId);
    const isOldPassword = allOldPasswordUser.some(password => bcrypt.compare(newPassword, password.previous_password));

    if(!isOldPassword){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        return await model.updateUser(userId, hashedPassword);
    } else {
        console.error('Password ya registrada con este usuario');
        return null;
    }
};

const resetPassword = async (email) => {
    const user = await model.getUserByEmail(email);
    if (!user) {
        console.error('No existe un usuario con ese correo electrónico');
        return null;
    }

    const code = createCode();
    await sendMailPassReset(email, code);
    console.log('Email sent successfully');
};
function createCode(){
    return Math.floor(Math.random() * 999999);
};

module.exports =  {
    registerUser,
    deleteUserById,
    updateUserById,
    getUserById,
    getUsers,
    loginUser,
    changePassword,
    getUsersByRegistrationDate,
    resetPassword
};
