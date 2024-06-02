const express = require('express');
const isAdmin = require('../../middlewares/isAdmin');
const { registerUser, deleteUserById, updateUserById, getUserById, getUsers, loginUser, getUsersByRegistrationDate, resetPassword } = require('./controller');

const router = express.Router();

router.route('/')
    .post(async (req, res) => {
        try {
            const user = await registerUser(req.body.user);
            if (!user) {
                return res.status(400).json({ message: 'error registering the user'});
            }
            res.json(user);
        } catch (error) {
            console.error('Error registering the user:', error);
            res.status(500).json({ message: 'Error registering the user' });
        }
    })
    .get(isAdmin, async (req, res) => {
        try {
            const data = await getUsers(req.query.limit, req.query.page);
            res.send(data);
        } catch (error) {
            console.error('Error getting the users:', error);
            res.status(500).json({ message: 'Error getting the users' });
        }
    });

router.route('/:userId')
    .delete(isAdmin, async (req, res) => {
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
    .put( async (req, res) => {
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
        const userId = req.params.userId;
        try {
            const user = await getUserById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.json(user); 
        } catch (error) {
            console.error('Error getting the user:', error);
            if (!res.headersSent) {
                return res.status(500).json({ message: 'Error getting the user' });
            }
        }
    });

router.route('/login')
    .post(async (req, res) => {
        try {
            const tokens = await loginUser(req.body.email, req.body.password);
            if (!tokens && tokens == null) {
                return res.status(401).json({ message: 'Inicio de sesión fallido' });
            }
            const { authToken, refreshToken } = tokens;
            res.json({ message: 'Inicio de sesión correcto', auth_token: authToken, refresh_token: refreshToken});
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).json({ message: 'Error logging in' });
        }
    });

router.route('/usersByRegistrationDate')
    .post(isAdmin, async (req, res) => {
        const { startDate, endDate } = req.body;
        try {
            const users = await getUsersByRegistrationDate(startDate, endDate);
            res.json(users);
        } catch (error) {
            console.error('Error in /usersByRegistrationDate:', error);
            res.status(500).json({ message: 'Error al obtener los usuarios por fecha de registro' });
        }
    });

router.route('/info')
    .post(async (req, res) => {
        const userId = req.user.userId;
        try {
            const user = await getUserById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.json(user); 
        } catch (error) {
            console.error('Error getting the user:', error);
            if (!res.headersSent) {
                return res.status(500).json({ message: 'Error getting the user' });
            }
        }
    });

router.route('/resetPassword')
    .post(async (req, res) => {
        const email = req.body.email;
        try {
            const response = await resetPassword(email);
            if (!response) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.json(response); 
        } catch (error) {
            console.error('Error getting the user:', error);
            if (!res.headersSent) {
                return res.status(500).json({ message: 'Error getting the user' });
            }
        }
    });

module.exports = router;