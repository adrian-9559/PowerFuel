import api from './axios.js';

const getRoleById = async (roleId) => {
    let token = sessionStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    const response = await api.get(`/roles/${roleId}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    return response.data;
};


const getUserRole = async () => {
    let token = sessionStorage.getItem('token');
    if (token) {
        const response = await api.post(`/roles/userRole`, {}, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
     return response.data.role_id;
    }

    return 10;
    
};

const deleteRole = async (roleId) => {
    let token = sessionStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    const response = await api.delete(`/roles/${roleId}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

const getAllRoles = async (page = 1, limit = 10) => {
    let token = sessionStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    const response = await api.get(`/roles?page=${page}&limit=${limit}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
const updateRole = async (id, roleName) => {
    try {
        const response = await api.put(`/roles/${id}`, {
            name: roleName,
        });
        return response.data;
    } catch (error) {
        console.error('Error updating role:', error.message);
        throw error;
    }
};

const addRole = async (roleName) => {
    try {
        const response = await api.post('/roles', {
            name: roleName,
        });
        return response.data;
    } catch (error) {
        console.error('Error creating role:', error.message);
        throw error;
    }
};

export { 
    getRoleById,
    getUserRole,
    deleteRole,
    getAllRoles,
    updateRole,
    addRole
};