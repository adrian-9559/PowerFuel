import React, { useState, useEffect } from 'react';
import { getAddressByUserId } from '../../services/addressService';

const AddressList = () => {
    const [addressList, setAddressList] = useState([]);

    useEffect(() => {
        fetch(getAddressByUserId())
            .then(response => response.json())
            .then(data => setAddressList(data))
            .catch(err => console.log(err));
    }, []);

    return (
        <section>
            <h1>Lista de direcciones de envio</h1>
            <ul>
                {addressList.map(address => (
                    <li key={address.address_id}>
                        <section>{address.street}</section>
                        <section>{address.city}</section>
                        <section>{address.country}</section>
                        <section>{address.zip}</section>
                        <section>{address.province}</section>
                        <section>{address.phone_number}</section>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default AddressList;