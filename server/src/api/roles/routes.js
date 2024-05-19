const express = require('express');
const { getRoles, getRoleById, addRole, updateRoleById, deleteRoleById, getRoleByUserId } = require('./controller');

const router = express.Router();

router.route('/')
    .post(async (req, res) => {
        try {
            const role = await addRole(req.body.role);
            if (!role) {
                return res.status(400).json({ message: 'Error adding the role'});
            }
            res.json(role);
        } catch (error) {
            console.error('Error adding the role:', error);
            res.status(500).json({ message: 'Error adding the role' });
        }
    })
    .get(async (req, res) => {
        try {
            const roles = await getRoles(req.query.limit, req.query.page);
            res.json(roles);
        } catch (error) {
            console.error('Error getting the roles:', error);
            res.status(500).json({ message: 'Error getting the roles' });
        }
    });

router.route('/:roleId')
    .delete(async (req, res) => {
        try {
            const deletedRole = await deleteRoleById(req.params.roleId);
            if (!deletedRole) {
                return res.status(404).json({ message: 'Role not found' });
            }
            res.json({ message: 'Role deleted successfully' });
        } catch (error) {
            console.error('Error deleting the role:', error);
            res.status(500).json({ message: 'Error deleting the role' });
        }
    })
    .put(async (req, res) => {
        try {
            const role = await updateRoleById(req.params.roleId, req.body.role);
            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            }
            res.json({ message: 'Role updated successfully' });
        } catch (error) {
            console.error('Error updating the role:', error);
            res.status(500).json({ message: 'Error updating the role' });
        }
    })
    .get(async (req, res) => {
        try {
            const role = await getRoleById(req.params.roleId??null);
            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            }
            res.json(role);
        } catch (error) {
            console.error('Error getting the role:', error);
            res.status(500).json({ message: 'Error getting the role' });
        }
    });

router.route('/user/:userId')
    .get(async (req, res) => {
        try {
            const role = await getRoleByUserId(req.params.userId);
            if (!role) {
                return res.status(404).json({ message: 'Role not found for this user' });
            }
            res.json(role);
        } catch (error) {
            console.error('Error getting the role for user:', error);
            res.status(500).json({ message: 'Error getting the role for user' });
        }
    });

router.route('/user')
    .post(async (req, res) => {
        try {
            const role = await getRoleByUserId(req.user.userId);
            if (!role) {
                return res.status(404).json({ message: 'Role not found for this user' });
            }
            res.json(role);
        } catch (error) {
            console.error('Error getting the role for user:', error);
            res.status(500).json({ message: 'Error getting the role for user' });
        }
    });

module.exports = router;