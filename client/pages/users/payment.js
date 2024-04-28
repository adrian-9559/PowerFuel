import React, { useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import { motion } from 'framer-motion';
import SideMenu from '@components/users/sideMenu';

const AddCreditCard = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [cvv, setCvv] = useState('');

    const validateCardNumber = (value) => value === '' || value.match(/^\d{16}$/);
    const validateExpiryDate = (value) => value === '' || value.match(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/);
    const validateCardHolder = (value) => value === '' || value.match(/^[a-zA-Z\s]*$/);
    const validateCvv = (value) => value === '' || value.match(/^\d{3}$/);

    const isInvalidCardNumber = !validateCardNumber(cardNumber);
    const isInvalidExpiryDate = !validateExpiryDate(expiryDate);
    const isInvalidCardHolder = !validateCardHolder(cardHolder);
    const isInvalidCvv = !validateCvv(cvv);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(isInvalidCardNumber || isInvalidExpiryDate || isInvalidCardHolder || isInvalidCvv) {
            alert("Por favor, introduce detalles válidos de la tarjeta");
            return;
        }
        console.log(cardNumber, expiryDate, cardHolder, cvv);
    }

    const getColor = (value, isValid) => {
        if (value === '') return 'default';
        return isValid ? '' : 'danger';
    };

    return (
        <section>
            <SideMenu />
            <main className='w-full flex flex-row justify-center pt-6'>
                <motion.section
                    className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-xl w-2/5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                        <Input label="Número de tarjeta:" value={cardNumber} onChange={e => setCardNumber(e.target.value)} color={getColor(cardNumber, !isInvalidCardNumber)} errorMessage={isInvalidCardNumber && "Por favor, introduce un número de tarjeta válido"}/>
                        <Input label="Fecha de vencimiento:" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} color={getColor(expiryDate, !isInvalidExpiryDate)} errorMessage={isInvalidExpiryDate && "Por favor, introduce una fecha de vencimiento válida"}/>
                        <Input label="Nombre del titular:" value={cardHolder} onChange={e => setCardHolder(e.target.value)} color={getColor(cardHolder, !isInvalidCardHolder)} errorMessage={isInvalidCardHolder && "Por favor, introduce un nombre de titular válido"}/>
                        <Input label="CVV:" value={cvv} onChange={e => setCvv(e.target.value)} color={getColor(cvv, !isInvalidCvv)} errorMessage={isInvalidCvv && "Por favor, introduce un CVV válido"}/>
                        <Button color="primary" auto onClick={handleSubmit}>Añadir tarjeta</Button>
                    </form>
                </motion.section>
            </main> 
        </section>
    );
}

export default AddCreditCard;