import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Button, Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Pagination, Modal, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure } from "@nextui-org/react";
import UserService from '../../services/userService';
import ProductService from '../../services/productService';
import CategoryService from '../../services/categoryService';
import RoleService from '../../services/roleService';
import {AnimatePresence, motion } from 'framer-motion';
import DefaultLayout from '../../layouts/default';
import { useRouter } from 'next/router';
const ADMIN_ACTIONS = {
    '99': { // admin
        'usuarios': {
            getInfo: UserService.getAllUsersInfo,
            delete: UserService.deleteUser,
        },
        'roles': {
            getInfo: RoleService.getAllRoles,
            delete: RoleService.deleteRole
        },
        'productos': {
            getInfo: ProductService.getProductsInfo,
            delete: ProductService.deleteProduct,
        },
        'categorias': {
            getInfo: CategoryService.getAllCategories,
            delete: CategoryService.deleteCategory,
        },
    },
    '96': { // managerAnalytics
        'usuarios': {
            getInfo: UserService.getAllUsersInfo,
            delete: UserService.deleteUser,
        },
        'roles': {
            getInfo: RoleService.getAllRoles,
            delete: RoleService.deleteRole
        },
        'productos': {
            getInfo: ProductService.getProductsInfo,
            delete: ProductService.deleteProduct,
        },
        'categorias': {
            getInfo: CategoryService.getAllCategories,
            delete: CategoryService.deleteCategory,
        },
    },
    '94': { // managerOrder
        'productos': {
            getInfo: ProductService.getProductsInfo,
            delete: ProductService.deleteProduct,
        },
        'categorias': {
            getInfo: CategoryService.getAllCategories,
            delete: CategoryService.deleteCategory,
        },
    },
    '97': {
        'productos': {
            getInfo: ProductService.getProductsInfo,
            delete: ProductService.deleteProduct,
        },
        'categorias': {
            getInfo: CategoryService.getAllCategories,
            delete: CategoryService.deleteCategory,
        },
    },
    '95': { // managerSupport
        'usuarios': {
            getInfo: UserService.getAllUsersInfo,
            delete: UserService.deleteUser,
        },
        'roles': {
            getInfo: RoleService.getAllRoles,
            delete: RoleService.deleteRole
        },
    },
    '98': { // managerUser
        'usuarios': {
            getInfo: UserService.getAllUsersInfo,
            delete: UserService.deleteUser,
        },
    },
};



