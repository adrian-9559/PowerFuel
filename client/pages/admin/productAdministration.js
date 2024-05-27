import React, { useState, useEffect, use } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue, Button, Pagination } from "@nextui-org/react";
import { useRouter } from 'next/router';
import ProductService from '@services/productService';
import DeleteIcon from '@icons/DeleteIcon';
import EyeIcon from '@icons/EyeIcon';
import EditIcon from '@icons/EditIcon';
import PlusIcon from '@icons/PlusIcon';
import TrashIcon from '@icons/TrashIcon';

const statusColorMap = {
    Enabled: "success",
    Disabled: "danger",
};

const ProductoAdministration = () => {
    const router = useRouter();
    const [Products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedKeys, setSelectedKeys] = useState([]);


    useEffect(() => {
        const fetchProductData = async () => {
            const response = await ProductService.getProducts(page);
            setProducts(response.products ?? []);
            setTotalPages(response.pages);
        }
        fetchProductData();
    }, [page]);


    const deleteProduct = async (productId) => {
        await ProductService.deleteProduct(productId);
        setProducts(Products.filter(product => product.product_id !== productId));
    };

    const deleteSelectedProducts = async () => {
        for (const productId of selectedKeys) {
            await deleteProduct(productId);
            setProducts(Products.filter(product => product.product_id !== productId));
        }
        setSelectedKeys([]);
    };

    useEffect(() => {
        console.log(selectedKeys);
    }
        , [selectedKeys]);




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
                            <Tooltip color="danger" content="Eliminar Producto/s">
                                <Button isIconOnly color="danger" className="text-lg cursor-pointer active:opacity-50" onClick={deleteSelectedProducts}>
                                    <DeleteIcon color="primary" />
                                </Button>
                            </Tooltip>
                            <Tooltip color="success" content="Añadir Producto" className='text-white'>
                                <Button isIconOnly color="success" className="text-lg  cursor-pointer active:opacity-50" onClick={() => router.push('/admin/create/createProduct')}>
                                    <PlusIcon color="white" />
                                </Button>
                            </Tooltip>
                        </section>
                        <section className='flex justify-center items-center h-auto w-full'>
                            <h1 className="text-center text-2xl font-bold">Listado de Productos</h1>
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
                        <p>Producto</p>
                    </TableColumn>
                    <TableColumn>
                        <p>Marca</p>
                    </TableColumn>
                    <TableColumn>
                        <p>Categoría</p>
                    </TableColumn>
                    <TableColumn>
                        <p>Precio</p>
                    </TableColumn>
                    <TableColumn>
                        <p>Estado</p>
                    </TableColumn>
                    <TableColumn className='flex justify-center items-center'>
                        <p>Acciones</p>
                    </TableColumn>
                </TableHeader>
                <TableBody className='h-full'>
                    {Products.map((product, index) => (
                        <TableRow key={product.product_id} >
                            <TableCell>
                                <User
                                    avatarProps={{ radius: "lg", src: `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/product/${product.product_id}/1.png` }}
                                    description={`Id del Producto: ${product.product_id}`}
                                    name={product.product_name}
                                >
                                    {product.product_name}
                                </User>
                            </TableCell>
                            <TableCell>
                                <section className="flex flex-col">
                                    <p className="text-bold text-sm capitalize">{product.brand_name}</p>
                                    <p className="text-bold text-sm capitalize text-default-400">Id Marca: {product.id_brand}</p>
                                </section>
                            </TableCell>
                            <TableCell>
                                <section className="flex flex-col">
                                    <p className="text-bold text-sm capitalize">{product.category_name}</p>
                                    <p className="text-bold text-sm capitalize text-default-400">Id Categoría: {product.category_id}</p>
                                </section>
                            </TableCell>
                            <TableCell>
                                <p className="text-bold text-sm capitalize">{product.price} €</p>
                            </TableCell>
                            <TableCell>
                                <Chip className="capitalize" color={statusColorMap[product.status]} size="sm" variant="flat">
                                    {product.status}
                                </Chip>
                            </TableCell>
                            <TableCell>
                                <section className=" flex justify-center items-center gap-2">
                                    <Tooltip color="primary" content="Detalles">
                                        <Button isIconOnly color="primary" variant="light" className="text-lg text-default-400 cursor-pointer active:opacity-50" onPress={() => router.push(`/admin/create/createProduct?readOnly=true&&id=${product.product_id}`)}>
                                            <EyeIcon color="primary" />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip color="success" content="Editar Usuario" className="text-white">
                                        <Button isIconOnly color="success" variant="light" className="text-lg text-default-400 cursor-pointer active:opacity-50" onPress={() => router.push(`/admin/create/createProduct?id=${product.product_id}`)}>
                                            <EditIcon color="green" />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip color="danger" content="Eliminar Producto/s">
                                        <Button isIconOnly color="danger" className="text-lg cursor-pointer active:opacity-50" onClick={() => deleteProduct(product.product_id)}>
                                            <DeleteIcon color="primary" />
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

export default ProductoAdministration;