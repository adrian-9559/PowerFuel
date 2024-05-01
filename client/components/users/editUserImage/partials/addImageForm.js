import React, { useState } from 'react';
import { Button } from "@nextui-org/react";
import UserService from '@services/userService';
import { useRouter } from 'next/router';

const AddImageForm = ({onOpenChange, setImageURL}) => {
    const [image, setImage] = useState();
    const router = useRouter();

    const handleSubmit = async (image) => {
        const response = await UserService.setUserImage(image);
        if (response.status === 200) {

            setImageURL(`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/user/${user.user_id}/1.png`);
            onOpenChange();

        }
    };

    return (
        <form className='grid'>
            <h2 className="text-2xl font-bold">Añadir Imagen:</h2>
            <section className="mb-4">
                <input type='file' multiple id='images' className="w-full px-4 py-2 rounded-lg" onChange={(e) => setImage(e.target.files)}/>
            </section>
            <Button type="submit" className='bg-gray-400 text-black' onClick={handleSubmit}>Guardar</Button>
        </form>
    );
};

export default AddImageForm;