const jwt = require('jsonwebtoken');

const authTokenInterceptor  =  async  (req, res, next) => {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split('Bearer ')[1];
        try {
            const {userId} = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = userId;
            console.log('Token válido:', req.user);
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