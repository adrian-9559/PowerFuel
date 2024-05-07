import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useState, useEffect } from 'react';
import UserService from '@services/userService';
import RoleService from '@services/roleService';
import { useRouter } from 'next/router';

const CreateUser = ({ userIdToEdit }) => {
    const router = useRouter();
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        if(userIdToEdit){
            const fetchUser = async () => {
                try {
                    const response = await UserService.getUserById(userIdToEdit);
                    handleChange(response.data);
                } catch (error) {
                    console.log(error);
                }
            }
            fetchUser();
        }
        const fetchRoles = async () => {
            try {
                const response = await RoleService.getAllRoles();
                setRoles(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchRoles();
    }, []);

    const [user, setUser] = useState({
        email:  '',
        current_password:  '',
        first_name:  '',
        last_name:  '',
        dni: '',
        role: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userToEdit) {
            await UserService.updateUser(userToEdit.id, user);
        } else {
            await UserService.registerUser(user);
        }
        router.push('/admin?tab=usuarios');
    }

    return (
        <div>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    name="email"
                    placeholder="Email"
                    defaultValue={user.email}
                    onChange={handleChange}
                    aria-label="Email"
                    required
                />
                <Input
                    name="current_password"
                    placeholder="Contraseña"
                    defaultValue={user.current_password}
                    onChange={handleChange}
                    aria-label="Contraseña"
                    required
                />
                <Input
                    name="first_name"
                    placeholder="Nombre"
                    defaultValue={user.first_name}
                    onChange={handleChange}
                    aria-label="Nombre"
                    required
                />
                <Input
                    name="last_name"
                    placeholder="Apellidos"
                    defaultValue={user.last_name}
                    onChange={handleChange}
                    aria-label="Apellidos"
                    required
                />
                <Input
                    name="dni"
                    placeholder="DNI"
                    defaultValue={user.dni}
                    onChange={handleChange}
                    aria-label="DNI"
                    required
                />
                <Select
                    name="role"
                    placeholder="Role"
                    defaultValue={user.role}
                    onChange={handleChange}
                    aria-label="Role"
                    required
                >
                    {roles && roles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                            {role.role_name.value}
                        </SelectItem>
                    ))}
                </Select>
                <Button type="button" onClick={() => router.push('/admin?tab=usuarios')} aria-label="Cancelar">Cancelar</Button>
                <Button type="submit" aria-label="Crear">Crear</Button>
            </form>
        </div>
    );
}

export default CreateUser;