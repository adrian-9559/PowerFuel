import { Button, Input, Select, SelectItem, Divider, Card, CardHeader, CardBody, CardFooter, Spinner } from "@nextui-org/react";
import { useState, useEffect } from 'react';
import UserService from '@services/userService';
import RoleService from '@services/roleService';
import { useRouter } from 'next/router';
import UserIcon2 from "@icons/UserIcon2";
import useTitle from '@hooks/useTitle'; 

const CreateUser = () => {
    const router = useRouter();
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [password2, setPassword2] = useState('');
    const {id, readOnly} = router.query;
    const [user, setUser] = useState({
        email:  '',
        current_password:  '',
        first_name:  '',
        last_name:  '',
        dni: '',
        role: '',
        status: 'Activo' // New state field
    });
    useTitle(id?'Editar Usuario':'Crear Usuario');

    useEffect(() => {
        setLoading(true);
    
        if(id){
            const fetchUser = async () => {
                try {
                    const response = await UserService.getUserById(id);
                    const { email, current_password, UserInfo, Roles } = response.data[0];
                    const { first_name, last_name, dni } = UserInfo;
                    const role = Roles[0].role_id;
                    setUser(prevUser => ({
                        ...prevUser,
                        email,
                        current_password,
                        first_name,
                        last_name,
                        dni,
                        role
                    }));
                    setPassword2(current_password)
                } catch (error) {
                    console.error(error);
                }
            }
            fetchUser();
        }
        const fetchRoles = async () => {
            try {
                const response = await RoleService.getAllRoles();
                setRoles(response);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        fetchRoles();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await UserService.updateUser(id, user);
        } else {
            await UserService.registerUser(user);
        }
        router.push('/admin/Usuarios');
    }

    const handleChangePassword2 = (event) => {
        setPassword2(event.target.value);
    };

    return (
        loading ? (
            <div className='w-[20rem] h-[20rem] flex justify-center items-center'>
                <Spinner />
            </div>
        ) : (
            <main className="max-w-full sm:max-w-4xl mx-auto my-10 p-4 sm:p-6">
                <Card shadow className="p-5">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <CardHeader className="flex flex-col sm:flex-row justify-between items-center gap-2">
                            <h1 className="text-2xl sm:text-3xl font-bold">{id ? 'Editar Usuario' : 'Crear Usuario'}</h1>
                            <section className="w-10">
                                <UserIcon2 />   
                            </section>
                        </CardHeader>
                        <Divider />
                        <CardBody className="grid gap-4 sm:gap-6">
                            <section>
                                <Input
                                    name="email"
                                    placeholder="Email"
                                    value={user.email}
                                    onChange={handleChange}
                                    aria-label="Email"
                                    fullWidth
                                    required
                                />
                            </section>
                            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <Input
                                    name="current_password"
                                    placeholder="Contraseña"
                                    value={user.current_password}
                                    onChange={handleChange}
                                    aria-label="Contraseña"
                                    required
                                />
                                <Input
                                    name="current_password2"
                                    placeholder="Repite Contraseña"
                                    value={password2}
                                    onChange={handleChangePassword2}
                                    aria-label="Repite Contraseña"
                                    required
                                />
                            </section>
                            <Input
                                name="first_name"
                                placeholder="Nombre"
                                value={user.first_name}
                                onChange={handleChange}
                                aria-label="Nombre"
                                fullWidth
                                required
                            />
                            <Input
                                name="last_name"
                                placeholder="Apellidos"
                                value={user.last_name}
                                onChange={handleChange}
                                aria-label="Apellidos"
                                fullWidth
                                required
                            />
                            <Input
                                name="dni"
                                placeholder="DNI"
                                value={user.dni}
                                onChange={handleChange}
                                aria-label="DNI"
                                fullWidth
                                required
                            />
                            <Select
                                name="role"
                                placeholder="Role"
                                value={user.role}
                                onChange={handleChange}
                                aria-label="Role"
                                fullWidth
                                required
                            >
                                {roles && roles.map((role) => (
                                    <SelectItem key={role.role_id} value={role.role_id}>
                                        {role.role_name}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Select // New Select for status
                                name="status"
                                placeholder="Status"
                                value={user.status}
                                onChange={handleChange}
                                aria-label="Status"
                                fullWidth
                                required
                            >
                                <SelectItem value="Activo">Activo</SelectItem>
                                <SelectItem value="Inactivo">Inactivo</SelectItem>
                                <SelectItem value="Suspendido">Suspendido</SelectItem>
                            </Select>
                        </CardBody>
                        <Divider />
                        <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            {!readOnly && readOnly !== "true" && (
                                <Button type='submit' color="primary" disabled={user.current_password !== password2 || loading} className="w-full sm:w-1/4">
                                    {loading ? 'Cargando...' : id ? 'Guardar cambios' : 'Crear Usuario'}
                                </Button>
                            )}
                            <Button type='button' color="danger" className="w-full sm:w-1/4" onClick={() => router.push('/admin/Usuarios')}>Cancelar</Button>
                        </CardFooter>
                    </form>
                </Card>
            </main>
        )
    );
}

export default CreateUser;