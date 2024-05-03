import { useState, useEffect, use } from 'react';
import { Button, Modal, ModalContent, ModalFooter, ModalHeader, useDisclosure, ModalBody } from '@nextui-org/react';
import AddressMenu from '@components/cart/checkout/address';
import PaymentMenu from '@components/cart/checkout/paymentMethod';



const CheckOut = ({total}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);

    const handleSelectAddress = (address) => {
        setSelectedAddress(address);
        console.log("selectedAddress", selectedAddress);
    }

    const handleSelectPayment = (payment) => {
        setSelectedPayment(payment);
        console.log("selectedPayment", selectedPayment);
    }

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
        setSelectedPayment(null);
    },[isOpen]);

    return (
        <section className='w-full'>
            <Button onPress={onOpen} className='items-center bg-green-200 hover:bg-green-500 sticky bottom-0 z-10 w-full flex justify-between mx-2' color='success' >
                <p>Pagar</p>
                <p className='font-semibold'>{total} €</p>            
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='p-8'>
                <ModalHeader className="flex flex-col gap-1">Pagar</ModalHeader>
                <ModalContent className='flex flex-col justify-center items-center'>
                    {currentStep === 1 && (
                        <AddressMenu 
                            handleSelectAddress={handleSelectAddress}
                        />
                    )}
                    {currentStep === 2 && (
                        <PaymentMenu 
                            handleSelectPayment={handleSelectPayment}
                        />
                    )}
                    <ModalFooter className='w-full'>
                        {currentStep === 1 && (
                            <Button fullWidth color="default" onPress={() => handleContinue()}>Continuar</Button>
                        )}
                        {currentStep === 2 && (
                            <Button fullWidth color="default" onPress={() => handleContinue(true)}>Volver</Button>
                        )}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </section>
    );
};

export default CheckOut;