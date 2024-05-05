import { Button, Input } from "@nextui-org/react";
import { useState } from 'react';
import { addRole } from '@services/roleService';
import { useRouter } from 'next/router';

const CreateRole = () => {
    const [nameRole, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!nameRole) {
            setError('Please fill in all required fields.');
            return;
        }

        setLoading(true);
        try {
            const role = {
                name: nameRole,
                // Add other role attributes here
            };
    
            await addRole(role); // Use the service to add a role
            navigate('/admin');
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
                        type='text' 
                        label='Nombre del role en la base de datos' 
                        value={nameRole} 
                        onChange={(e) => setName(e.target.value)} 
                        onClear={() => setName('')}
                    />
                </section>
                <section className="mb-4">
                    <Button type='submit' disabled={loading} className="w-full">{loading ? 'Cargando...' : 'Crear Role'}</Button>
                    <Button type='button' color="danger" onClick={() => router.push('/admin')} className="w-full mt-4">Cancelar</Button>
                </section>
            </form>
        </main>
    );
}

export default CreateRole;