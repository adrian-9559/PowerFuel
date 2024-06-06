import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, Button, Pagination, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from 'next/router';
import { Modal, useDisclosure, ModalContent } from '@nextui-org/react';
import ProductAdminPanel from '@components/product/productAdminPanel';
import ProductService from '@services/productService';
import DeleteIcon from '@icons/DeleteIcon';
import EyeIcon from '@icons/EyeIcon';
import EditIcon from '@icons/EditIcon';
import PlusIcon from '@icons/PlusIcon';
import useTitle from '@hooks/useTitle'; 

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
    const [selectedProduct, setSelectedProduct] = useState(null);
    const {isOpen, onOpenChange, onOpen } = useDisclosure();
    const [statusProducts, setStatusProducts] = useState();
    useTitle('Administración de Productos');

    useEffect(() => {
        const fetchProductData = async () => {
            const response = await ProductService.getProducts(page, 10, statusProducts);
            setProducts(response.products ?? []);
            setTotalPages(response.pages);
        }
        fetchProductData();
    }, [page, statusProducts]);

    const deleteProduct = async (productId) => {
        await ProductService.deleteProduct(productId);
        setProducts(Products.filter(product => product.product_id !== productId));

        if (Products.length === 1 && page > 1) {
            setPage(page - 1);
        }
    };

    const deleteSelectedProducts = async () => {

        if (selectedKeys ===  "all") {
            for (const product of Products) {
                await deleteProduct(product.product_id);
            }
            setProducts([]);
            setSelectedKeys([]);
            setPage(1);
            return;
        }
        for (const productId of selectedKeys) {
            await deleteProduct(productId);
            setProducts(Products.filter(product => product.product_id !== productId));
        }
        setSelectedKeys([]);
    };

    const handleStatusChange = (event) => {
        setStatusProducts(event.target.value);
    }

    return (
        <section className='h-full w-full'>
            <Table aria-label='Tabla de roles'
                selectionMode="multiple"
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
                className="w-full h-full"
                topContent={
                    <section className='flex w-full h-full justify-between'>
                        <section className="flex justify-left gap-2 w-full">
                            <Tooltip color="danger" content="Eliminar Producto/s">
                                <Button isIconOnly color="danger" className="text-lg cursor-pointer active:opacity-50" onClick={deleteSelectedProducts}>
                                    <DeleteIcon color="white" />
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
                        <section className='w-full flex justify-end'>
                            <Select aria-label='selectStatus' content="Filtro" className='w-3/6' placeholder='Filtrado' radius='lg' defaultSelectedKeys={["null"]} onChange={handleStatusChange}>
                                <SelectItem key="null">Ninguno</SelectItem>
                                <SelectItem key="Enabled">Habilitado</SelectItem>
                                <SelectItem key="Disabled">Desabilitado</SelectItem>
                            </Select>
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
                <TableBody 
                    emptyContent="No hay productos disponibles"
                >
                    {Products.map((product) => (
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
                                        <Button isIconOnly color="primary" variant="light" className="text-lg text-default-400 cursor-pointer active:opacity-50" onPress={() => { setSelectedProduct(product); onOpen(); }}>
                                            <EyeIcon color="primary" />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip color="success" content="Editar Producto" className="text-white">
                                        <Button isIconOnly color="success" variant="light" className="text-lg text-default-400 cursor-pointer active:opacity-50" onPress={() => router.push(`/admin/create/createProduct?id=${product.product_id}`)}>
                                            <EditIcon color="green" />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip color="danger" content="Eliminar Producto">
                                        <Button isIconOnly color="danger" variant="light" className="text-lg cursor-pointer active:opacity-50" onClick={() => deleteProduct(product.product_id)}>
                                            <DeleteIcon color="red" />
                                        </Button>
                                    </Tooltip>
                                </section>
                            </TableCell>
                        </TableRow>
                    ), [])}
                </TableBody>
            </Table>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='p-6 overflow-hidden max-w-[60%] max-h-[80%]' backdrop="blur">
                <ModalContent className='w-full'>
                    {selectedProduct && <ProductAdminPanel productId={selectedProduct.product_id} key={selectedProduct.product_id} />}
                </ModalContent>
            </Modal>
        </section>
    );
};

export default ProductoAdministration;