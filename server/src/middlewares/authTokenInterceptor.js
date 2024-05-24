const tokenUtils = require('../utils/tokenUtils');

const authTokenInterceptor = async (req, res, next) => {
    let authorization = req.headers['authorization'];
    if (authorization) {
        const token = authorization.split('Bearer ')[1];
        
        try{
            const decoded = await tokenUtils.verifyAuthToken(token);

            req.user = {userId: decoded.userId};
            next();
        }
        catch(e){
            console.log("error", e);
            if (e.name === 'TokenExpiredError') {
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
