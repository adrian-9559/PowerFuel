import React, { useState } from 'react';
import {Input, Button} from '@nextui-org/react';
import AddressService from '@services/addressService';

const AddressForm = ({setShowForm}) => {
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [zip, setZip] = useState('');
    const [province, setProvince] = useState('');
    const [phone_number, setPhone] = useState('');

    const stateSetters = {
        street: setStreet,
        city: setCity,
        country: setCountry,
        zip: setZip,
        province: setProvince,
        phone_number: setPhone
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const setState = stateSetters[name];
        if (setState) {
            setState(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const address = {
            street,
            city,
            country,
            zip,
            province,
            phone_number
        };
        try {
            const response = await AddressService.addAddress(address);
            setShowForm(response?false:true);
        } catch (error) {
            console.error("Ha ocurrido un error al añadir la dirección", error);
        }
    }

    return (
        <section>
            <h2 className="text-2xl font-bold">Añadir dirección</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 justify-content'>
                <section className="flex flex-row justify-center gap-4 items-center">
                    <section className="flex flex-col justify-center gap-4 items-center">
                        <Input name="street" label="Dirección:" defaultValue={street} onChange={handleChange} />
                        <Input name="city" label="Ciudad:" defaultValue={city} onChange={handleChange} />
                        <Input name="zip" label="Código Postal:" defaultValue={zip} onChange={handleChange}/>
                    </section>
                    <section className="flex flex-col justify-center gap-4 items-center">
                        <Input name="province" label="Provincia/Estado:" defaultValue={province} onChange={handleChange} />
                        <Input name="country" label="País:" defaultValue={country} onChange={handleChange} />
                        <Input name="phone_number" label="Teléfono:" defaultValue={phone_number} onChange={handleChange} />
                    </section>
                </section>
                <Button color="primary" auto onClick={handleSubmit}>Añadir dirección</Button>
            </form>
        </section>
    );
};

export default AddressForm;