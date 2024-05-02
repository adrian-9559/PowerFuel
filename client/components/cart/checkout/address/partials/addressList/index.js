// AddressList.js
import React, { useState, useEffect } from 'react';
import AddressItem from './partials/addressItem';
import { RadioGroup, Radio , cn} from '@nextui-org/react';

const AddressList = ({addressList, handleDelete, handleEdit}) => {
    const [defaultAddress, setDefaultAddress] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        const defaultAddress = addressList.find(address => address.is_default);
        if (defaultAddress) {
            console.log("defaultAddress",defaultAddress);
            setDefaultAddress(defaultAddress.address_id);
        }
    }, [defaultAddress]);

    useEffect(() => {
        if (selectedAddress) {
            console.log("selectedAddress",selectedAddress);
        }
    }, [selectedAddress]);

    return (
        <section className="flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold">Seleccionar dirección</h2>
            <RadioGroup 
                defaultValue={defaultAddress} 
                onValueChange={setSelectedAddress}

            >
                {addressList.map((address) => (
                    <Radio 
                        key={address.address_id}
                        value={address.address_id}
                        classNames={{
                            base: cn(
                            "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                            " max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                            "data-[selected=true]:border-primary"
                            ),
                        }}
                    >
                        <AddressItem
                            address={address}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    </Radio>
                ))}
            </RadioGroup>   
        </section>
    );
};

export default AddressList;