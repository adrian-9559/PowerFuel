const express = require('express');
const { addAddress, getAddresses, getAddressById, updateAddress, deleteAddressById, getAddressesByUserId, setDefaultAddress } = require('./controller');

const router = express.Router();

router.route('/')
    .post(async(req, res) => {
        try{
            const newAddress = req.body;
            newAddress.user_id = req.user.userId;
            const address = await addAddress(newAddress);
            res.status(201).json(address);
        }catch(error){
            res.status(500).json({ message: 'Error adding the address' });
        }
    })
    .get(async(req, res) => {
        try{
            const address = await getAddresses();
            if (!address) {
                return res.status(404).json({ message: 'Address not found' });
            }
            res.status(201).json(address);
        }catch(error){
            res.status(500).json({ message: 'Error get address' });
        }
    });

router.route('/:addressId')
    .get(async(req, res) => {
        try{
            const address = await getAddressById(req.params.addressId);
            if (!address) {
                return res.status(404).json({ message: 'Address not found' });
            }
            res.status(201).json(address);
        }catch(error){
            res.status(500).json({ message: 'Error get address' });
        }
    })
    .put(async(req, res) => {
        try{
            const address = await updateAddress(req.params.addressId, req.body);
            res.status(201).json({ message: 'Address update successfully' });
        }catch(error){
            res.status(500).json({ message: 'Error update address' });
        }
    })
    .delete(async(req, res) => {
        try{
            const deletedAddress = await deleteAddressById(req.params.addressId);
            if (!deletedAddress) {
                return res.status(404).json({ message: 'Address not found' });
            }
            res.status(201).json({ message: 'Address deleted successfully' });
        }catch(error){
            res.status(500).json({ message: 'Error delete address' });
        }
    });


router.route('/default/:addressId')
    .put(async(req, res) => {
        try {
            const addressId = req.params.addressId;
            const userId = req.user.userId;
            await setDefaultAddress(userId, addressId);
            res.status(200).json({ message: 'Default address updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating default address' });
        }
    });

router.route('/user/:userId')
    .get(async(req, res) => {
        try {
            const userId = req.params.userId==="null"?req.user.userId:req.params.userId;
            const addresses = await getAddressesByUserId(userId);
            res.status(200).json({addresses});
        } catch (error) {
            res.status(500).json({ message: 'Error getting addresses by user ID' });
        }
    });

module.exports = router;