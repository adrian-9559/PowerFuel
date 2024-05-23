const tokenUtils = require('../utils/tokenUtils');

const refreshTokenInterceptor = async (req, res, next) => {
    let refreshToken = req.headers['refresh_token'];
    if (refreshToken) {
        try {
            const {userId} = tokenUtils.verifyToken(refreshToken);
            const newToken = tokenUtils.generateAuthToken(userId);
            const newRefreshToken = jwt.sign({userId}, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn: '7d'});
            res.setHeader('Authorization', 'Bearer ' + newToken);
            res.setHeader('x-refresh-token', newRefreshToken);
            req.user = {userId};
            return next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'El token de refresco ha expirado. Por favor, inicia sesión de nuevo.' });
            }
            console.error('Token de refresco inválido:', error.message);
        }
    }
    next();
}

module.exports = refreshTokenInterceptor;