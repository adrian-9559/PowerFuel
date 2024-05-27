const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {getRoleByUserId} = require('../api/roles/controller');

const isAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) {
                console.log("1", err);
                return res.sendStatus(403);
            }
        
            if (!user || !user.userId) {
                return res.sendStatus(403);
            }
        
            const {userId} = user;
            const {role_id} = await fetchRole(userId);
        
            if (role_id !== 10) {
                next();
            } else {
                res.status(403).json({ error: 'Unauthorized' });
            }
        });
    } else {
        res.sendStatus(401);
    }
};

const fetchRole = async (userId) => {
    const role = await getRoleByUserId(userId);
    return role;
};

module.exports = isAdmin;