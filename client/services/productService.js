import api from './axios.js';

const getProductById = async (id) => {
    try {
        const response = await api.get(`/products/${id}`);
        if (!response.data.product) {
            throw new Error('Product not found');
        }
        return response.data.product;
    } catch (error) {
        console.error('Error fetching product:', error.message);
        throw error;
    }
};

const getAllProducts = async () => {
    try {
        const response = await api.get(`/products`);
        return response.data.products;
    } catch (error) {
        console.error('Error fetching products:', error.message);
        throw error;
    }
};

const getAllProductsSearch = async (search) => {
    try {
        const response = await api.get(`/products/search/${search}`);
        return response.data.products;
    } catch (error) {
        console.error('Error fetching products:', error.message);
        throw error;
    }
};

const getAllProductsByCategory = async (categoryId) => {
    try {
        const response = await api.get(`/products/category/${categoryId}`);
        return response.data.products;
    } catch (error) {
        console.error('Error fetching products:', error.message);
        throw error;
    }
}

const getProductsInfo = async (page = 1, limit = 10) => {
    try {
        const response = await api.post(`/products/info?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error.message);
        throw error;
    }
}

const addProduct = async (product) => {
    let idProduct;
    const formData = new FormData();
    formData.append('product_name', product.name);
    formData.append('description', product.description);
    formData.append('stock_quantity', product.stock);
    formData.append('price', product.price);
    formData.append('category_id', product.category_id);
    formData.append('id_brand', product.brand);

    try {
        const response = await api.post('/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        idProduct = response.data;

    } catch (error) {
        console.error('Error creating product:', error.message);
        throw error;
    }


    if(idProduct){
        try {
            const imgFormData = new FormData();
    
            for (let i = 0; i < product.images.length; i++) {
                imgFormData.append('images', product.images[i]);
            }
    
            await api.post(`/files/upload/${idProduct}`, imgFormData);
    
        } catch (error) {
            console.error('Error uploading product images:', error.message);
            throw error;
        }
    }
};

const updateProduct = async (id, product) => {
    try {
        const response = await api.put(`/products/${id}`, product);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error.message);
        throw error;
    }
};

const deleteProduct = async (id) => {
    try {
        await api.delete(`/products/${id}`);
    } catch (error) {
        console.error('Error deleting product:', error.message);
        throw error;
    }

    try {
        await api.delete(`/files/upload/${id}`);
    } catch (error) {
        console.error('Error deleting product images:', error.message);
        throw error;
    }
};

const getImageCount = async (id) => {
    try {
        const response = await api.get(`/products/img/count/${id}`);
        if (!response.data.count) {
            throw new Error('Image count not found');
            return 0;
        }
        return response.data.count;
    } catch (error) {
        console.error('Error fetching image count:', error.message);
        throw error;
    }
}

export { 
    getProductById, 
    getAllProducts, 
    addProduct, 
    updateProduct, 
    deleteProduct,
    getProductsInfo,
    getImageCount,
    getAllProductsSearch,
    getAllProductsByCategory
};