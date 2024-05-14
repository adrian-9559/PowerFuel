const { getUseServerCPU, getUseServerRAM, getDiskUsage, getUseServerInfo } = require('./controller');

const express = require('express');

const router = express.Router();

router.route('/info')
    .post(async (req, res) => {
        try {
            const result = await getUseServerInfo();
            res.json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    });

router.route('/cpu')
    .post(async (req, res) => {
        try {
            const result = await getUseServerCPU();
            res.json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    });

router.route('/ram')
    .post(async (req, res) => {
        try {
            const result = await getUseServerRAM();
            res.json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    });

router.route('/disk')
    .post(async (req, res) => {
        try {
            const result = await getDiskUsage();
            res.json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    });

module.exports = router;