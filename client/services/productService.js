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

    async getProductsNovedades(limit = 15, page = 1, order = "ASC", startDate = null, endDate = null) {
        try {
            const response = await api.post(`/products/date?startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}&order=${order}`);
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
            const formData = new FormData();
            formData.append('product_name', product.product_name);
            formData.append('description', product.description);
            formData.append('stock_quantity', product.stock_quantity);
            formData.append('price', product.price);
            formData.append('category_id', product.category_id);
            formData.append('id_brand', product.id_brand);

            const response = await api.put(`/products/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            this.uploadImages(id, product.images);

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
            return response.data.count;
        } catch (error) {
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

    async getRandomProducts(limit) {
        try {
            const response = await api.post(`/products/random?limit=${limit}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async uploadImages(id, images) {
        if (!images.length) {
            throw new Error('Images must be an array or a FileList');
        }
    
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

    async deleteImage(id, imageId) {
        try {
            const response = await api.post(`/files/deleteProduct/${id}/${imageId}`);
            return response.data;
        } catch (error) {
            toastr.error(error);
            throw error;
        }
    }

    async getAllProductsSearch(query, limit = 10, page = 1) {
        try {
            const response = await api.post(`/products/search?page=${page}&limit=${limit}`, {
                query
            
            });
            return response.data;
        } catch (error) {
            toastr.error(error);
            throw error;
        }
    }
}

const productService = new ProductService();

export default productService;