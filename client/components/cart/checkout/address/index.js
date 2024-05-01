// AddressMenu.js
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalContent, ModalFooter, Tabs, Tab } from '@nextui-org/react';
import { useAppContext } from '@context/AppContext';
import { useRouter } from 'next/router';
import AddressService from '@services/addressService';
import AuthTabs from '@components/auth/authMenu/partials/authTabs';
import AddressList from '@components/cart/checkout/address/partials/addressList';
import AddressForm from '@components/cart/checkout/address/partials/addressForm';

const AddressMenu = () => {
    const router = useRouter();
    const [ UserAddress, SetUserAddress ] = useState([]);
    const [ showForm, setShowForm ] = useState(false);
    const [ editAddress, setEditAddress ] = useState(null);
    const { isLoggedIn } = useAppContext();

    const fetchAddress = async () => {
        console.log('fetching address');
        const addressData = await AddressService.getAddressByUserId();
        SetUserAddress(addressData);
        if(addressData.length === 0) {
            setShowForm(true);
        }
    };

    useEffect(() => {
        if(isLoggedIn && !showForm){
            fetchAddress();
        }
    }, [showForm]);

    const handleDelete = async (id) => {
        await AddressService.deleteAddress(id);
        fetchAddress();
    }

    const handleEdit = (address) => {
        setShowForm(true);
        setEditAddress(address);
        fetchAddress();
    }

    const handleAddAddress = async (address) => {
        setEditAddress(null);
        setShowForm(true);
    }

    return (
        <section className="flex flex-col justify-center items-center">
            {isLoggedIn ? (
                <section>
                    {!showForm && UserAddress?.length > 0 && (
                        <section className="flex flex-col justify-center items-center">
                            <AddressList 
                                addressList={UserAddress}
                                handleDelete={handleDelete}
                                handleEdit={handleEdit}
                            />
                            <Button 
                                onPress={handleAddAddress}
                                className="w-full"
                            >
                                Añadir dirección
                            </Button>
                        </section>
                    )}
                    {showForm &&(
                        <section className="flex flex-col gap-1">
                            <AddressForm setShowForm={setShowForm} editAddress={editAddress} setEditAddress={setEditAddress}/>
                            {UserAddress?.length !== 0 && (
                                <Button onPress={() => setShowForm(false)} className="w-full">Cancelar</Button>
                            )}
                        </section>
                    )}
                </section>
            ) : (
                <AuthTabs/>
            )}
        </section>
    );
};

export default AddressMenu;