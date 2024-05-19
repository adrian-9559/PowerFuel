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
        <section className="py-5 flex flex-col gap-4 ">
            <h1 className="font-bold text-3xl">Lista de direcciones de envio</h1>
            <ul className='flex flex-col gap-4 '>
                {addressList && addressList.map((address, index) => (
                    <li>
                        <AddressItem key={index} address={address} />
                    </li>
                ))} 
                {!addressList && <p>No hay direcciones de envío</p>}
            </ul>
        </section>
    );
}

export default AddressList;