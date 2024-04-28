import React, { useState } from 'react';

const AddressForm = () => {
    const [address, setAddress] = useState('');

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

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

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 justify-content'>
                        <section className="flex flex-row justify-center gap-4 items-center">
                            <section className="flex flex-col justify-center gap-4 items-center">
                                <Input label="Dirección:" value={street} onChange={e => setStreet(e.target.value)} color={getColor(street, !isInvalidDireccion)} errorMessage={isInvalidDireccion && "Por favor, introduce una dirección válida"}/>
                                <Input label="Portal / Número:" value={portalNumber} onChange={e => setPortalNumber(e.target.value)}/>
                                <Input label="Piso y Puerta (Opcional):" value={floorDoor} onChange={e => setFloorDoor(e.target.value)}/>
                                <Input label="Dirección Línea 2 (Opcional):" value={addressLine2} onChange={e => setAddressLine2(e.target.value)} /> {/* Nuevo campo para address_line2 */}
                            </section>
                            <sction className="flex flex-col justify-center gap-4 items-center">
                                <Input label="Código Postal:" value={zip} onChange={e => setZip(e.target.value)} color={getColor(zip, !isInvalidCodigoPostal)} errorMessage={isInvalidCodigoPostal && "Por favor, introduce un código postal válido"}/>
                                <Input label="Ciudad:" value={city} onChange={e => setCity(e.target.value)} color={getColor(city, !isInvalidCiudad)} errorMessage={isInvalidCiudad && "Por favor, introduce una ciudad válida"}/>
                                <Input label="Provincia:" value={province} onChange={e => setProvince(e.target.value)} color={getColor(province, !isInvalidProvincia)} errorMessage={isInvalidProvincia && "Por favor, introduce una provincia válida"}/>
                                <Input label="País:" value={country} onChange={e => setCountry(e.target.value)} color={getColor(country, !isInvalidPais)} errorMessage={isInvalidPais && "Por favor, introduce un país válido"}/>
                            </sction>
                        </section>
                        <Input label="Teléfono:" value={phone_number} onChange={e => setPhone(e.target.value)} color={getColor(phone_number, !isInvalidTelefono)} errorMessage={isInvalidTelefono && "Por favor, introduce un teléfono válido"}/>
                        <Button color="primary" auto onClick={handleSubmit}>Añadir dirección</Button>
                    </form>
    );
};

export default AddressForm;