const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const model = require('./userModel');



const generateToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

const registerUser = async (req, res) => {

    const { email, current_password, first_name, last_name, dni } = req.body;
    
    if (!email || !current_password || !first_name || !last_name || !dni) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const salt = await bcrypt.genSalt(10);
    if (!salt) {
        return res.status(500).json({ message: 'Failed to generate salt' });
    }

    const newUser = { email, current_password, first_name, last_name, dni};
    newUser.current_password = await bcrypt.hash(newUser.current_password, salt);
    const user = await model.addUser(newUser);
    
    if (!user) {
        return res.status(400).json({ message: 'Error en el registro' });
    }

    return res.json({data: user});
};

const deleteUserById = async (req, res) => {
    const deletedUser = await model.deleteUser(req.params.userId);
    if (!deletedUser) {
        throw new Error('Not found');
    }
    res.json({ message: 'User deleted successfully' });
};

const updateUserById = async (req, res) => {
    const { userId } = req.params;
    const user = await model.updateUser(userId, req.body);
    if (!user) {
        throw new Error('Not found');
    }
    res.json(user);
};

const getUserById = async (req, res) => {
    const user = await model.getUsers(null, null, req.params.userId);
    if (!user) {
        throw new Error('Not found');
    }
    res.json(user);
};

const getUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let users = await model.getUsers(skip, limit);
    const total = await model.getUsersCount();

    users = users.map(user => ({
        "id": user.user_id,
        "user_id": { display: "ID de Usuario", value: user.user_id },
        "email": { display: "Correo Electrónico", value: user.email },
        "first_name": { display: "Nombre", value: user.UserInfo.first_name },
        "last_name": { display: "Apellido", value: user.UserInfo.last_name },
        "dni": { display: "DNI", value: user.UserInfo.dni },
        "role_name": { display: "Nombre de Rol", value: user.UserRole.Role.role_name }
    }));

    res.json({
        total,
        pages: Math.ceil(total / limit),
        data: users
    });
};

const loginUser = async (req, res) => {
    try {
        const { email, current_password } = req.body;
        console.log(email??"none");
        console.log(current_password??"none");
        if (!email || !current_password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = await model.getUserByEmail(email);

        if (user && await bcrypt.compare(current_password, user.current_password)) {
            const token = generateToken(user.user_id);
            res.status(200).json({ message: 'Login successful', token });
        } else {
            res.status(401).json({ message: 'Login failed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getUserInfo = async (req, res) => {
    if (!req.user) {
        throw new Error('Unauthorized');
    }
    const userId = req.user.userId;

    const user = await model.getUsers(null, null, userId);
    if (!user) {
        console.error('User not found');
    }

    users =  user.map(user => ({
        "user_id": user.user_id ,
        "email": user.email ,
        "first_name": user.UserInfo.first_name ,
        "last_name": user.UserInfo.last_name ,
        "dni": user.UserInfo.dni ,
        "role_id":user.UserRoles.Role
    }));

    res.json(users);
};

const getTableColumns = async (req,res) => {
    let columns = await model.getTableColumns();

    columns = columns.map(column => ({
        "user_id": "ID de Usuario",
        "email": "Correo Electrónico",
        "first_name": "Nombre",
        "last_name": "Apellido",
        "dni": "DNI",
        "role_name": "Nombre de Rol"
    }));


    res.json({columns});
};

module.exports =  {
    registerUser,
    deleteUserById,
    updateUserById,
    getUserById,
    getUsers,
    loginUser,
    getUserInfo,
    getTableColumns
};


