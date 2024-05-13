import React, { useState, useEffect } from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue, Button, Pagination} from "@nextui-org/react";
import ProductService from '@services/productService';
import DeleteIcon from '@icons/DeleteIcon';
import EyeIcon from '@icons/EyeIcon';
import EditIcon from '@icons/EditIcon';

const statusColorMap = {
    Enabled: "success",
    Disabled: "danger",
};  

const ProductoAdministration = () => {
    const [Products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchProductData = async () => {
            const response = await ProductService.getProducts(page);
            setProducts(response.products??[]);
            setTotalPages(response.pages);
            setIsLoading(false);
        }
        fetchProductData();
    }, [page]);

    const deleteProduct = async (productId) => {
        try {
          await ProductService.deleteProduct(productId);
          setProducts(Products.filter(product => product.product_id !== productId));
        } catch (error) {
          toastr.error('Hubo un problema con tu solicitud', 'Error');
        }
      };


    return (
        <section>
            <section>
                <h1 className="text-center text-2xl font-bold">Listado de Productos</h1>
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
                <TableBody>
                    {Products.map((product, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <User
                                    avatarProps={{radius: "lg", src: `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/product/${product.product_id}/1.png`}}
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
                                <section className="relative flex justify-center items-center gap-2">
                                    <Tooltip color="primary" content="Details">
                                        <Button isIconOnly color="primary" variant="light" className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            <EyeIcon color="primary"/>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip color="success" content="Edit user" className="text-white">
                                        <Button isIconOnly color="success" variant="light" className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            <EditIcon color="green"/>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip color="danger" content="Delete product">
                                        <Button isIconOnly color="danger" variant="light" none className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => deleteProduct(product.product_id)}>
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

export default ProductoAdministration;