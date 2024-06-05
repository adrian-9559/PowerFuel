import { Button, Input, Select, SelectItem, Card } from "@nextui-org/react";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CategoryService from '@services/categoryService';
import { useRouter } from 'next/router';
import useTitle from '@hooks/useTitle'; 

const CreateCategory = () => {
    const [nameCategory, setName] = useState('');
    const categoriesSelect = [];
    const [selectedChildCategory, setSelectedChildCategory] = useState('');
    const [parentCategory, setParentCategory] = useState('');
    const [parentCategories, setParentCategories] = useState([]);
    const [childCategoriesLevels, setChildCategoriesLevels] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {id, readOnly} = router.query;
    useTitle(id?'Editar Categoría':'Crear Categoría');

    const handleRegister = async (e) => {
        e.preventDefault();

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

    const handleChildCategoryChange = async (e, level) => {
        const newChildCategories = await CategoryService.getChildCategories(e.target.value);
        setSelectedChildCategory(e.target.value);
        setChildCategoriesLevels(prevState => {
            const newState = [...prevState];
            newState[level] = newChildCategories; 
            return newState.slice(0, level + 1); 
        });
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
        const fetchCategoryAndParents = async () => {
            const category = await CategoryService.getCategoryById(id);
            const parentCategories = await CategoryService.getAllCategories();

            if(category && parentCategories){
                setName(category.category_name);
                setParentCategory(category.parent_category_id);
                setParentCategories(parentCategories);
            }
        };
    
        if (id) {
            fetchCategoryAndParents();
        }
    }, [id]);

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
                            selectedKeys={[parentCategory]} 
                            data-filled
                            isDisabled={readOnly}
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
                        {childCategoriesLevels.map((childCategories, index) => (
                            childCategories.length > 0 && (
                                <motion.section 
                                    key={index}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.225 }}
                                    className="mb-4"
                                >
                                    <Select
                                        name={`childCategory${index}`} 
                                        label='Subcategoría de la Subcategoría' 
                                        onChange={(e) => handleChildCategoryChange(e, index + 1)}
                                        selectedKeys={selectedChildCategory ? [selectedChildCategory] : []} 
                                        isDisabled={readOnly}
                                    >
                                        <SelectItem value={null}>
                                            Ninguna
                                        </SelectItem>
                                        {childCategories.map((category) => (
                                            <SelectItem key={category.category_id} value={category.category_id} onClick={() => setParentCategory(category.category_id)}>
                                                {category.category_name}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </motion.section>
                            )
                        ))}
                    </AnimatePresence>
                    
                    <section className="mb-4">
                        <Input 
                            isRequired
                            type='text' 
                            label='Nombre de la categoría' 
                            value={nameCategory}
                            onChange={(e) => setName(e.target.value)} 
                            onClear={readOnly ? undefined : () => setName('')}
                            readOnly={readOnly === "true"}
                        />
                    </section>
                    <section>
                        {!readOnly && readOnly !== "true" && (
                            <Button type='submit' disabled={loading} className="w-full">{loading ? 'Cargando...' : {id} ? 'Guardar cambios' : 'Crear Producto'}</Button>
                            
                        )}
                        <Button type='button' color="danger" onClick={() => router.push('/admin/Categorias')} className="w-full mt-4">Cancelar</Button>
                    </section>
                </form>
            </Card>
        </main>
    );
}

export default CreateCategory;