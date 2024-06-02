const jwt = require('jsonwebtoken');
const errorDisplay = "(Error en tokenUtils)";

const generateAuthToken = (user) => {
    try {
        const payload = { userId: user.user_id, role: user.role_id };
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TOKEN_AUTH_EXPIRATION });
    } catch (error) {
        throw new Error(`Error al generar el token de autenticación ${errorDisplay}`, error);
    }
};

const generateRefreshToken = (user) => {
    try {
        const payload = { userId: user.user_id };
        return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_TOKEN_REFRESH_EXPIRATION });
    } catch (error) {
        throw new Error(`Error al generar el token de actualización ${errorDisplay}`, error);
    }
};

const verifyAuthToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error(`Error al verificar el token de autenticación ${errorDisplay}`, error);
    }
};

const verifyRefreshToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        return decoded;
    } catch (error) {
        throw new Error(`Error al verificar el token de actualización ${errorDisplay}`, error);
    }
};

module.exports = {
    generateAuthToken,
    generateRefreshToken,
    verifyAuthToken,
    verifyRefreshToken,
};
