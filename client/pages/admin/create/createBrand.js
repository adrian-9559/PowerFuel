import React, { useState, useEffect } from 'react';
import { Input, Button, Card } from "@nextui-org/react";
import BrandService from '@services/brandService';
import { useRouter } from 'next/router';
import useTitle from '@hooks/useTitle'; 

const CreateBrand = () => {
    const router = useRouter();
    const [brandName, setBrandName] = useState(null); 
    const [isInvalid, setIsInvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { id, readOnly } = router.query;
    useTitle(id ? 'Editar Marca' : 'Crear Marca');

    useEffect(() => {
        if (id) {
            const fetchBrand = async () => {
                const res = await BrandService.getBrandById(id);
                setBrandName(res.brand_name);
            }
            fetchBrand();
        }
    }, [id]);

    useEffect(() => {
        if (brandName === '') {
            setIsInvalid(true);
        } else {
            setIsInvalid(false);
        }
    }, [brandName]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if(isInvalid || brandName === null) {
                setIsInvalid(true) 
                return;
            }

            setIsLoading(true);
            if (id) {
                await BrandService.updateBrand(id, brandName);
            } else {
                await BrandService.addBrand(brandName);
            }
            setIsLoading(false);
            router.push('/admin/Marcas');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <main className="max-w-4xl mx-auto my-32 p-6">
            <Card shadow className="p-5">
                <h1 className="text-2xl font-bold mb-4">{id ? 'Editar Marca' : 'Crear Marca'}</h1>
                <form onSubmit={handleSubmit}>
                    <section className="mb-4">
                        <Input
                            name='brand_name'
                            type='text'
                            label='Nombre de la marca'
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value.trim())}
                            onClear={() => setBrandName('')}
                            readOnly={readOnly === "true"}
                            isInvalid={isInvalid}
                            isRequired
                            errorMessage='Este campo es obligatorio'
                        />
                    </section>
                    <section>
                        <Button type='submit' className="w-full">{isLoading ? 'Cargando...' : id ? 'Editar' : 'Crear'}</Button>
                        <Button type='button' color="danger" onClick={() => router.push('/admin/Marcas')} className="w-full mt-4">Cancelar</Button>
                    </section>
                </form>
            </Card>
        </main>
    );
}

export default CreateBrand;