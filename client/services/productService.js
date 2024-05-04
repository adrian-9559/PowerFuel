import api from './axios';

class ProductService {

    async getProductById(id) {
        const response = await api.get(`/products/${id}`);
        if (!response.data.product) {
            throw new Error('Product not found');
        }
        return response.data.product[0];
    }

    async getAllProducts() {
        const response = await api.get(`/products`);
        return response.data.products;
    }

    async getAllProductsSearch(search) {
        const response = await api.get(`/products/search/${search}`);
        return response.data.products;
    }

    async getAllProductsByCategory(id) {
        const response = await api.get(`/products/category/${id}`);
        return response.data.products;
    }

    async getProductsInfo(page = 1, limit = 10) {
        const response = await api.get(`/products/info?page=${page}&limit=${limit}`);
        return response.data;
    }

    async addProduct(product) {
        const formData = new FormData();
        formData.append('product_name', product.name);
        formData.append('description', product.description);
        formData.append('stock_quantity', product.stock);
        formData.append('price', product.price);
        formData.append('category_id', product.category_id);
        formData.append('id_brand', product.brand);

        const response = await api.post(`/products`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            
        });
    
        this.uploadImages(response.data, product.images);
    
        return response.data;
    }
    
    async updateProduct(id, product) {
        const response = await api.put(`/products/${id}`, product);
        return response.data;
    }
    
    async deleteProduct(id) {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    }
    
    async getImageCount(id) {
        const response = await api.get(`/products/img/count/${id}`);
        if (!response.data.count) {
            throw new Error('Image count not found');
        }
        return response.data.count;
    }

    async uploadImages(id, images) {
        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        const response = await api.post(`/files/uploadProduct/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });

        return response.data;
    }
}

export default new ProductService();
