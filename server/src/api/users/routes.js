const express = require('express');
const router = express.Router();
const { deleteUserById, updateUserById, getUserById, getUsers, loginUser, registerUser, getUserInfo, getTableColumns } = require('./controller');


router.route('/')
    .get(getUsers)
    .post(registerUser);

router.route('/:userId')
    .delete(deleteUserById)
    .put(updateUserById)
    .get(getUserById);
    

router.route('/info')
    .post(getUserInfo);

router.route('/login') 
    .post(loginUser);

router.route('/columns')
    .post(getTableColumns);

module.exports = router;