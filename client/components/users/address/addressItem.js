import React, { useState, useEffect } from 'react';

const AddressItem = ({ address }) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{address.street}</h5>
                <p className="card-text">{address.city}</p>
                <p className="card-text">{address.province}</p>
                <p className="card-text">{address.country}</p>
                <p className="card-text">{address.zip}</p>
                <p className="card-text">{address.phone_number}</p>
            </div>
        </div>
    )
}

export default AddressItem;