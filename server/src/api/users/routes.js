// routes.js
const express = require('express');
const { registerUser, deleteUserById, updateUserById, getUserById, getUsers, loginUser, getUserInfo } = require('./controller');

const router = express.Router();

router.route('/')
    .post(async (req, res) => {
        try {
            const user = await registerUser(req.body.user);
            res.json(user);
        } catch (error) {
            console.error('Error registering the user:', error);
            res.status(500).json({ message: 'Error registering the user' });
        }
    })
    .get(async (req, res) => {
        try {
            const users = await getUsers(req.query.limit, req.query.page, req.user.userId);
            res.json(users);
        } catch (error) {
            console.error('Error getting the users:', error);
            res.status(500).json({ message: 'Error getting the users' });
        }
    });

router.route('/:userId')
    .delete(async (req, res) => {
        try {
            const deletedUser = await deleteUserById(req.params.userId);
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting the user:', error);
            res.status(500).json({ message: 'Error deleting the user' });
        }
    })
    .put(async (req, res) => {
        try {
            const user = await updateUserById(req.params.userId, req.body.user);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User updated successfully' });
        } catch (error) {
            console.error('Error updating the user:', error);
            res.status(500).json({ message: 'Error updating the user' });
        }
    })
    .get(async (req, res) => {
        try {
            const user = await getUserById(req.params.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            console.error('Error getting the user:', error);
            res.status(500).json({ message: 'Error getting the user' });
        }
    });

router.route('/info')
    .post(async (req, res) => {
        try {
            const user = await getUserInfo(req.user.userId);
            res.json(user);
        } catch (error) {
            console.error('Error getting the user info:', error);
            res.status(500).json({ message: 'Error getting the user info' });
        }
    });

router.route('/login')
    .post(async (req, res) => {
        try {
            const token = await loginUser(req.body.email, req.body.current_password);
            if (!token) {
                return res.status(401).json({ message: 'Login failed' });
            }
            res.json({ message: 'Login successful', token });
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).json({ message: 'Error logging in' });
        }
    });

module.exports = router;