import React, { useState, useEffect } from 'react';
import { Input, Button, Card } from "@nextui-org/react";
import RoleService from '@services/roleService';
import { useRouter } from 'next/router';
import useTitle from '@hooks/useTitle'; 

const CreateRole = () => {
    const router = useRouter();
    const [roleName, setRoleName] = useState(null); 
    const [isInvalid, setIsInvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = router.query;
    useTitle(id ? 'Editar Role' : 'Crear Role');
    
    const fetchRole = async () => {
        
        const res = await RoleService.getRoleById(id);
        setRoleName(res.role_name);
    }
    useEffect(() => {
            fetchRole();
    }, [id]);

    useEffect(() => {
        const roleNameRegex = /^[a-zA-Z\s]{1,50}$/;
        setIsInvalid(!roleNameRegex.test(roleName));
    }, [roleName]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(isInvalid) {
            return;
        }

        try {
            setIsLoading(true);
            if (id) {
                await RoleService.updateRole(id, roleName);
            } else {
                await RoleService.addRole(roleName);
            }
            setIsLoading(false);
            router.push('/admin/Roles');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <main className="max-w-4xl mx-auto my-32 p-6">
            <Card shadow className="p-5">
                <h1 className="text-2xl font-bold mb-4">{id ? 'Editar Role' : 'Crear Role'}</h1>
                <form onSubmit={handleSubmit}>
                    <section className="mb-4">
                        <Input
                            name='role_name'
                            type='text'
                            label='Nombre del role'
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value.trim())}
                            onClear={() => setRoleName('')}
                            isInvalid={isInvalid}
                            isRequired
                            errorMessage='Formato inválido. Solo se permiten letras y espacios. Máximo 50 caracteres.'
                        />
                    </section>
                    <section>
                        <Button type='submit' className="w-full">{isLoading ? 'Cargando...' : id ? 'Editar' : 'Crear'}</Button>
                        <Button type='button' color="danger" onClick={() => router.push('/admin/Roles')} className="w-full mt-4">Cancelar</Button>
                    </section>
                </form>
            </Card>
        </main>
    );
}

export default CreateRole;