const express = require('express');
const { addAddress, getAddresses, getAddressById, modifyAddressById, deleteAddressById, getAddressesByUserId } = require('./controller');

const router = express.Router();

router.route('/')
    .post(addAddress)
    .get(getAddresses);

router.route('/:addressId')
    .get(getAddressById)
    .put(modifyAddressById)
    .delete(deleteAddressById);

router.route('/user/:userId')
    .get(getAddressesByUserId);

module.exports = router;