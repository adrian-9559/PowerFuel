import React, { useEffect, useState } from 'react';
import PaymentService from '@services/paymentService';
import PaymentItem from './paymentItem';

const PaymentList = () => {
    const [paymentMethods, setPaymentMethods] = useState([]);

    useEffect(() => {
        const fetchPaymentMethods = async () => {
            try {
                const response = await PaymentService.getCustomerPaymentMethods();
                setPaymentMethods(response.data);
            } catch (error) {
                console.error('Error al obtener los métodos de pago:', error);
            }
        };

        fetchPaymentMethods();
    }, []);

    return (
        <div>
            <h2>Lista de métodos de pago</h2>
            {paymentMethods && paymentMethods.length > 0 && paymentMethods.map((method) => (
                <PaymentItem key={method.id} method={method} />
            ))}
            {paymentMethods && paymentMethods.length === 0 && <p>No hay métodos de pago disponibles</p>}
        </div>
    );
};

export default PaymentList;