const express = require('express');
const router = express.Router();
const tokenUtils = require('../../utils/tokenUtils');

router.post('/refresh', (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }

    try {
        const decoded = tokenUtils.verifyRefreshToken(refreshToken);
        const accessToken = tokenUtils.generateAuthToken({ userId: decoded.userId });
        res.json({ accessToken });
    } catch (err) {
        return res.status(401).json({ message: 'Invalid refresh token' });
    }
});

module.exports = router;
