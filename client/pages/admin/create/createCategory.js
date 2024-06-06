import { Button, Input, Select, SelectItem, Card } from "@nextui-org/react";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CategoryService from '@services/categoryService';
import { useRouter } from 'next/router';
import useTitle from '@hooks/useTitle'; 

const CreateCategory = () => {
    const [nameCategory, setName] = useState('');
    const [parentCategory, setParentCategory] = useState('');
    const [selectedChildCategory, setSelectedChildCategory] = useState([]); 
    const [parentCategories, setParentCategories] = useState([]);
    const [childCategoriesLevels, setChildCategoriesLevels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);
    const router = useRouter();
    const {id} = router.query;
    useTitle(id?'Editar Categoría':'Crear Categoría');

    const isNameValid = () => nameCategory && nameCategory.trim() !== '' && !isInvalid;
    const isParentCategoryValid = () => parentCategory !== null && parentCategory !== '';
    const isChildCategoryValid = () => selectedChildCategory.every(category => category !== null && category !== '');

    useEffect(() => {
        const categoryNameRegex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑüÜ]{1,50}$/;
        setIsInvalid(!categoryNameRegex.test(nameCategory));
    }, [nameCategory]);

    const isFormValid = () => isNameValid() && isParentCategoryValid() && isChildCategoryValid();


    const handleRegister = async (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            return;
        }

        setLoading(true);
        try {
            const category = {
                category_name: nameCategory,
                parent_category_id: parentCategory,
            };
    
            const response = await CategoryService.addCategory(category); 
            setLoading(false);
            router.push('/admin/Categorias');
        } catch (error) {
            console.error(error);
        }
    };

    const handleParentCategoryChange = async (e) => {
        const childCategories = await CategoryService.getChildCategories(e.target.value);
        setParentCategory(e.target.value);
        setChildCategoriesLevels([childCategories]); 
    };
    
    useEffect(() => {
        const fetchParentCategories = async () => {
            const categories = await CategoryService.getParentCategories();
            setParentCategories(categories);
        };
        
        if(!id){
            fetchParentCategories();
        }

    }, []);

    useEffect(() => {
        const fetchParentCategories = async () => {
            const categories = await CategoryService.getParentCategories();
            setParentCategories(categories);
        };
        
        if(!id){
            fetchParentCategories();
        }
    }, []);


    return (
        <main
            className="max-w-4xl mx-auto my-32 p-6"
        >
            <Card shadow className="p-5">
                <h1 className="text-2xl font-bold mb-4">{id ? 'Editar Categoría' : 'Crear Categoría'}</h1>
                <form onSubmit={handleRegister}>
                    <section className="mb-4">
                        <Select 
                            name='category' 
                            label='Categoría padre' 
                            onChange={handleParentCategoryChange} 
                            defaultSelectedKeys={parentCategory ? [parentCategory] : []}
                            data-filled
                            isInvalid={!isParentCategoryValid()}
                            errorMessage='Este campo es obligatorio'
                        >
                            <SelectItem value={null}>Ninguna</SelectItem>
                            {parentCategories.map((category) => (
                                <SelectItem key={category.category_id} value={category.category_id}>
                                    {category.category_name}
                                </SelectItem>
                            ))}
                        </Select>
                    </section>
                    <AnimatePresence>
                        {childCategoriesLevels[0] && childCategoriesLevels[0].length > 0 && (
                            <motion.section 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.225 }}
                                className="mb-4"
                            >
                                <Select
                                    name={`childCategory`} 
                                    label='Subcategoría de la Subcategoría' 
                                    selectedKeys={selectedChildCategory[0] ? [selectedChildCategory[0]] : []} 
                                    isInvalid={!isChildCategoryValid()}
                                    errorMessage='Este campo es obligatorio'
                                    onChange={(e) => setSelectedChildCategory([e.target.value])} 
                                >
                                <SelectItem value={null}>
                                    Ninguna
                                </SelectItem>
                                {childCategoriesLevels[0].map((category) => (
                                    <SelectItem key={category.category_id} value={category.category_id}>
                                        {category.category_name}
                                    </SelectItem>
                                ))}
                                </Select>
                            </motion.section>
                        )}
                    </AnimatePresence>
                    <section className="mb-4">
                        <Input 
                            isRequired
                            type='text' 
                            label='Nombre de la categoría' 
                            value={nameCategory}
                            onChange={(e) => setName(e.target.value.trim())} 
                            onClear={() => setName('')}
                            isInvalid={!isNameValid()}
                            errorMessage='Formato inválido. Solo se permiten letras, números y espacios. Máximo 50 caracteres.'
                        />
                    </section>
                    <section>
                        <Button type='submit' disabled={loading} className="w-full">{loading ? 'Cargando...' : {id} ? 'Guardar cambios' : 'Crear Producto'}</Button>
                        <Button type='button' color="danger" onClick={() => router.push('/admin/Categorias')} className="w-full mt-4">Cancelar</Button>
                    </section>
                </form>
            </Card>
        </main>
    );
}

export default CreateCategory;