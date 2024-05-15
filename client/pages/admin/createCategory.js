import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CategoryService from '../../services/categoryService'; // Import the service to add a category
import { useRouter } from 'next/router';

const CreateCategory = () => {
    const [nameCategory, setName] = useState('');
    const [parentCategory, setParentCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [parentCategories, setParentCategories] = useState([]);
    const [childCategoriesLevels, setChildCategoriesLevels] = useState([]);
    const router = useRouter();
    const {id} = router.query;

    useEffect(() => {
        const fetchParentCategories = async () => {
            const categories = await CategoryService.getParentCategories();
            setParentCategories(categories);
        };
        
        fetchParentCategories();
    }, []);

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
                // Add other category attributes here
            };
    
            await CategoryService.addCategory(category); // Use the service to add a category
            router.push('/administrador?view=Categorías');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const fetchCategoryAndParents = async () => {
            let category = await CategoryService.getCategoryById(id);
            setName(category.category_name);
    
            let parentCategoriesChain = [];
            while (category.parent_category_id) {
                category = await CategoryService.getCategoryById(category.parent_category_id);
                parentCategoriesChain.unshift(category);
            }
    
            // Set the first parent category
            if (parentCategoriesChain.length > 0) {
                setParentCategory(parentCategoriesChain[0].category_id);
            }
    
            // Set the child categories for each parent category
            for (let i = 0; i < parentCategoriesChain.length - 1; i++) {
                const childCategories = await CategoryService.getChildCategories(parentCategoriesChain[i].category_id);
                setChildCategoriesLevels(prevState => {
                    const newState = [...prevState];
                    newState[i] = childCategories;
                    return newState.slice(0, i + 1);
                });
            }
        };
    
        if (id) {
            fetchCategoryAndParents();
        }
    }, [id]);

    const handleParentCategoryChange = async (e) => {
        const childCategories = await CategoryService.getChildCategories(e.target.value);
        setParentCategory(e.target.value);
        setChildCategoriesLevels([childCategories]);  // Reinicia childCategoriesLevels y añade el primer nivel de categorías hijas
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
                        label='Categoría de la Categoría' 
                        onChange={handleParentCategoryChange} 
                        selectedKeys={[parentCategory]} 
                        data-filled
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
                                    selectedKeys={[childCategoriesLevels[index][0]?.category_id]}  // Asume que la primera categoría hija está seleccionada por defecto
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
                        onClear={() => setName('')}
                    />
                </section>
                <section className="mb-4">
                    <Button type='submit' disabled={loading} className="w-full">{loading ? 'Cargando...' : 'Crear Categoría'}</Button>
                    <Button type='button' color="danger" onClick={() => router.push('/administrador?view=Categorías')} className="w-full mt-4">Cancelar</Button>
                </section>
            </form>
        </motion.main>
    );
}

export default CreateCategory;