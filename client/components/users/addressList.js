import React, { useState, useEffect } from 'react';
import AddressService from '../../services/addressService';

const AddressList = () => {
    const [addressList, setAddressList] = useState([]);
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;

    useEffect(() => {
        AddressService.getAddressByUserId(token).then((response) => {
            setAddressList(response.data);
        });
    }, []);

    return (
        <section>
            <h1>Lista de direcciones de envio</h1>
            <ul>
                {addressList ? addressList.map(address => (
                    <li key={address.address_id}>
                        <section>{address.street}</section>
                        <section>{address.city}</section>
                        <section>{address.country}</section>
                        <section>{address.zip}</section>
                        <section>{address.province}</section>
                        <section>{address.phone_number}</section>
                    </li>
                ) ) : (
                    <li>No hay direcciones de envio</li>
                )}
            </ul>
        </section>
    );
}

export default AddressList;