import React, { useState, useEffect } from 'react';
import AddressService from '@services/addressService';
import AddressItem from './addressItem';

const AddressList = () => {
    const [addressList, setAddressList] = useState([]);

    useEffect(() => {
        fetchAddress();
    });

    const fetchAddress = async () => {
        const addressData = await AddressService.getAddressByUserId();
        setAddressList(addressData);
    };

    return (
        <main className="py-5">
            <h1 className="font-bold text-3xl">Lista de direcciones de envio</h1>
            <section>
                {addressList && addressList.map((address, index) => (
                    <AddressItem key={index} address={address} />
                ))} 
                {!addressList && <p>No hay direcciones de envío</p>}
            </section>
        </main>
    );
}

export default AddressList;