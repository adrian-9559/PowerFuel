import React, { useState } from 'react';
import { Button } from "@nextui-org/react";
import UserService from '@services/userService';
import { useRouter } from 'next/router';

const AddImageForm = ({onOpenChange}) => {
    const [formState, setFormState] = useState({});
    const [image, setImage] = useState();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let i = 0; i < formState.images.length; i++) {
            formData.append('images', formState.images[i]);
        }
        const response = await UserService.setUserImage(formData);
        if (response.status === 200) {
            router.reload();
        }
    };

    return (
        <form className='grid'>
            <h2 className="text-2xl font-bold">Añadir Imagen:</h2>
            <section className="mb-4">
                <input 
                    type='file' 
                    multiple 
                    id='images' 
                    className="w-full px-4 py-2 rounded-lg" 
                    onChange={(e) => {
                        if (e.target.files.length > 1) {
                            alert('No puedes subir más de 1 imagen');
                        } else {
                            setFormState({...formState, images: e.target.files})
                        }
                    }}
                />
            </section>
            <Button type="submit" className='bg-gray-400 text-black' onClick={handleSubmit}>Guardar</Button>
        </form>
    );
};

export default AddImageForm;