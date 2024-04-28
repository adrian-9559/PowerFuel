import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { addCategory, getParentCategories, getChildCategories } from '../../services/categoryService'; // Import the service to add a category
import { useAppContext } from '../../context/AppContext';

const CreateCategory = () => {
    const [nameCategory, setName] = useState('');
    const [parentCategory, setParentCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [parentCategories, setParentCategories] = useState([]);
    const [childCategoriesLevels, setChildCategoriesLevels] = useState([]);
    const { router } = useAppContext();

    useEffect(() => {
        const fetchParentCategories = async () => {
            const categories = await getParentCategories();
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
    
            await addCategory(category); // Use the service to add a category
            router.push('/admin');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleParentCategoryChange = async (e) => {
        const childCategories = await getChildCategories(e.target.value);
        setParentCategory(e.target.value);
        setChildCategoriesLevels([childCategories]);  // Reinicia childCategoriesLevels y añade el primer nivel de categorías hijas
    };

    const handleChildCategoryChange = async (e, level) => {
        const newChildCategories = await getChildCategories(e.target.value);
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
                    <Input 
                        type='text' 
                        label='Nombre de la categoría' 
                        value={nameCategory} 
                        onChange={(e) => setName(e.target.value)} 
                        onClear={() => setName('')}
                    />
                </section>
                <section className="mb-4">
                    <Select name='category' label='Categoría de la Categoría' onChange={handleParentCategoryChange} data-filled>
                        {parentCategories.map((category) => (<SelectItem key={category.category_id} value={category.category_id}>{category.category_name}</SelectItem>))}
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
                                className="mb-4">
                                <Select name={`childCategory${index}`} label='Subcategoría de la Categoría' onChange={(e) => handleChildCategoryChange(e, index + 1)}>
                                    {childCategories.map((category) => (<SelectItem key={category.category_id} value={category.category_id}>{category.category_name}</SelectItem>))}
                                </Select>
                            </motion.section>
                        )
                    ))}
                </AnimatePresence>
                <section className="mb-4">
                    <Button type='submit' disabled={loading} className="w-full">{loading ? 'Cargando...' : 'Crear Categoría'}</Button>
                    <Button type='button' color="danger" onClick={() => router.push('/admin')} className="w-full mt-4">Cancelar</Button>
                </section>
            </form>
        </motion.main>
    );
}

export default CreateCategory;