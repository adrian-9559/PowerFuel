import React from 'react';
import { Input, Button } from "@nextui-org/react";
import SideMenu from '@components/users/sideMenu';
import { addAddress } from '@services/addressService';
import AddressesList from '@components/users/address/addressList';

const Address = () => {
    const [street, setStreet] = React.useState('');
    const [portalNumber, setPortalNumber] = React.useState('');
    const [floorDoor, setFloorDoor] = React.useState('');
    const [addressLine2, setAddressLine2] = React.useState('');
    const [zip, setZip] = React.useState('');
    const [city, setCity] = React.useState('');
    const [province, setProvince] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [phone_number, setPhone] = React.useState('');
    
    const validateDireccion = (value) => value === '' || value.match(/^[a-zA-Z0-9\sñÑáéíóúÁÉÍÓÚ,C\\/]*$/);
    const validateCodigoPostal = (value) => value === '' || value.match(/^\d{5}$/);
    const validateCiudad = (value) => value === '' || value.match(/^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]*$/);
    const validateProvincia = (value) => value === '' || value.match(/^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]*$/);
    const validatePais = (value) => value === '' || value.match(/^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]*$/);
    const validateTelefono = (value) => value === '' || value.match(/^\d{9}$/);

    const isInvalidDireccion = !validateDireccion(street);
    const isInvalidCodigoPostal = !validateCodigoPostal(zip);
    const isInvalidCiudad = !validateCiudad(city);
    const isInvalidProvincia = !validateProvincia(province);
    const isInvalidPais = !validatePais(country);
    const isInvalidTelefono = !validateTelefono(phone_number);
    
    return (
        <section>
            <SideMenu />
            <main
                className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-xl w-2/5"
            >
                <p>Hola</p>
            </main>
        </section>
    );
}

export default Address;