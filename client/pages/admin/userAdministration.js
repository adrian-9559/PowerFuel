import React, { useState, useEffect } from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue, Button, Pagination} from "@nextui-org/react";
import { useRouter } from 'next/router';
import UserService from '@services/userService';
import DeleteIcon from '@icons/DeleteIcon';
import EyeIcon from '@icons/EyeIcon';
import EditIcon from '@icons/EditIcon';
import PlusIcon from '@icons/PlusIcon';

const statusColorMap = {
    Active: "success",
    Inactive: "danger",
    Suspended: "warning",
};  

const UserAdministration = () => {
    const router = useRouter();
    const [Users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await UserService.getAllUsersInfo(page);
            setUsers(response.users??[]);
            setTotalPages(response.pages);
            setIsLoading(false);
        }
        fetchUserData();
    }, [page]);

    const deleteUser = async (userId) => {
        try {
            await UserService.deleteUser(userId);
            setUsers(Users.filter(user => user.user_id !== userId));
        } catch (error) {
            console.error('Failed to delete user: ', error);
        }
    };

    return (
        <section>
            <section className='grid w-full'>
                    <section>
                        <h1 className="text-center text-2xl font-bold">Listado de Usuarios</h1>
                    </section>
                    <section className="flex justify-end mr-5 mb-5">
                        <Tooltip color="success" content="Añadir Usuario">
                            <Button isIconOnly color="success" variant='flat' none className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => router.push('/admin/create/createUser')}>
                                <PlusIcon color="primary"/>
                            </Button>
                        </Tooltip>
                    </section>
                </section>
            <Table aria-label='Tabla de roles' selectionMode="multiple" 
                    className="w-full h-full"
                    bottomContent={
                    totalPages > 0 ? (
                        <section className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="primary"
                                page={page}
                                total={totalPages}
                                onChange={(page) => setPage(page)}
                            />
                        </section>
                    ) : null
                }>
                <TableHeader>
                    <TableColumn>
                        <p>Usuario</p>
                    </TableColumn>
                    <TableColumn>
                        <p>DNI</p>
                    </TableColumn>
                    <TableColumn>
                        <p>Role</p>
                    </TableColumn>
                    <TableColumn>
                        <p>Estado</p>
                    </TableColumn>
                    <TableColumn className='flex justify-center items-center'>
                        <p>Acciones</p>
                    </TableColumn>
                </TableHeader>
                <TableBody>
                    {Users.map((user, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <User
                                    avatarProps={{radius: "lg", src: `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/user/${user.user_id}/1.png`}}
                                    description={user.email}
                                    name={user.first_name + " " + user.last_name}
                                >
                                    {user.email}
                                </User>
                            </TableCell>
                            <TableCell>
                                <p>{user.dni}</p>
                            </TableCell>
                            <TableCell>
                                <section className="flex flex-col">
                                    <p className="text-bold text-sm capitalize">{user.role_name}</p>
                                    <p className="text-bold text-sm capitalize text-default-400">Id Role: {user.role_id}</p>
                                </section>
                            </TableCell>
                            <TableCell>
                                <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
                                    {user.status}
                                </Chip>
                            </TableCell>
                            <TableCell>
                                <section className="relative flex justify-center items-center gap-2">
                                    <Tooltip color="primary" content="Details">
                                        <Button isIconOnly color="primary" variant="light" className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            <EyeIcon />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip color="success" content="Edit user" className="text-white">
                                        <Button isIconOnly color="success" variant="light" className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            <EditIcon color="green"/>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip color="danger" content="Delete user">
                                        <Button isIconOnly color="danger" variant="light" none className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => deleteUser(user.user_id)}>
                                            <DeleteIcon color="red"/>
                                        </Button>
                                    </Tooltip>
                                </section>
                            </TableCell>
                        </TableRow>   
                    ))}
                </TableBody>
            </Table>
        </section>
    );
};

export default UserAdministration;