const tokenUtils = require('../utils/tokenUtils');

const authTokenInterceptor  =  async  (req, res, next) => {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split('Bearer ')[1];
        try {
            const {userId} = tokenUtils.verifyToken(token);
            req.user = {userId};
            return next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'La sesión ha expirado. Por favor, inicia sesión de nuevo.' });
            }
            console.error('Token inválido:', error.message);
        }
    }
    next();
}

module.exports = authTokenInterceptor;