import React, { useState, useEffect } from 'react';
import { Card } from '@nextui-org/react';


const AddressItem = ({ address }) => {
    return (
        <Card className='w-full'>
            <h5 className="card-title">{address.street}</h5>
            <p className="card-text">{address.city}</p>
            <p className="card-text">{address.province}</p>
            <p className="card-text">{address.country}</p>
            <p className="card-text">{address.zip}</p>
            <p className="card-text">{address.phone_number}</p>
        </Card>
    )
}

export default AddressItem;