// UserImage.js
import React, { useEffect, useState } from 'react';
import { Image, Button } from "@nextui-org/react";

const UserImage = ({user}) => {
    const [hasError, setHasError] = useState(false);
    const token = typeof window !== 'undefined' ? window.sessionStorage.getItem('token') : null;
    const [image, setImage] = useState(false);;

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
        return intToRGB(hashCode(token));
    };

    const style = {
        backgroundColor: getProfileColor(),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontSize: '1.5em'
    };
    
    useEffect(() => {
        if (user) {
            fetch(`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/user/${user.user_id}/1.png`)
                .then((response) => {
                    if (!response.ok || response.status === 404) {
                        throw new Error('Network response was not ok');
                    }
                    setImage(true);  
                })
                .catch(() => {
                    setImage(false);  
                });
        } else {
            setImage(false);
        }
    }, []);



    return (
        <section style={style} className='w-full h-full rounded-full'>
            {image ? (  
                <Image 
                    className="object-cover h-full w-full " 
                    src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/user/${user.user_id}/1.png`} 
                    alt="User Image"
                    radius="full"
                />
            ) : user.first_name && user.last_name ?  (
                `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
            )

            }
        </section>
    );
};

export default UserImage;