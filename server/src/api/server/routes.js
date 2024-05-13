import { getUseServerCPU } from './controller.js';

const express = require('express');

const router = express.Router();

router.route('/cpu')
    .post(async (req, res) => {
        try {
            const result = await getUseServerCPU();
            res.json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    });

module.exports = router;