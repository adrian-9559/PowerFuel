import React, { useState, useEffect } from 'react';
import AddressItem from './partials/addressItem';
import { RadioGroup, Radio , cn} from '@nextui-org/react';

const AddressList = ({addressList, handleDelete, handleEdit, handleSelectAddress}) => {
    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        const defaultAddress = addressList.find(address => address.is_default);
        if (defaultAddress) {
            setSelectedAddress(defaultAddress.address_id);
        }
    }, [addressList]);

    const handleValueChange = (value) => {
        setSelectedAddress(value);
        handleSelectAddress(value);
    }

    return (
        <section className="flex flex-col justify-center items-center">
            <RadioGroup 
                value={selectedAddress} 
                onValueChange={handleValueChange}
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