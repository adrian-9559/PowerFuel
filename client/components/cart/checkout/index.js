import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, Button , useDisclosure} from "@nextui-org/react";
import AddressMenu from '@components/cart/checkout/address';

const CheckOut = () => {
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