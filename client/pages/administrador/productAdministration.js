import React, { useState, useEffect } from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue, Button} from "@nextui-org/react";
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

    useEffect(() => {
        const fetchProductData = async () => {
            const response = await ProductService.getAllProducts();
            setProducts(response??[]);
            console.log(Products);      
            setIsLoading(false);
        }
        fetchProductData();
    }, []);

    const deleteProduct = async (productId) => {
        try {
            await ProductService.deleteProduct(productId);
            setProducts(Products.filter(product => product.product_id !== productId));
        } catch (error) {
            console.error('Failed to delete product: ', error);
        }
    };


    return (
        <section>
            <section>
                <h1 className="text-center text-2xl font-bold">Listado de Productos</h1>
            </section>
            <Table 
                aria-label='Tabla de productos'  
                selectionMode="multiple"
                className="w-full h-full"
            >
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
                                    <p className="text-bold text-sm capitalize">{product.Brand.brand_name}</p>
                                    <p className="text-bold text-sm capitalize text-default-400">Id Marca: {product.id_brand}</p>
                                </section>
                            </TableCell>
                            <TableCell>
                                <section className="flex flex-col">
                                    <p className="text-bold text-sm capitalize">{product.Category.category_name}</p>
                                    <p className="text-bold text-sm capitalize text-default-400">Id Categoría: {product.Category.category_id}</p>
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
                                            <EyeIcon />
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