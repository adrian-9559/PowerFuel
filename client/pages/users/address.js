import React from 'react';
import { Input, Button } from "@nextui-org/react";
import { motion } from 'framer-motion';
import SideMenu from '../../components/users/sideMenu';
import { addAddress } from '../../services/addressService';
import AddressesList from '../../components/users/addressList';

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(isInvalidDireccion || isInvalidCodigoPostal || isInvalidCiudad || isInvalidProvincia || isInvalidPais || isInvalidTelefono) {
            alert("Por favor, rellene todos los campos correctamente");
            return;
        }

        // Crea un objeto address con los valores del formulario
        const address = {
            street,
            portalNumber,
            floorDoor,
            addressLine2,
            zip,
            city,
            province,
            country,
            phone_number
        };

        try {
            // Llama al servicio addAddress
            const newAddress = await addAddress(address);
            console.log('Nueva dirección añadida:', newAddress);
        } catch (error) {
            console.error('Error al añadir la dirección:', error);
        }
    }

    

    const getColor = (value, isValid) => {
        if (value === '') return 'default';
        return isValid ? '' : 'danger';
    };
    
    return (
        <section>
            <SideMenu />
            <motion.main
                className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-xl w-2/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <AddressesList />
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <Input label="Dirección:" value={street} onChange={e => setStreet(e.target.value)} color={getColor(street, !isInvalidDireccion)} errorMessage={isInvalidDireccion && "Por favor, introduce una dirección válida"}/>
                    <section>
                        <Input label="Portal / Número:" value={portalNumber} onChange={e => setPortalNumber(e.target.value)}/>
                        <Input label="Piso y Puerta (Opcional):" value={floorDoor} onChange={e => setFloorDoor(e.target.value)}/>
                    </section>
                    <Input label="Dirección Línea 2 (Opcional):" value={addressLine2} onChange={e => setAddressLine2(e.target.value)} /> {/* Nuevo campo para address_line2 */}
                    <Input label="Código Postal:" value={zip} onChange={e => setZip(e.target.value)} color={getColor(zip, !isInvalidCodigoPostal)} errorMessage={isInvalidCodigoPostal && "Por favor, introduce un código postal válido"}/>
                    <Input label="Ciudad:" value={city} onChange={e => setCity(e.target.value)} color={getColor(city, !isInvalidCiudad)} errorMessage={isInvalidCiudad && "Por favor, introduce una ciudad válida"}/>
                    <Input label="Provincia:" value={province} onChange={e => setProvince(e.target.value)} color={getColor(province, !isInvalidProvincia)} errorMessage={isInvalidProvincia && "Por favor, introduce una provincia válida"}/>
                    <Input label="País:" value={country} onChange={e => setCountry(e.target.value)} color={getColor(country, !isInvalidPais)} errorMessage={isInvalidPais && "Por favor, introduce un país válido"}/>
                    <Input label="Teléfono:" value={phone_number} onChange={e => setPhone(e.target.value)} color={getColor(phone_number, !isInvalidTelefono)} errorMessage={isInvalidTelefono && "Por favor, introduce un teléfono válido"}/>
                    <Button color="primary" auto onClick={handleSubmit}>Añadir dirección</Button>
                </form>
            </motion.main>
        </section>
    );
}

export default Address;