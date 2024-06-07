import { Button, Input, Select, SelectItem, Textarea, Card, Image } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductService from '@services/productService';
import CategoryService from '@services/categoryService';
import BrandService from '@services/brandService';
import { useRouter } from 'next/router';
import DeleteIcon from '@icons/DeleteIcon';
import useTitle from '@hooks/useTitle'; 

const CreateProduct = () => {
    const [formState, setFormState] = useState({
        product_name: '',
        description: '',
        stock_quantity: 1,
        price: 1,
        category_id: 1,
        id_brand: 1,
        images: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [imageCount, setImageCount] = useState(0);
    const router = useRouter();
    const {id} = router.query;
    useTitle(id?'Editar Producto':'Crear Producto');

    const handleChange = (name) => (value) => {
        setFormState({
            ...formState,
            [name]: value
        });
    
        if (name === 'category_id') {
            setParentCategory(value);
        }
    
        console.log(formState);
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
        

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            handleUpdate(e);
        } else {
            handleRegister(e);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
    
            if (id) {
                const product = await ProductService.getProductById(id, null);
                setFormState({
                    product_name: product.product_name,
                    description: product.description,
                    stock_quantity: product.stock_quantity,
                    price: product.price,
                    category_id: product.category_id,
                    id_brand: product.id_brand
                });

            }
        };

        if (id) {
            ProductService.getImageCount(id).then(count => {
                setImageCount(count);
            });
        }

        
        if (id) {
            const fetchCategory = async () => {
                const category = await CategoryService.getCategoryById(formState.category_id);
                setParentCategory(category.parent_category_id);
            };
            fetchCategory();
        }
        
        fetchData();
    }, [id]);

    useEffect(() => {
        const validateForm = () => {
            const { product_name, description, stock_quantity, price, category_id, id_brand, images } = formState;
            if (product_name && description && stock_quantity > 0 && price > 0 && category_id && id_brand && (images && images.length > 0 || imageCount > 0)) {
                setIsFormValid(true);
            } else {
                setIsFormValid(false);
            }
        };

        validateForm();
    }, [formState, imageCount]);

    useEffect(() => {
        const fetchParentCategories = async () => {
            const response = await CategoryService.getCategories(1,1000);
            setCategories(response.categories);
        };

        const fetchBrands = async () => {
            const response = await BrandService.getAllBrandsNoPagination();
            setBrands(response.brands);
        };
        
        fetchParentCategories();
        fetchBrands();
    }, []);

    const renderProductImages = (isThumbnail = false) => {
        const images = [];
        for (let i = 1; i <= imageCount; i++) {
            if (id) {
                images.push(
                    <div key={i} className='rounded-xl '>
                        <Button 
                            color='danger' 
                            variant='flat' 
                            isIconOnly 
                            radius='full' 
                            onClick={() => ProductService.deleteImage(id, i)}
                            className='absolute z-50 m-1 h-auto p-1'
                        >
                            <DeleteIcon/>
                        </Button>
                        <Image 
                            isZoomed
                            src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/product/${id}/${i}.png`}
                            alt={`Imagen ${i} del producto ${id}`}
                            className={`rounded shadow-lg object-cover cursor-pointer z-10 max-h-32`}
                            disableSkeleton= {imageCount}
                        />
                    </div>
                );
            }
        }
        return images;
    };


    return (
        <main className="max-w-4xl mx-auto mt-10 p-6">
            <Card shadow className="p-5">
                <h1 className="text-2xl font-bold mb-4">{id ? 'Editar Producto' : 'Crear Producto'}</h1>
                {error && <p className="mb-4 text-red-500">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <section className="mb-4">
                        <Input 
                            type='text' 
                            label='Nombre del Producto' 
                            name="product_name" 
                            value={formState.product_name} 
                            onValueChange={handleChange('product_name')}
                        />
                    </section>
                    <section className="mb-4">
                        <Textarea 
                            label='Descripción del Producto' 
                            value={formState.description} 
                            onValueChange={handleChange('description')}
                        />
                    </section>
                    <section className="mb-4">
                    <Select 
                        name='brand' 
                        label='Marca' 
                        value={formState.id_brand} 
                        onValueChange={handleChange('id_brand')}
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
                        />
                    </section>
                    <section className="mb-4">
                        <Input 
                            type='number' 
                            label='Precio del Producto' 
                            value={formState.price} 
                            onValueChange={handleChange('price')}
                        />
                    </section>
                    <section className="mb-4">
                    <Select 
                        name='category' 
                        label='Categoría del Producto' 
                        onValueChange={handleChange('category_id')} 
                        defaultSelectedKeys={[`${parentCategory}`]}
                    >
                        {categories.map((category) => (<SelectItem key={category.category_id.toString()} value={category.category_id.toString()}>{category.category_name}</SelectItem>))}
                    </Select>
                    <p>formState.category_id: {parentCategory}</p>
                </section>
                    {id && (    
                        <section className="mb-4">
                            <h2 className="text-xl font-bold mb-2">Imágenes del Producto</h2>
                            <section className="flex flex-row gap-4 w-full max-h-32">
                                {imageCount === 0 ? (
                                    <p>No hay imágenes para mostrar</p>
                                ) : renderProductImages(true)}
                            </section>
                        </section>
                    )}
                    <section className="mb-4">
                        <input 
                            type='file' 
                            multiple 
                            id='images' 
                            className="w-full px-4 py-2 border rounded-lg" 
                            onChange={(e) => {
                                if (e.target.files.length > 5) {
                                    alert('No puedes subir más de 5 imágenes');
                                } else {
                                    setFormState({...formState, images: e.target.files})
                                }
                            }}
                        />  
                    </section>
                    <section>
                        <Button 
                            type='submit' 
                            disabled={loading || !isFormValid}
                            className="w-full" 
                        >
                            {loading ? 'Cargando...' : (id ? 'Guardar cambios' : 'Crear Producto')}
                        </Button>
                        <Button type='button' color="danger" onClick={() => router.push('/admin/Productos')} className="w-full mt-4">Cancelar</Button>
                    </section>
                </form>
            </Card>
        </main>
    );
}

export default CreateProduct;