function AdminPanel() {
    const router = useRouter();
    const [adminType, setAdminType] = useState(null);
    const [dataItems, setDataItems] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedTab, setSelectedTab] = useState(null);
    const [page, setPage] = useState(1);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [columns, setColumns] = useState();
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            router.push('/users/login');
        } else {
            RoleService.getUserRole(token)
                .then(role => {
                    if (ADMIN_ACTIONS[role]) {
                        console.log(`User role:${role}`);
                        setAdminType(role);
                        setSelectedTab(Object.keys(ADMIN_ACTIONS[role])[0]);

                    } else {
                        console.error(`Invalid admin type:${role}`);
                    }
                }).catch(error => {
                    console.error('Error getting user role:', error);
                    window.location = '/users/login';
            });
        }
    }, []);

    useEffect(() => {
        if (selectedTab && ADMIN_ACTIONS[adminType] && ADMIN_ACTIONS[adminType][selectedTab]) {
            ADMIN_ACTIONS[adminType][selectedTab].getInfo(page).then(res => {
                if (res && Array.isArray(res.data)) {
                    if (res.data.length > 0) {
                        setDataItems(res.data); // Set dataItems to the data part of the response
                        setTotalPages(res.pages); // Set totalPages to the pages part of the response
                        setColumns(Object.keys(res.data[0]));
                    } else {
                        setDataItems([]); // Set dataItems to an empty array if data is empty
                        setTotalPages(0); // Set totalPages to 0 if data is empty
                    }
                } else {
                    setDataItems([]); // Set dataItems to an empty array if data is undefined
                    setTotalPages(0); // Set totalPages to 0 if data is undefined
                }
            }).catch(error => {
                console.error(`Error getting data for tab ${selectedTab}:`, error);
                setDataItems([]); // Set dataItems to an empty array if there's an error
                setTotalPages(0); // Set totalPages to 0 if there's an error
            });
        }
    }, [selectedTab, adminType, page]);

    useEffect(() => {
        setPage(1);
    }, [selectedTab]);

    const handleCreate = () => {
        
        if(selectedTab === 'roles'){
            router.push('/admin/createRole');
        } else if(selectedTab === 'categorias'){
            router.push('/admin/createCategory');
        }else if(selectedTab === 'productos'){
            router.push('/admin/createProduct');
        }
    };

    const reloadData = () => {
        ADMIN_ACTIONS[adminType][selectedTab].getInfo(page).then(res => {
            setDataItems(res.data);
            setTotalPages(res.pages);
        });
    };

    const handleConfirmDelete = () => {
        selectedRows.forEach(row => {
            ADMIN_ACTIONS[adminType][selectedTab].delete(row).then(() => {
                reloadData();
            });
        });
        setSelectedRows([]);
        onOpenChange(false);
    };

    const handleDelete = () => {
        if(selectedRows.length === 0){
            return;
        }
        onOpen();
    };
    
    return (
        <DefaultLayout>
            <main className="flex justify-center items-center">
                <div className="flex flex-col items-center my-10 min-h-screen w-[1000px] px-4 md:px-0">
                    {adminType && (
                        <Tabs
                            key={adminType}
                            aria-label="Admin Tabs"
                            selectedKey={selectedTab}
                            onSelectionChange={setSelectedTab}
                        >
                            {Object.keys(ADMIN_ACTIONS[adminType]).map(tab => (
                                <Tab
                                    key={tab}
                                    value={tab}
                                    title={tab}
                                    aria-label={`Admin Tab ${tab}`}
                                />
                            ))}
                        </Tabs>
                    )}
        
                    {dataItems && dataItems.length > 0 ? (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-full overflow-x-auto my-10"
                        >
                            <div className="flex justify-between mb-4">
                                <Button
                                    color="primary"
                                    aria-label="Create Button"
                                    onClick={() => handleCreate()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    Crear
                                </Button>
                                <Button isIconOnly color="danger" aria-label="Delete Button" onClick={handleDelete} className="p-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </Button>
                                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                                    <ModalContent>
                                        {(onClose) => (
                                            <>
                                                <ModalHeader className="flex flex-col gap-1">Confirmar eliminación</ModalHeader>
                                                <ModalBody>
                                                    <p> 
                                                        ¿Estás seguro de que quieres eliminar los elementos seleccionados?
                                                    </p>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button color="danger" variant="light" onPress={onClose}>
                                                        Cancelar
                                                    </Button>
                                                    <Button color="primary" onPress={handleConfirmDelete}>
                                                        Eliminar
                                                    </Button>
                                                </ModalFooter>
                                            </>
                                        )}
                                    </ModalContent>
                                </Modal>
                            </div>
                            <AnimatePresence mode="wait">
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    key={selectedTab}
                                    className="overflow-x-auto"
                                >
                                    <Table
                                        aria-label="Admin Panel Table"
                                        selectedKeys={selectedRows}
                                        onSelectionChange={(keys) => {
                                            setSelectedRows(keys);
                                            console.log(keys);
                                        }}
                                        bottomContent={
                                            totalPages > 0 ? (
                                                <div className="flex w-full justify-center">
                                                    <Pagination
                                                        isCompact
                                                        showControls
                                                        showShadow
                                                        color="primary"
                                                        page={page}
                                                        total={totalPages}
                                                        onChange={(page) => setPage(page)}
                                                    />
                                                </div>
                                            ) : null
                                        }
                                        selectionMode="multiple"
                                        className=""
                                    >
                                        <TableHeader className="flex justify-center items-center">
                                            {columns.filter(column => column !== 'id').map((column, columnIndex) => (
                                                <TableColumn key={columnIndex} aria-label={`Column ${columnIndex + 1}`}>{dataItems[0][column].display}</TableColumn>
                                            ))}
                                            <TableColumn aria-label="Edit Column" className='flex justify-center items-center'></TableColumn>
                                        </TableHeader>
                                        <TableBody className="" onEmptied={'No hay product'}>
                                            {dataItems.map((row, rowIndex) => (
                                                
                                                <TableRow key={row['id']} aria-label={`Row ${rowIndex}`}>
                                                    {columns.filter(column => column !== 'id').map((column, columnIndex) => {
                                                    const cellData = row[column].value;
                                                    const truncatedData = truncateString(cellData, 50);
                                                    return (
                                                        <TableCell key={columnIndex} aria-label={`Cell ${columnIndex + 1}`}>
                                                            {truncatedData}
                                                        </TableCell>
                                                    );
                                                })}
                                                    <TableCell className="flex justify-center items-center">
                                                        <Button
                                                            isIconOnly
                                                            color="success"
                                                            aria-label="Edit Button"
                                                        onClick={() => {}}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                            </svg>
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <motion.section 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className='flex justify-center items-center my-10'
                        >
                            <Button
                                color="primary"
                                aria-label="Create Button"
                                onClick={() => handleCreate()}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                Crear
                            </Button>
                        </motion.section>
                    )}
                </div>
            </main>
        </DefaultLayout>
    );      
}function truncateString(str, maxLength) {
    if (typeof str !== 'string' || str.length <= maxLength) {
        return str;
    }
    return str.slice(0, maxLength) + '...';
}

export default AdminPanel;
