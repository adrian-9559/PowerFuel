import React from 'react';

const PaymentItem = ({ method }) => {
    return (
        <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>{method.card.brand} ending in {method.card.last4}</h3>
            <p>Expires: {method.card.exp_month}/{method.card.exp_year}</p>
            <p>Billing address: {method.billing_details.address.line1}, {method.billing_details.address.city}, {method.billing_details.address.postal_code}</p>
        </div>
    );
};

export default PaymentItem;