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
    const { isLoggedIn } = useAppContext();

    useEffect(() => {

        if(isLoggedIn&&!showForm){
            const fetchAddress = async () => {
                console.log('fetching address');
               const addressData = await AddressService.getAddressByUserId();
                SetUserAddress(addressData);
                if(addressData.length === 0) {
                    setShowForm(true);
                }
            };
    
            fetchAddress();
        }
    }, [showForm]);

    return (
        <section>
            {isLoggedIn ? (
                <section>
                    {!showForm && UserAddress?.length > 0 && (
                        <section>
                            <AddressList addressList={UserAddress} />
                            <Button onPress={() => setShowForm(true)}>Añadir dirección</Button>
                        </section>
                    )}
                    {showForm &&(
                        <section>
                            <AddressForm setShowForm={setShowForm}/>
                            {UserAddress?.length !== 0 && (
                                <Button onPress={() => setShowForm(false)}>Cancelar</Button>
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