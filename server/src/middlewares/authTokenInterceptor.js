const tokenUtils = require('../utils/tokenUtils');
const errorDisplay = "(Error en authTokenInterceptor)";

const authTokenInterceptor = async (req, res, next) => {
    if (req.url === '/api/token/refresh') {
        next();
        return;
    }

    let authorization = req.headers['authorization'];
    if (authorization) {
        const token = authorization.split('Bearer ')[1];
        
        try{
            const decoded = await tokenUtils.verifyAuthToken(token);

            req.user = {userId: decoded.userId};
            next();
        }
        catch(error){
            console.error(`Error al verificar el token de autenticación ${errorDisplay}`, error);
            if (error.name === 'TokenExpiredError') {
                res.status(401).json({
                    message: 'Token expired'
                });
            } else {
                res.status(403).json({
                    message: 'Invalid token'
                });
            }
            return;
        }
    } else {
        next();
    }
};

module.exports = authTokenInterceptor;
