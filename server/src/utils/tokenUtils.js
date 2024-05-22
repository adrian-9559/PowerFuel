const jwt = require('jsonwebtoken');


const generateAuthToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: '20m' });
const generateRefreshToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });


const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET_KEY);

module.exports = {
    generateAuthToken,
    generateRefreshToken,
    verifyToken
};