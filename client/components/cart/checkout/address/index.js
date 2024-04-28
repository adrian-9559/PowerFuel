import React, { useState, useEffect } from 'react';
import AddressService from '@services/addressService';
import { Modal, ModalContent } from "@nextui-org/react";
import AddressList from '@components/cart/address/partials/addressList';


const AddressMenu = () => {

    return (
        <section>
            <AddressList />
        </section>
    );
};

export default AddressMenu;