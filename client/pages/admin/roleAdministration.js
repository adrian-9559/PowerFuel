import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button, Pagination } from "@nextui-org/react";
import { useRouter } from 'next/router';
import RoleService from '@services/roleService';
import DeleteIcon from '@icons/DeleteIcon';
import EyeIcon from '@icons/EyeIcon';
import EditIcon from '@icons/EditIcon';
import PlusIcon from '@icons/PlusIcon'; 

const RoleAdministration = () => {
    const router = useRouter();
    const [Roles, setRoles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedKeys, setSelectedKeys] = useState([]);

    useEffect(() => {
        const fetchRoleData = async () => {
            const response = await RoleService.getRoles(page);
            setRoles(response.roles ?? []);
            setTotalPages(response.pages);
        }
        fetchRoleData();
    }, [page]);

    const deleteRole = async (roleId) => {
        await RoleService.deleteRole(roleId);
        setRoles(Roles.filter(role => role.role_id !== roleId));

        if(Roles.length === 1 && page > 1) {
            setPage(page - 1);
        }
    };

    const deleteSelectedRoles = async () => {

        if (selectedKeys ===  "all") {
            for (const role of Roles) {
                await deleteRole(role.role_id);
            }
            setRoles([]);
            setSelectedKeys([]);
            setPage(1);
            return;
        }

        for (const roleId of selectedKeys) {
            await deleteRole(roleId);
            setRoles(Roles.filter(role => role.role_id !== roleId));
        }
        setSelectedKeys([]);
    };

    return (
        <section className='h-full w-full'>
            <Table aria-label='Tabla de roles'
                selectionMode="multiple"
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
                className="w-full h-full"
                topContent={
                    <section className='flex flex-row w-full h-full'>
                        <section className="absolute flex justify-left gap-2">
                            <Tooltip color="danger" content="Eliminar Rol/es">
                                <Button isIconOnly color="danger" className="text-lg cursor-pointer active:opacity-50" onClick={deleteSelectedRoles}>
                                    <DeleteIcon color="white" />
                                </Button>
                            </Tooltip>
                            <Tooltip color="success" content="Añadir Rol" className='text-white'>
                                <Button isIconOnly color="success" className="text-lg  cursor-pointer active:opacity-50" onClick={() => router.push('/admin/create/createRole')}>
                                    <PlusIcon color="white" />
                                </Button>
                            </Tooltip>
                        </section>
                        <section className='flex justify-center items-center h-auto w-full'>
                            <h1 className="text-center text-2xl font-bold">Listado de Roles</h1>
                        </section>
                    </section>
                }
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
                <TableBody
                    emptyContent="No hay roles disponibles"
                >
                    {Roles.map((role) => (
                        <TableRow key={role.role_id}>
                            <TableCell>
                                <p>{role.role_id}</p>
                            </TableCell>
                            <TableCell>
                                <p>{role.role_name}</p>
                            </TableCell>
                            <TableCell>
                                <section className="relative flex justify-center items-center gap-2">
                                    <Tooltip color="success" content="Editar Rol" className="text-white">
                                        <Button isIconOnly color="success" variant="light" className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => router.push(`/admin/create/createRole?id=${role.role_id}`)}>
                                            <EditIcon color="green" />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip color="danger" content="Eliminar Rol">
                                        <Button isIconOnly color="danger" variant="light" className="text-lg text-default-400 cursor-pointer active:opacity-50"  onClick={() => deleteRole(role.role_id)}>
                                            <DeleteIcon color="red" />
                                        </Button>
                                    </Tooltip>
                                </section>
                            </TableCell>
                        </TableRow>   
                    ), [])}
                </TableBody>
            </Table>
        </section>
    );
};

export default RoleAdministration;