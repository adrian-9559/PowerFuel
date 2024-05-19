import api from './axios';
import toastr from 'toastr';
class ProductService {

    async getProductById(id) {
        try {
            const response = await api.get(`/products/${id}`);
            if (!response.data) {
                throw new Error('Product not found');
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getProducts(page = 1, limit = 10) {
        try {
            const response = await api.get(`/products?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getAllProductsByCategory(id) {
        try {
            const response = await api.get(`/products/category/${id}`);
            return response.data.products;
        } catch (error) {
            throw error;
        }
    }

    async addProduct(product) {
        try {
            const formData = new FormData();
            formData.append('product_name', product.product_name);
            formData.append('description', product.description);
            formData.append('stock_quantity', product.stock);
            formData.append('price', product.price);
            formData.append('category_id', product.category_id);
            formData.append('id_brand', product.id_brand);

            const response = await api.post(`/products`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            this.uploadImages(response.data, product.images);

            return response.data;
        } catch (error) {
            toastr.error(error);
            throw error;
        }
    }

    async updateProduct(id, product) {
        try {
            const response = await api.put(`/products/${id}`, product);
            return response.data;
        } catch (error) {
            toastr.error(error);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const response = await api.delete(`/products/${id}`);
            this.deleteImage(id);
            return response.data;
        } catch (error) {
            toastr.error(error);
            throw error;
        }
    }

    async getImageCount(id) {
        try {
            const response = await api.get(`/products/img/count/${id}`);
            if (!response.data.count) {
                throw new Error('Image count not found');
            }
            return response.data.count;
        } catch (error) {
            throw error;
        }
    }

    async uploadImages(id, images) {
        try {
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
        } catch (error) {
            toastr.error(error);
            throw error;
        }
    }

    async deleteImage(id) {
        try {
            const response = await api.post(`/files/deleteProduct/${id}`);
            return response.data;
        } catch (error) {
            toastr.error(error);
            throw error;
        }
    }
}

const productService = new ProductService();

export default productService;