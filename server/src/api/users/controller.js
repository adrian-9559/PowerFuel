const jwt = require('jsonwebtoken');
const model = require('./userModel');
const filesUpload = require('../files/controller');
const { createStripeCustomer } = require('../stripe/controller');
const { generateAuthToken, generateRefreshToken} = require('../../utils/tokenUtils');
const bcrypt = require('bcrypt');
const controllerOldPassword = require('./../oldPassword/controller');
const mailController = require('../mail/controller');
const { sendMailPassReset } = require('./../mail/controller');
const errorDisplay = "(Error en el controlador de Usuarios)";

const registerUser = async (user) => {
    try {
        const { email, current_password, first_name, last_name, dni } = user;

        if (!email || !current_password || !first_name || !last_name || !dni)
            return null;

        const salt = await bcrypt.genSalt(10);
        user.current_password = await bcrypt.hash(user.current_password, salt);

        user.stripeCustomer = await createStripeCustomer(email, first_name + ' ' + last_name);
        
        return await model.addUser(user);
    } catch (error) {
        throw new Error(`Error al intentar registrar el usuario ${errorDisplay}`, error);
    }
};

const deleteUserById = async (userId) => {
    try {
        const deletedUser = await model.deleteUser(userId);
        return deletedUser;
    } catch (error) {
        throw new Error(`Error al intentar eliminar el usuario ${errorDisplay}`, error);
    }
};

const updateUserById = async (userId, user) => {
    try {
        const updatedUser = await model.updateUser(userId, user);
        return updatedUser;
    } catch (error) {
        throw new Error(`Error al intentar actualizar el usuario ${errorDisplay}`, error);
    }
};

const getUserById = async (userId) => {
    try {
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
    } catch (error) {
        throw new Error(`Error al intentar obtener el usuario por ID ${errorDisplay}`, error);
    }
};

const getUsers = async (limit, page) => {
    try {
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
    } catch (error) {
        throw new Error(`Error al intentar obtener los usuarios ${errorDisplay}`, error);
    }
};


const loginUser = async (email, password) => {
    try {
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
    } catch (error) {
        throw new Error(`Error al intentar iniciar sesión ${errorDisplay}`, error);
    }
};

const getUsersByRegistrationDate = async (startDate, endDate) => {
    try {
        const users = await getUsersByRegistrationDate(new Date(startDate), new Date(endDate));
        return users;
    } catch (error) {
        throw new Error(`Error al intentar obtener los usuarios por fecha de registro ${errorDisplay}`, error);
    }
};

const changePassword = async (userId, newPassword) => {
    try {
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
    } catch (error) {
        throw new Error(`Error al intentar cambiar la contraseña ${errorDisplay}`, error);
    }
};

const resetPassword = async (email) => {
    try {
        const user = await model.getUserByEmail(email);
        if (!user) {
            console.error('No existe un usuario con ese correo electrónico');
            return null;
        }

        const code = createCode();
        await sendMailPassReset(email, code);
        console.log('Email sent successfully');
    } catch (error) {
        throw new Error(`Error al intentar restablecer la contraseña ${errorDisplay}`, error);
    }
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
