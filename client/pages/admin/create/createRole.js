import React, { useState, useEffect } from 'react';
import {Input, Button, Card} from "@nextui-org/react";
import RoleService from '@services/roleService';
import { useRouter } from 'next/router';

const CreateRole = () => {
    const router = useRouter();
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const {id, readOnly} = router.query;

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
            router.push('/admin/Roles');
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
                setName(res.role_name);
            } catch (error) {
                setError(error.message);
            }
        }
        fetchRol();
    }
}, [id]);

    return (
        <main className="max-w-4xl mx-auto my-32 p-6">
            <Card shadow>
                <div style={{ padding: '20px' }}>
                    <h1 className="text-2xl font-bold mb-4">Crear Role</h1>
                    <form onSubmit={handleSubmit}>
                        <section className="mb-4">
                        <Input
                            name='rol_name'
                            type='text' 
                            label='Nombre del role' 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            onClear={readOnly ? undefined : () => setName('')}
                            readOnly={readOnly === "true"}
                        />
                        </section>
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                        <section>
                            {!readOnly && readOnly !== "true" && (
                                <Button type='submit' disabled={loading} className="w-full">{loading ? 'Cargando...' : {id} ? 'Guardar cambios' : 'Crear Producto'}</Button>
                                
                            )}
                            <Button type='button' color="danger" onClick={() => router.push('/admin/Roles')} className="w-full mt-4">Cancelar</Button>
                        </section>
                    </form>
                </div>
            </Card>
        </main>
    );
}

export default CreateRole;