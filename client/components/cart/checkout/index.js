import React, { use, useCallback, useEffect, useState } from 'react';
import { Button, Modal, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import AddressMenu from '@components/address/checkout';
import PaymentMenu from '@components/payments/checkout';
import AuthTabs from '@components/auth/authMenu/partials/authTabs';
import { useAppContext } from '@context/AppContext';

const CheckOut = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const { isLoggedIn } = useAppContext();

    const handleContinue = (volver=false) => {
        if(!volver) {
            setCurrentStep(2);
        }else{
            setCurrentStep(1);
        }
    }

    useEffect(() => {
        setCurrentStep(1);
        setSelectedAddress(null);
    },[isOpen]);
    
    return (
        <section className='w-full flex justify-center'>
            <Button onPress={onOpen} className='items-center bg-green-200 hover:bg-green-500 sticky bottom-0 z-10 flex justify-center w-1/2' color='success'>
                <p>Pagar</p>
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='p-8' backdrop="blur">
                <ModalHeader className="flex flex-col gap-1">Pagar</ModalHeader>
                <ModalContent className='flex flex-col justify-center items-center'>
                    {!isLoggedIn && <AuthTabs />}
                    {isLoggedIn && currentStep === 1 && (
                        <AddressMenu 
                            setSelectedAddress={setSelectedAddress}
                        />
                    )}
                    {isLoggedIn && currentStep === 2 && (
                        <PaymentMenu/>
                    )}
                    {isLoggedIn && currentStep === 3 && (
                        <p>Pago realizado correctamente</p>
                    )}
                    <ModalFooter className='w-full'>
                        {isLoggedIn && currentStep === 1 && (
                            <Button fullWidth color="default" onPress={() => handleContinue()}>Continuar</Button>
                        )}
                        {isLoggedIn && currentStep === 2 && (
                            <Button fullWidth color="default" onPress={() => handleContinue(true)}>Volver</Button>
                        )}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </section>
    );
};

export default CheckOut;