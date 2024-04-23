const express = require('express');
const router = express.Router();
const { getRoles, getRoleById, addRole, updateRoleById, deleteRoleById, getRoleByUserId } = require('./controller');

router.get('/', getRoles);
router.get('/:roleId', getRoleById);
router.post('/userRole', getRoleByUserId);
router.post('/', addRole);
router.put('/:roleId', updateRoleById);
router.delete('/:roleId', deleteRoleById);

module.exports = router;
