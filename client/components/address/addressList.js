import React, { useState, useEffect } from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button, Pagination, Spinner, Chip} from "@nextui-org/react";
import AddressService from '@services/addressService';
import DeleteIcon from '@icons/DeleteIcon';
import EyeIcon from '@icons/EyeIcon';
import EditIcon from '@icons/EditIcon';
import PlusIcon from '@icons/PlusIcon';

const statusColorMap = {
    1: "success",
    0: "danger",
};  

const AddressList = () => {
    const [addressList, setAddressList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAddress = async () => {
            const addressData = await AddressService.getAddressByUserId();
            setAddressList(addressData);
            setIsLoading(false);
        };
        fetchAddress();
    }, [page]);

    const deleteAddress = async (addressId) => {
        try {
            await AddressService.deleteAddress(addressId);
            setAddressList(Addresses.filter(Addresses => Addresses.address_id !== addressId));
        } catch (error) {
            console.error('Failed to delete dirección: ', error);
        }
    };

    return (
        <section className="py-5 flex flex-col gap-4 ">
            <h1 className="font-bold text-3xl">Lista de direcciones de envio</h1>
            <section>
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
                            <p>Calle</p>
                        </TableColumn>
                        <TableColumn>
                            <p>Municipio</p>
                        </TableColumn>
                        <TableColumn>
                            <p>Comunidad Autónoma</p>
                        </TableColumn>
                        <TableColumn>
                            <p>Código Postal</p>
                        </TableColumn>
                        <TableColumn>
                            <p>País</p>
                        </TableColumn>
                        <TableColumn>
                            <p>Teléfono</p>
                        </TableColumn>
                        <TableColumn>
                            <p>Predefinida</p>
                        </TableColumn>
                        <TableColumn className='flex justify-center items-center'>
                            <p>Acciones</p>
                        </TableColumn>
                    </TableHeader>
                    <TableBody 
                        loadingContent={<Spinner />}
                        loadingState={isLoading? 'loading' : 'idle'}
                        emptyContent={"No rows to display."}
                    >
                        {addressList && addressList.length > 0 ? (
                            addressList.map((address, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <div className="max-w-xs overflow-hidden truncate">
                                        <p>{address.street}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="max-w-xs overflow-hidden truncate">
                                        <p>{address.city}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="max-w-xs overflow-hidden truncate">
                                        <p>{address.province}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="max-w-xs overflow-hidden truncate">
                                        <p>{address.zip}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="max-w-xs overflow-hidden truncate">
                                        <p>{address.country}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="max-w-xs overflow-hidden truncate">
                                        <p>{address.phone_number}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Chip className="capitalize" color={statusColorMap[address.is_default]} size="sm" variant="flat">
                                        <p>{address.is_default == 1 ? 'Si' : 'No'}</p>
                                    </Chip>
                                </TableCell>
                                <TableCell>
                                    <div className="max-w-xs overflow-hidden truncate">
                                        <section className="relative flex justify-center items-center gap-2">
                                            <Tooltip color="success" content="Edit Category" className="text-white">
                                                <Button isIconOnly color="success" variant="light" className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                    <EditIcon color="green"/>
                                                </Button>
                                            </Tooltip>
                                            <Tooltip color="danger" content="Delete Category">
                                                <Button isIconOnly color="danger" variant="light" none className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => deleteCategory(address.address_id)}>
                                                    <DeleteIcon color="red"/>
                                                </Button>
                                            </Tooltip>
                                        </section>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        []
                    )}
                    </TableBody>
                </Table>  
            </section>
        </section>
    );
}

export default AddressList;