import React from 'react';
import AddressItem from './partials/addressItem';

const AddressList = ({addressList}) => {
    return (
        <section>
            <h2>Lista de Direcciones de Envío</h2>
            <ul>
                {addressList.map((address) => (
                    <AddressItem
                        key={address.address_id}
                        address={address} 
                    />
                ))}
            </ul>   
        </section>
    );
};

export default AddressList;