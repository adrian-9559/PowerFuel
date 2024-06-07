// UserImage.js
import React, { useEffect, useState } from 'react';
import { Avatar } from "@nextui-org/react";

const UserImage = ({user}) => {
    const [style, setStyle] = useState({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontSize: '1.25em'
    });

    useEffect(() => {
        const hashCode = (str) => {
            let hash = 0;
            if(str)
                for (let i = 0; i < str.length; i++) {
                    hash = str.charCodeAt(i) + ((hash << 5) - hash);
                }
            return hash;
        };
        
        const intToRGB = (i) => {
            const c = (i & 0x00FFFFFF)
                .toString(16)
                .toUpperCase();
            return '#' + '00000'.substring(0, 6 - c.length) + c;
        };
        
        const getProfileColor = () => {
            const color =  intToRGB(hashCode(localStorage.getItem('auth_token')));
            return color;
        };
    
        setStyle((prevStyle) => ({
            ...prevStyle,
            backgroundColor: getProfileColor(),
        }));
    }, []);

    return (
        <section style={style} className='w-full h-full rounded-full'>
            <p 
            >
                {user.first_name.charAt(0)}{user.last_name.charAt(0)}
            </p>
        </section>
    );
};

export default UserImage;