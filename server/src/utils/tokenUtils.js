const jwt = require('jsonwebtoken');

const generateAuthToken = (user) => {
    const payload = { userId: user.user_id, role: user.role_id };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10h' });
};

const generateRefreshToken = (user) => {
    const payload = { userId: user.user_id };
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

const verifyAuthToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
};

const verifyRefreshToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return decoded;
    
};

module.exports = {
    generateAuthToken,
    generateRefreshToken,
    verifyAuthToken,
    verifyRefreshToken,
};
