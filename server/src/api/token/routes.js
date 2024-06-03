const express = require('express');
const router = express.Router();
const tokenUtils = require('../../utils/tokenUtils');

/**
 * @route POST /refresh
 * Endpoint para refrescar el token de acceso.
 * Endpoint to refresh the access token.
 * 
 * @param {string} req.body.refreshToken - El token de refresco. | The refresh token.
 * 
 * @returns {Object} 200 - El nuevo token de acceso. | The new access token.
 * @returns {Object} 400 - Error si el token de refresco no se proporciona. | Error if the refresh token is not provided.
 * @returns {Object} 401 - Error si el token de refresco es inválido. | Error if the refresh token is invalid.
 */
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
