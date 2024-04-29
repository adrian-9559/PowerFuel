import React from 'react';
import { Button, Checkbox } from '@nextui-org/react';
import AddressService from '@services/addressService';  

const AddressItem = ({ address}) => {


    const handleDelete = () => {
        AddressService.deleteAddress(address.address_id);
    }
    //HAY QUE HACER QUE AL BORRAR SE ACTUALICE EN LA LISTA DE DIRECCIONES
    return (
        <li key={address.address_id} style={{margin: '10px', padding: '10px', border: '1px solid black'}}>
            <Checkbox/>
            {address.street}
            <Button size="small" color="primary" >Editar</Button>
            <Button size="small" color="error" onPress={handleDelete}>Borrar</Button>
        </li>
    );
};

export default AddressItem;