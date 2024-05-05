const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const model = require('./userModel');
const filesUpload = require('../files/controller');

const generateToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

const registerUser = async (user) => {
    const { email, current_password, first_name, last_name, dni } = user;

    const salt = await bcrypt.genSalt(10);
    user.current_password = await bcrypt.hash(user.current_password, salt);
    const newUser = await model.addUser(user);
    
    return newUser;
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
    const user = await model.getUsers(null, null, userId);
    return user;
};

const getUsers = async (limit, page, userId) => {
    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);
    const skip = (parsedPage - 1) * parsedLimit;

    let users = await model.getUsers(skip, parsedLimit);
    
    const total = await model.getUsersCount();

    users = users.map(user => ({  
            "id": user.user_id,
            "user_id": {display: "ID Usuario", value: user.user_id},
            "email": {display: "Correo", value: user.email},
            "first_name": {display: "Nombre", value: user.UserInfo.first_name},
            "last_name": {display: "Apellido", value: user.UserInfo.last_name},
            "dni": {display: "DNI", value: user.UserInfo.dni},
            "role_name": {display: "Rol", value: user.Roles[0].role_name}
        })
    ); 

    return {
        total,
        pages: Math.ceil(total / limit),
        data: users
    };
};

const loginUser = async (email, current_password) => {
    const user = await model.getUserByEmail(email);

    if (user && await bcrypt.compare(current_password, user.current_password)) {
        const token = generateToken(user.user_id);
        return token;
    } else {
        throw new Error('Login failed');
    }
};

const getUserInfo = async (userId) => {

    const user = await model.getUsers(null, null, userId);

    users =  user.map(user => ({
        "user_id": user.user_id ,
        "email": user.email ,
        "first_name": user.UserInfo.first_name ,
        "last_name": user.UserInfo.last_name ,
        "dni": user.UserInfo.dni ,
        "role_id": user.Roles // Access the Role model directly
    }));

    return users;
};

module.exports =  {
    registerUser,
    deleteUserById,
    updateUserById,
    getUserById,
    getUsers,
    loginUser,
    getUserInfo
};
