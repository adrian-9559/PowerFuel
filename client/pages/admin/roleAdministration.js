import React, { useState, useEffect } from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button, Pagination} from "@nextui-org/react";
import { useRouter } from 'next/router';
import RoleService from '@services/roleService';
import EditIcon from '@icons/EditIcon';
import DeleteIcon from '@icons/DeleteIcon';
import PlusIcon from '@icons/PlusIcon';

const RoleAdministration = () => {
    const router = useRouter();
    const [Roles, setRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await RoleService.getRoles(page);
            if (response) {
                setRoles(response.roles ?? []);
                setTotalPages(response.pages);
                setIsLoading(false);
            }
        }
        fetchUserData();
    }, [page]);

    const deleteRole = async (roleId) => {
        try {
            await RoleService.deleteRole(roleId);
            setRoles(Roles.filter(role => role.role_id !== roleId));
        } catch (error) {
            console.error('Failed to delete role: ', error);
        }
    };

    return (
        isLoading ? (
            <h1>Loading...</h1>
        ) : (
            <section>
                <section className='grid w-full'>
                    <section>
                        <h1 className="text-center text-2xl font-bold">Listado de Roles de Usuario</h1>
                    </section>
                    <section className="flex justify-end mr-5 mb-5">
                        <Tooltip color="success" content="Añadir Rol">
                            <Button isIconOnly color="success" variant='flat' none className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => router.push('/admin/create/createCategory')}>
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
                            <p>ID de Rol</p>
                        </TableColumn>
                        <TableColumn>
                            <p>Nombre de Rol</p>
                        </TableColumn>
                        <TableColumn className='flex justify-center items-center'>
                            <p>Acciones</p>
                        </TableColumn>
                    </TableHeader>
                    <TableBody>
                        {Roles.map((role, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <p>{role.role_id}</p>
                                </TableCell>
                                <TableCell>
                                    <p>{role.role_name}</p>
                                </TableCell>
                                <TableCell>
                                    <section className="relative flex justify-center items-center gap-2">
                                        <Tooltip color="success" content="Edit user" className="text-white">
                                            <Button isIconOnly color="success" variant="light" className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                <EditIcon color="green"/>
                                            </Button>
                                        </Tooltip>
                                        <Tooltip color="danger" content="Delete role">
                                            <Button isIconOnly color="danger" variant="light" none className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => deleteRole(role.role_id)}>
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
        )
    );
};

export default RoleAdministration;