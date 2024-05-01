import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductService from '@services/productService';
import CategoryService from '@services/categoryService';
import BrandService from '@services/brandService';
import { useRouter } from 'next/router';


const CreateProduct = () => {
    const [nameProduct, setName] = useState('');
    const [descriptionProduct, setDescription] = useState('');
    const [stockProduct, setStock] = useState(1);
    const [priceProduct, setPrice] = useState('');
    const [categoryProduct, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [brands, setBrands] = useState([]);
    const [brandProduct, setBrand] = useState('');
    const [parentCategories, setParentCategories] = useState([]);
    const [images, setImages] = useState(null);
    const [childCategoriesLevels, setChildCategoriesLevels] = useState([]);
    const router = useRouter();


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

    const handleSelectionChange = (e) => {
        if (e.target.name === 'brand') {
            setBrand(e.target.value);
        } else if (e.target.name === 'category') {
            setCategory(e.target.value);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const product = {
                name: nameProduct,
                description: descriptionProduct,
                stock: stockProduct,
                price: priceProduct,
                category_id: categoryProduct,
                brand: brandProduct,
                images: images
            };
    
            await ProductService.addProduct(product);
            router.push('/admin');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleParentCategoryChange = async (e) => {
        const childCategories = await CategoryService.getChildCategories(e.target.value);
        if (childCategories.length === 0) {
            setCategory(e.target.value);  // Solo actualiza categoryProduct si la categoría seleccionada no tiene categorías hijas
            console.log(e.target.value);
        }else{
            setCategory(null);  // Si la categoría seleccionada tiene categorías hijas, se elimina la categoría seleccionada
        }
        setChildCategoriesLevels([childCategories]);  // Reinicia childCategoriesLevels y añade el primer nivel de categorías hijas
    };

    const handleChildCategoryChange = async (e, level) => {
        const newChildCategories = await CategoryService.getChildCategories(e.target.value);
        if (newChildCategories.length === 0) {
            setCategory(e.target.value);  // Solo actualiza categoryProduct si la categoría seleccionada no tiene categorías hijas
        }else{
            setCategory(null);  // Si la categoría seleccionada tiene categorías hijas, se elimina la categoría seleccionada
        }
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
            <h1 className="text-2xl font-bold mb-4">Crear Producto</h1>
            {error && <p className="mb-4 text-red-500">{error}</p>}
            <form onSubmit={handleRegister}>
                <section className="mb-4">
                    <Input type='text' label='Nombre del Producto' value={nameProduct} onChange={(e) => setName(e.target.value)} onClear={() => setName('')}/>
                </section>
                <section className="mb-4">
                    <Textarea label='Descripción del Producto' value={descriptionProduct} onChange={(e) => setDescription(e.target.value)} onClear={() => setDescription('')} className="h-auto"/>
                </section>
                <section className="mb-4">
                    <Select name='brand' label='Marca' selectedKeys={[brandProduct]} onChange={handleSelectionChange}>
                        {brands.map((brand) => (<SelectItem key={brand.id_brand} value={brand.id_brand}>{brand.brand_name}</SelectItem>))}
                    </Select>
                </section>
                <section className="mb-4">
                    <Input type='number' label='Cantidad en Stock' value={stockProduct} onChange={(e) => setStock(e.target.value)} onClear={() => setStock(1)}/>
                </section>
                <section className="mb-4">
                    <Input type='text' label='Precio del Producto' value={priceProduct} onChange={(e) => setPrice(e.target.value)} inputMode="numeric" onClear={() => setPrice('')}/>
                </section>
                <section className="mb-4">
                    <Select name='category' label='Categoría del Producto' onChange={handleParentCategoryChange} data-filled>
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
                                <Select name={`childCategory${index}`} label='Subcategoría del Producto' onChange={(e) => handleChildCategoryChange(e, index + 1)}>
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
                    <Button type='button' color="danger" onClick={() => router.push('/admin')} className="w-full mt-4">Cancelar</Button>
                </section>
            </form>
        </motion.main>
    );
}

export default CreateProduct;