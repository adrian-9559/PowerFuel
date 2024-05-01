const express = require('express');
const { addAddress, getAddresses, getAddressById, updateAddress, deleteAddressById, getAddressesByUserId, setDefaultAddress } = require('./controller');

const router = express.Router();

router.route('/')
    .post(addAddress)
    .get(getAddresses);

router.route('/:addressId')
    .get(getAddressById)
    .put(updateAddress)
    .delete(deleteAddressById);


router.route('/default/:addressId')
    .put(setDefaultAddress);

router.route('/user/:userId')
    .get(getAddressesByUserId);

module.exports = router;