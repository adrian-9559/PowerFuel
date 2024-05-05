import React, { useState, useEffect } from 'react';
import { Tabs, Tab, useDisclosure, Spinner } from '@nextui-org/react';
import UserService from '@services/userService';
import ProductService from '@services/productService';
import CategoryService from '@services/categoryService';
import RoleService from '@services/roleService';
import { useRouter } from 'next/router';
import { useAppContext } from '@context/AppContext';
import AdminTable from '@components/admin/AdminTable';
import AdminModal from '@components/admin/AdminModal';
import AdminButtons from '@components/admin/AdminButtons';

const ADMIN_ACTIONS = {
    '99': {
        'usuarios': {
            getInfo: UserService.getAllUsersInfo,
            delete: UserService.deleteUser,
        },
        'roles': {
            getInfo: RoleService.getAllRoles,
            delete: RoleService.deleteRole
        },
        'productos': {
            getInfo: ProductService.getProductsInfo,
            delete: ProductService.deleteProduct,
        },
        'categorias': {
            getInfo: CategoryService.getCategories,
            delete: CategoryService.deleteCategory,
        },
    },
    '96': { // managerAnalytics
        'usuarios': {
            getInfo: UserService.getAllUsersInfo,
            delete: UserService.deleteUser,
        },
        'roles': {
            getInfo: RoleService.getAllRoles,
            delete: RoleService.deleteRole
        },
        'productos': {
            getInfo: ProductService.getProductsInfo,
            delete: ProductService.deleteProduct,
        },
        'categorias': {
            getInfo: CategoryService.getCategories,
            delete: CategoryService.deleteCategory,
        },
    },
    '94': { // managerOrder
        'productos': {
            getInfo: ProductService.getProductsInfo,
            delete: ProductService.deleteProduct,
        },
        'categorias': {
            getInfo: CategoryService.getCategories,
            delete: CategoryService.deleteCategory,
        },
    },
    '97': {
        'productos': {
            getInfo: ProductService.getProductsInfo,
            delete: ProductService.deleteProduct,
        },
        'categorias': {
            getInfo: CategoryService.getCategories,
            delete: CategoryService.deleteCategory,
        },
    },
    '95': { // managerSupport
        'usuarios': {
            getInfo: UserService.getAllUsersInfo,
            delete: UserService.deleteUser,
        },
        'roles': {
            getInfo: RoleService.getAllRoles,
            delete: RoleService.deleteRole
        },
    },
    '98': { // managerUser
        'usuarios': {
            getInfo: UserService.getAllUsersInfo,
            delete: UserService.deleteUser,
        },
    },
};



function AdminPanel() {
    const [adminType, setAdminType] = useState(null);
    const [dataItems, setDataItems] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedTab, setSelectedTab] = useState(null);
    const [page, setPage] = useState(1);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [columns, setColumns] = useState();
    const [selectedRows, setSelectedRows] = useState([]);
    const router = useRouter();
    const {isAdmin, isLoggedIn} = useAppContext();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkLoginStatus = setTimeout(() => {
            if (!isLoggedIn) {
                router.push('/');
            } else {
                setIsLoading(false);
            }
        }, 1000);
    
        if (isLoggedIn && isAdmin) {
            RoleService.getUserRole()
                .then(role => {
                    if (ADMIN_ACTIONS[role]) {
                        setAdminType(role);
                        setSelectedTab(Object.keys(ADMIN_ACTIONS[role])[0]);
                    } else {
                        console.error(`Invalid admin type:${role}`);
                        router.push('/'); // Redirige a "/" si el tipo de administrador no se encuentra en ADMIN_ACTIONS
                    }
                }).catch(error => {
                    console.error('Error getting user role:', error);
                    router.push('/');
            });
        }
    
        return () => clearTimeout(checkLoginStatus);
    }, [isLoggedIn, isAdmin]);

    useEffect(() => {
        if ( adminType && selectedTab && ADMIN_ACTIONS[adminType] && ADMIN_ACTIONS[adminType][selectedTab]) {
            ADMIN_ACTIONS[adminType][selectedTab].getInfo(page).then(res => {
                if (res && Array.isArray(res.data)) {
                    if (res.data.length > 0) {
                        setDataItems(res.data);
                        setTotalPages(res.pages);
                        setColumns(Object.keys(res.data[0]));
                    } else {
                        setDataItems([]);
                        setTotalPages(0);
                    }
                } else {
                    setDataItems([]);
                    setTotalPages(0);
                }
            }).catch(error => {
                console.error(`Error getting data for tab ${selectedTab}:`, error);
                setDataItems([]);
                setTotalPages(0);
            });
        }
    }, [selectedTab, adminType, page]);

    useEffect(() => {
        setPage(1);
    }, [selectedTab]);

    const handleCreate = () => {
        if(selectedTab === 'roles'){
            router.push('/admin/createRole');
        } else if(selectedTab === 'categorias'){
            router.push('/admin/createCategory');
        }else if(selectedTab === 'productos'){
            router.push('/admin/createProduct');
        }
    };

    const reloadData = () => {
        ADMIN_ACTIONS[adminType][selectedTab].getInfo(page).then(res => {
            setDataItems(res.data);
            setTotalPages(res.pages);
        });
    };

    const handleConfirmDelete = () => {
        selectedRows.forEach(row => {
            ADMIN_ACTIONS[adminType][selectedTab].delete(row).then(() => {
                reloadData();
            });
        });
        setSelectedRows([]);
        onOpenChange(false);
    };

    const handleDelete = () => {
        if(selectedRows.length === 0){
            return;
        }
        onOpen();
    };

    return (
        <main className="flex justify-center items-center">
            {isLoading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <Spinner size="large" />
                </div>
            ) : (
                <div className="flex flex-col items-center my-10 min-h-screen w-[1000px] px-4 md:px-0">
                    <Tabs
                        key={adminType}
                        aria-label="Admin Tabs"
                        selectedKey={selectedTab}
                        onSelectionChange={setSelectedTab}
                    >
                        {adminType && Object.keys(ADMIN_ACTIONS[adminType]).map(tab => (
                            <Tab
                                key={tab}
                                value={tab}
                                title={tab}
                                aria-label={`Admin Tab ${tab}`}
                            />
                        ))}
                    </Tabs>
                    <AdminButtons handleCreate={handleCreate} handleDelete={handleDelete} selectedRows={selectedRows} />
                    <AdminTable dataItems={dataItems} columns={columns} selectedRows={selectedRows} setSelectedRows={setSelectedRows} totalPages={totalPages} page={page} setPage={setPage} />
                    <AdminModal isOpen={isOpen} onOpenChange={onOpenChange} handleConfirmDelete={handleConfirmDelete} />
                </div>
            )}
        </main>
    );
}

export default AdminPanel;