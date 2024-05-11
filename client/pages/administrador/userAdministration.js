import React, { useState, useEffect } from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue} from "@nextui-org/react";
import UserService from '@services/userService';

const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};  

const UserAdministration = () => {
    const [Users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await UserService.getAllUsersInfo();
            setUsers(response.data);
            setIsLoading(false);
        }
        fetchUserData();
    }, []);

    return (
        <Table className='w-full' aria-label='Tabla de usuarios'>
            <TableHeader>
                <TableColumn>
                    <p>Usuario</p>
                </TableColumn>
                <TableColumn>
                    <p>Role</p>
                </TableColumn>
                <TableColumn>
                    <p>Estado</p>
                </TableColumn>
                <TableColumn>
                    <p>Acciones</p>
                </TableColumn>
            </TableHeader>
            <TableBody>
                
            </TableBody>
        </Table>
    );
};

export default UserAdministration;