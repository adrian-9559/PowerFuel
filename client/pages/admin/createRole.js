import React, { useState, useEffect } from 'react';
import {Input, Button} from "@nextui-org/react";
import RoleService from '@services/roleService';
import { useRouter } from 'next/router';

const CreateRole = () => {
    const router = useRouter();
    const {id} = router.query;
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            setError('Please fill in all required fields.');
            return;
        }
    
        setLoading(true);
        try {
            if (id && id.trim() !== '') {
                console.log('id', id);
                await RoleService.updateRole(id, name);
            } else {
                // If no id is provided or it's an empty string, add a new role
                await RoleService.addRole(name);
            }
            router.push('/admin?tab=roles');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
    if (id) {
        const fetchRol = async () => {
            try {
                const res = await RoleService.getRoleById(id);
                setName(res.role_name); // changed from res.rol_name to res.role_name
            } catch (error) {
                setError(error.message);
            }
        }
        fetchRol();
    }
}, [id]);

    return (
        <main
            className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-xl"
        >
            <h1 className="text-2xl font-bold mb-4">Crear Role</h1>
            <form onSubmit={handleSubmit}>
                <section className="mb-4">
                    <Input
                        name='rol_name'
                        type='text' 
                        label='Nombre del role' 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        onClear={() => setName('')}
                    />
                </section>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <section className="mb-4">
                    <Button type='submit' disabled={loading} className="w-full">{id ? 'Guardar' : 'Crear Role'}</Button>
                    {loading && <p className="text-blue-500 text-sm mt-2">Cargando...</p>}
                    <Button type='button' color="danger" onClick={() => router.push('/admin?tab=roles')} className="w-full mt-4">Cancelar</Button>
                </section>
            </form>
        </main>
    );
}

export default CreateRole;