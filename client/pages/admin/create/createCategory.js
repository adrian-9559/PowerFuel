import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useState, useEffect, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CategoryService from '@services/categoryService';
import { useRouter } from 'next/router';

const CreateCategory = () => {
    const [nameCategory, setName] = useState('');
    const [parentCategory, setParentCategory] = useState('');
    const [parentCategories, setParentCategories] = useState([]);
    const [childCategoriesLevels, setChildCategoriesLevels] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {id, readOnly} = router.query;


    const handleRegister = async (e) => {
        e.preventDefault();
        if (!nameCategory || !parentCategory) {
            setError('Please fill in all required fields.');
            return;
        }

        setLoading(true);
        try {
            const category = {
                category_name: nameCategory,
                parent_category_id: parentCategory,
            };
    
            await CategoryService.addCategory(category); 
            router.push('/admin/Categorias');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleParentCategoryChange = async (e) => {
        const childCategories = await CategoryService.getChildCategories(e.target.value);
        setParentCategory(e.target.value);
        setChildCategoriesLevels([childCategories]); 
    };

    const handleChildCategoryChange = async (e, level) => {
        const newChildCategories = await CategoryService.getChildCategories(e.target.value);
        setParentCategory(e.target.value);
        setChildCategoriesLevels(prevState => {
            const newState = [...prevState];
            newState[level] = newChildCategories;  // Añade las nuevas categorías hijas al nivel correspondiente
            return newState.slice(0, level + 1);  // Elimina los niveles de categorías hijas que ya no son relevantes
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
            console.log('category', category);
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

        console.log('id', id);
        console.log('nameCategory', nameCategory);
        console.log('parentCategory', parentCategory);
        console.log('parentCategories', parentCategories);
    }, [id]);
    return (
        <motion.main
            className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-2xl font-bold mb-4">Crear Categoría</h1>
            <form onSubmit={handleRegister}>
                <section className="mb-4">
                    <Select 
                        name='category' 
                        label='Categoría padre' 
                        onChange={handleParentCategoryChange} 
                        selectedKeys={parentCategory} 
                        data-filled
                        isDisabled={readOnly}
                    >
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
                                    selectedKeys={[childCategoriesLevels[index][0]?.category_id]} 
                                    isDisabled={readOnly}
                                >
                                    {childCategories.map((category) => (
                                        <SelectItem key={category.category_id} value={category.category_id}>
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
        </motion.main>
    );
}

export default CreateCategory;