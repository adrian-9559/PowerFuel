import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useState, useEffect, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductService from '@services/productService';
import CategoryService from '@services/categoryService';
import BrandService from '@services/brandService';
import { useRouter } from 'next/router';

const CreateProduct = () => {
    const [formState, setFormState] = useState({
        product_name: '',
        description: '',
        stock: 1,
        price: 1,
        category_id: 1,
        id_brand: 1,
        images: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [brands, setBrands] = useState([]);
    const [parentCategories, setParentCategories] = useState([]);
    const [childCategoriesLevels, setChildCategoriesLevels] = useState([]);
    const router = useRouter();
    const {id, readOnly} = router.query;

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

    const handleChange = (name) => (value) => {
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await ProductService.addProduct(formState);
            router.push('/admin/Productos');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await ProductService.updateProduct(id, formState);
            router.push('/admin/Productos');
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

    useEffect(() => {
        const fetchData = async () => {
            const categories = await CategoryService.getParentCategories();
            setParentCategories(categories);
    
            const brands = await BrandService.getAllBrandsNoPagination();
            setBrands(brands);
    
            if (id) {
                const product = await ProductService.getProductById(id);
                setFormState({
                    product_name: product.product_name,
                    description: product.description,
                    stock_quantity: product.stock_quantity,
                    price: product.price,
                    category_id: product.category_id,
                    id_brand: product.id_brand
                });

                const childCategories = await CategoryService.getChildCategories(product.category_id);
                setChildCategoriesLevels([childCategories]);
            }
        };
        
        fetchData();
    }, [id]);

    useEffect(() => {
        console.log('formState', formState);
    }, [formState]);

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

    const handleSubmit = (e) => {
        e.preventDefault()
        if (id) {
            handleUpdate(e);
        }
        else {  
            handleRegister(e);
        }
    }


    return (
        <main
            className="max-w-4xl mx-auto mt-10 p-6 rounded-lg shadow-xl mb-10 border-1 border-gray-200"
        >
            <h1 className="text-2xl font-bold mb-4">Crear Producto</h1>
            {error && <p className="mb-4 text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
                <section className="mb-4">
                    <Input 
                        type='text' 
                        label='Nombre del Producto' 
                        name="product_name" 
                        value={formState.product_name} 
                        onValueChange={handleChange('product_name')}
                        isReadOnly={readOnly}
                    />
                </section>
                <section className="mb-4">
                    <Textarea 
                        label='Descripción del Producto' 
                        value={formState.description} 
                        onValueChange={handleChange('description')}
                        isReadOnly={readOnly}
                    />
                </section>
                <section className="mb-4">
                <Select 
                    name='brand' 
                    label='Marca' 
                    value={formState.id_brand} 
                    onValueChange={handleChange('id_brand')}
                    isDisabled={readOnly}
                >
                    {brands.map((brand) => (<SelectItem key={brand.id_brand} value={brand.id_brand}>{brand.brand_name}</SelectItem>))}
                </Select>
                </section>
                <section className="mb-4">
                    <Input 
                        type='number' 
                        label='Cantidad en Stock' 
                        value={formState.stock_quantity} 
                        onValueChange={handleChange('stock_quantity')}
                        isReadOnly={readOnly}
                    />
                </section>
                <section className="mb-4">
                    <Input 
                        type='number' 
                        label='Precio del Producto' 
                        value={formState.price} 
                        onValueChange={handleChange('price')}
                        isReadOnly={readOnly}
                    />
                </section>
                <section className="mb-4">
                    <Select 
                        name='category' 
                        label='Categoría del Producto' 
                        value={formState.category_id} 
                        onChange={handleParentCategoryChange} 
                        data-filled
                        isDisabled={readOnly}
                    >
                        {parentCategories.map((category) => (<SelectItem key={category.category_id} defaultValue={category.category_id}>{category.category_name}</SelectItem>))}
                    </Select>
                </section>
                <AnimatePresence>
                    {childCategoriesLevels.map((childCategories, index) => (
                        childCategories.length > 0 && (
                            <motion.section 
                                key={childCategories.category_id}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.225 }}
                                className="mb-4"
                            >
                                <Select 
                                    name={`childCategory${index}`} 
                                    label='Subcategoría del Producto' 
                                    value={formState.category_id}
                                    onChange={(e) => handleChildCategoryChange(e, index + 1)}
                                    readOnly={readOnly}
                                >
                                    {childCategories.map((category) => (<SelectItem key={category.category_id} defaultValue={category.category_id}>{category.category_name}</SelectItem>))}
                                </Select>
                            </motion.section>
                        )
                    ))}
                </AnimatePresence>
                {!readOnly && readOnly !== "true" && (
                    <section className="mb-4">
                        <input type='file' multiple id='images' className="w-full px-4 py-2 border rounded-lg" onChange={(e) => setFormState({...formState, images: e.target.files})}/>
                    </section>
                )}
                <section>
                    {!readOnly && readOnly !== "true" && (
                        <Button type='submit' disabled={loading} className="w-full">{loading ? 'Cargando...' : {id} ? 'Guardar cambios' : 'Crear Producto'}</Button>
                        
                    )}
                    <Button type='button' color="danger" onClick={() => router.push('/admin/Productos')} className="w-full mt-4">Cancelar</Button>
                </section>
            </form>
        </main>
    );
}

export default CreateProduct;