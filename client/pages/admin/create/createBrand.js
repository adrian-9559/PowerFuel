import React, { useState, useEffect } from 'react';
import { Input, Button, Card } from "@nextui-org/react";
import BrandService from '@services/brandService';
import { useRouter } from 'next/router';

const CreateBrand = () => {
    const router = useRouter();
    const [error, setError] = useState('');
    const [brandName, setBrandName] = useState('');
    const [loading, setLoading] = useState(false);
    const { id, readOnly } = router.query;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!brandName) {
            setError('Please fill in all required fields.');
            return;
        }

        setLoading(true);
        try {
            if (id && id.trim() !== '') {
                await BrandService.updateBrand(id, brandName);
            } else {
                await BrandService.addBrand(brandName);
            }
            router.push('/admin/Marcas');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            const fetchBrand = async () => {
                try {
                    const res = await BrandService.getBrandById(id);
                    setBrandName(res.brand_name);
                } catch (error) {
                    setError(error.message);
                }
            }
            fetchBrand();
        }
    }, [id]);

    return (
        <main
            className="max-w-4xl mx-auto my-32 p-6"
        >
            <Card shadow className="p-5">
                <h1 className="text-2xl font-bold mb-4">Crear Marca</h1>
                <form onSubmit={handleSubmit}>
                    <section className="mb-4">
                        <Input
                            name='brand_name'
                            type='text'
                            label='Nombre de la marca'
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                            onClear={readOnly ? undefined : () => setBrandName('')}
                            readOnly={readOnly === "true"}
                        />
                    </section>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <section>
                        {!readOnly && readOnly !== "true" && (
                            <Button type='submit' disabled={loading} className="w-full">{loading ? 'Cargando...' : id ? 'Guardar cambios' : 'Crear Marca'}</Button>
                        )}
                        <Button type='button' color="danger" onClick={() => router.push('/admin/Marcas')} className="w-full mt-4">Cancelar</Button>
                    </section>
                </form>
            </Card>
        </main>
    );
}

export default CreateBrand;