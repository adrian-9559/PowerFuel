import { Button, Input } from "@nextui-org/react";
import { useState } from 'react';
import RoleService from '@services/roleService';
import { useRouter } from 'next/router';

const CreateRole = () => {
    const [nameRole, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!nameRole) {
            setError('Please fill in all required fields.');
            return;
        }

        setLoading(true);
        try {
    
            await RoleService.addRole(nameRole);
            router.push('/admin?tab=roles');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main
            className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-xl"
        >
            <h1 className="text-2xl font-bold mb-4">Crear Role</h1>
            <form onSubmit={handleRegister}>
                <section className="mb-4">
                    <Input
                        name='rol_name'
                        type='text' 
                        label='Nombre del role' 
                        defaultValue={nameRole} 
                        onChange={(e) => setName(e.target.value)} 
                        onClear={() => setName('')}
                    />
                </section>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <section className="mb-4">
                    <Button type='submit' disabled={loading} className="w-full">{loading ? 'Cargando...' : 'Crear Role'}</Button>
                    <Button type='button' color="danger" onClick={() => router.push('/admin?tab=roles')} className="w-full mt-4">Cancelar</Button>
                </section>
            </form>
        </main>
    );
}

export default CreateRole;