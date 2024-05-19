import React, { useState, useEffect } from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button, Pagination, Spinner} from "@nextui-org/react";
import { useRouter } from 'next/router';
import CategoryService from '@services/categoryService';
import EditIcon from '@icons/EditIcon';
import DeleteIcon from '@icons/DeleteIcon';
import PlusIcon from '@icons/PlusIcon';

const CategoryAdministration = () => {
    const router = useRouter();
    const [Categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        setIsLoading(true);
        setCategories([]);
        CategoryService.getCategories(page)
            .then(response => {
                if(response){
                    console.log(response);
                    setTotalPages(response.pages);
                    setCategories(response.categories);
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    }, [page]);

    const deleteCategory = async (categoryId) => {
        try {
            await CategoryService.deleteCategory(categoryId);
            setCategories(Categories.filter(category => category.category_id !== categoryId));
        } catch (error) {
            console.error('Failed to delete categoría: ', error);
        }
    };
    return (
            <section className='flex flex-col justify-center items-center'>
                <section className='grid w-full'>
                    <section>
                        <h1 className="text-center text-2xl font-bold">Listado de Categorias</h1>
                    </section>
                    <section className="flex justify-end mr-5 mb-5">
                        <Tooltip color="success" content="Añadir Categoria">
                            <Button isIconOnly color="success" variant='flat' none className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => router.push('/admin/createCategory')}>
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
                            <p>ID de Categoría</p>
                        </TableColumn>
                        <TableColumn>
                            <p>Nombre de Categoría</p>
                        </TableColumn>
                        <TableColumn>
                            <p>Categoría Padre</p>
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
                        {Categories && Categories.length > 0 ? (
                            Categories.map((category, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <div className="max-w-xs overflow-hidden truncate">
                                            <p>{category.category_id}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="max-w-xs overflow-hidden truncate">
                                            <p>{category.category_name}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="max-w-xs overflow-hidden truncate">
                                            {category.parent_category_id ? (
                                                <section className="flex flex-col">
                                                    <p className="text-bold text-sm capitalize">{category.parent_category_name}</p>
                                                    <p className="text-bold text-sm capitalize text-default-400">Id Categoría: {category.parent_category_id}</p>
                                                </section>
                                            ) : (
                                                <p>Ninguna</p>
                                            )}
                                        </div>
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
                                                    <Button isIconOnly color="danger" variant="light" none className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => deleteCategory(category.category_id)}>
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
        )
};

export default CategoryAdministration;