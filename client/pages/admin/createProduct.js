import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductService from '@services/productService';
import CategoryService from '@services/categoryService';
import BrandService from '@services/brandService';
import { useRouter } from 'next/router';

const CreateProduct = () => {
    const [formState, setFormState] = useState({
        name: '',
        description: '',
        stock: 1,
        price: '',
        category_id: '',
        brand: '',
        images: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [brands, setBrands] = useState([]);
    const [parentCategories, setParentCategories] = useState([]);
    const [childCategoriesLevels, setChildCategoriesLevels] = useState([]);
    const router = useRouter();
    const {id} = router.query;

    useEffect(() => {
        const fetchParentCategories = async () => {
            const categories = await CategoryService.getParentCategories();
            setParentCategories(categories);
        };

        const fetchBrands = async () => {
            const brands = await BrandService.getAllBrandsNoPagination();
            setBrands(brands);
        };
        
        fetchParentCategories();
        fetchBrands();
    }, []);

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            const categories = await CategoryService.getParentCategories();
            setParentCategories(categories);
    
            const brands = await BrandService.getAllBrandsNoPagination();
            setBrands(brands);
    
            if (id) {
                const product = await ProductService.getProductById(id);
                setFormState({
                    name: product.product_name,
                    description: product.description,
                    stock: product.stock_quantity,
                    price: product.price,
                    category_id: product.category_id,
                    brand: product.id_brand
                });
                const childCategories = await CategoryService.getChildCategories(product.category_id);
                setChildCategoriesLevels([childCategories]);
            }
        };
        
        fetchData();
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await ProductService.addProduct(formState);
            router.push('/admin?tab=productos');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleParentCategoryChange = async (e) => {
        const childCategories = await CategoryService.getChildCategories(e.target.value);
        setFormState({
            ...formState,
            category_id: childCategories.length === 0 ? e.target.value : null
        });
        setChildCategoriesLevels([childCategories]);
    };

    const handleChildCategoryChange = async (e, level) => {
        const newChildCategories = await CategoryService.getChildCategories(e.target.value);
        setFormState({
            ...formState,
            category_id: newChildCategories.length === 0 ? e.target.value : null
        });
        setChildCategoriesLevels(prevState => {
            const newState = [...prevState];
            newState[level] = newChildCategories;
            return newState.slice(0, level + 1);
        });
    };

    return (
        <main
            className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-xl"
        >
            <h1 className="text-2xl font-bold mb-4">Crear Producto</h1>
            {error && <p className="mb-4 text-red-500">{error}</p>}
            <form onSubmit={handleRegister}>
                <section className="mb-4">
                    <Input type='text' label='Nombre del Producto' value={formState.name} onChange={handleChange} onClear={() => setFormState({...formState, name: ''})}/>
                </section>
                <section className="mb-4">
                    <Textarea label='Descripción del Producto' value={formState.description} onChange={handleChange} onClear={() => setFormState({...formState, description: ''})} className="h-auto"/>
                </section>
                <section className="mb-4">
                    <Select name='brand' label='Marca' value={formState.brand} onChange={handleChange}>
                        {brands.map((brand) => (<SelectItem key={brand.id_brand} value={brand.id_brand}>{brand.brand_name}</SelectItem>))}
                    </Select>
                </section>
                <section className="mb-4">
                    <Input type='number' label='Cantidad en Stock' value={formState.stock} onChange={handleChange} onClear={() => setFormState({...formState, stock: 1})}/>
                </section>
                <section className="mb-4">
                    <Input type='text' label='Precio del Producto' value={formState.price} onChange={(e) => setPrice(e.target.value)} inputMode="numeric" onClear={() => setPrice('')}/>
                </section>
                <section className="mb-4">
                    <Select 
                        name='category' 
                        label='Categoría del Producto' 
                        value={formState.category_id} 
                        onChange={handleParentCategoryChange} 
                        data-filled
                    >
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
                                <Select 
                                    name={`childCategory${index}`} 
                                    label='Subcategoría del Producto' 
                                    value={formState.category_id}
                                    onChange={(e) => handleChildCategoryChange(e, index + 1)}
                                >
                                    {childCategories.map((category) => (<SelectItem key={category.category_id} value={category.category_id}>{category.category_name}</SelectItem>))}
                                </Select>
                            </motion.section>
                        )
                    ))}
                </AnimatePresence>
                <section className="mb-4">
                    <input type='file' multiple id='images' className="w-full px-4 py-2 border rounded-lg" onChange={(e) => setImages(e.target.files)}/>
                </section>
                <section className="mb-4">
                    <Button type='submit' disabled={loading} className="w-full">{loading ? 'Cargando...' : 'Crear Producto'}</Button>
                    <Button type='button' color="danger" onClick={() => router.push('/admin?tab=productos')} className="w-full mt-4">Cancelar</Button>
                </section>
            </form>
        </main>
    );
}

export default CreateProduct;