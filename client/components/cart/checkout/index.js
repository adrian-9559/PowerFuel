import React, { useState, useEffect } from 'react';
import { Modal, ModalContent,Button , useDisclosure, ModalHeader} from "@nextui-org/react";
import AddressMenu from '@components/cart/checkout/address';

const CheckOut = ({total}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <section className='w-full'>
            <Button onPress={onOpen} className='items-center bg-green-200 hover:bg-green-500 sticky bottom-0 z-10 w-full flex justify-between mx-2' color='success' >
                <p>Pagar</p>
                <p className='font-semibold'>{total} €</p>            
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='p-8'>
                <ModalHeader className="flex flex-col gap-1">Pagar</ModalHeader>
                <ModalContent className='flex flex-col justify-center items-center'>
                    <AddressMenu />
                </ModalContent>
            </Modal>
        </section>
    );
};

export default CheckOut;