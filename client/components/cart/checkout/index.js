import React, { useState, useEffect } from 'react';
import AddressService from '@services/addressService';
import { Modal, ModalContent, Button , useDisclosure} from "@nextui-org/react";
import AddressMenu from './address/index';

const CheckOut = () => {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <section>
            <Button onPress={onOpen} >Pagar</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='p-8'>
                <ModalContent>
                    <AddressMenu />
                </ModalContent>
            </Modal>
        </section>
    );
};

export default CheckOut;