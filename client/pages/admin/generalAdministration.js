import React, { useState, useEffect } from 'react';
import {Card, CardHeader, CardBody, CardFooter, Button, Calendar, Slider, CircularProgress, ScrollShadow, Listbox, ListboxItem} from "@nextui-org/react";
import {today, getLocalTimeZone} from "@internationalized/date";
import UserService from '@services/userService';
import OrderService from '@services/orderService';
import ProductService from '@services/productService';
import serverService from '@services/serverService';
import CategoryService from '@services/categoryService';
import RoleService from '@services/roleService';
import BrandService from '@services/brandService';

const GeneralAdministration = () => {
    const [numUsersRegisterWeek, setNumUsersRegisterWeek] = useState(0);
    const [numTotalUsers, setNumTotalUsers] = useState(0);
    const [numTotalUsersActive, setNumTotalUsersActive] = useState(0);
    const [numTotalUsersDisabled, setNumTotalUsersDisabled] = useState(0);
    const [numTotalOrders, setNumTotalOrders] = useState(0);
    const [numTotalOrdersWeek, setNumTotalOrdersWeek] = useState(0);
    const [numTotalOrdersDelivey, setNumTotalOrdersDelivey] = useState(0);
    const [numTotalOrdersDelivered, setNumTotalOrdersDelivered] = useState(0);
    const [numTotalProducts, setNumTotalProducts] = useState(0);
    const [numTotalProductsEnabled, setNumTotalProductsEnabled] = useState(0);
    const [numTotalProductsDisabled, setNumTotalProductsDisabled] = useState(0);
    const [numTotalProductsOutOfStock, setNumTotalProductsOutOfStock] = useState(0);
    const [usoRAMPorcentaje, setUsoRAMPorcentaje] = useState(0);
    const [usoCPUPorcentaje, setUsoCPUPorcentaje] = useState(0);
    const [usoDiskPorcentaje, setUsoDiskPorcentaje] = useState(0);
    const [categories, setCategories] = useState([]);
    const [roles, setRoles] = useState([]);
    const [brands, setBrands] = useState([]);
    const [colorCPU, setColorCPU] = useState(null);
    const [colorRAM, setColorRAM] = useState(null);
    const [colorDisk, setColorDisk] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            serverService.getServerInfo()
                .then((result) => {
                    setUsoCPUPorcentaje(result.cpu);
                    setUsoRAMPorcentaje(result.ram);
                    setUsoDiskPorcentaje(result.disk);
                })
                .then(() => {
                    setColorCPU(colores(usoCPUPorcentaje));
                    setColorRAM(colores(usoRAMPorcentaje));
                    setColorDisk(colores(usoDiskPorcentaje));
                })
                .catch((err) => {
                    console.error("Error al obtener la información del rendimiento del servidor")
                });
        }, 5000);

        return () => clearInterval(interval);
    })

    function colores(data){
        if (data > 80) {
            return "danger";
        } else if (data > 50) {
            return "warning";
        } else {
            return "success";
        }
    }

    function formatDate(date) {
        const t = date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
        return t;
    }

    const getUserInfo = async () => {
        const response = await UserService.generalPanelInfo();
        setNumTotalUsers(response.totalUsers);
        setNumTotalUsersActive(response.totalActiveUsers);
        setNumTotalUsersDisabled(response.totalInactiveUsers);
        setNumUsersRegisterWeek(response.totalUsersRegitrationWeek);
    }

    const getOrdersInfo = async () => {
        const response = await OrderService.generalPanelInfo();
        setNumTotalOrders(response.orders);
        setNumTotalOrdersWeek(response.ordersWeek);
        setNumTotalOrdersDelivey(response.orderDelivery);
        setNumTotalOrdersDelivered(response.orderDelivered);
    }

    const getProductsInfo = async () => {
        const response = await ProductService.generalPanelInfo();
        setNumTotalProducts(response.totalProducts);
        setNumTotalProductsEnabled(response.productEnabled);
        setNumTotalProductsDisabled(response.productDisabled);
        setNumTotalProductsOutOfStock(response.productOutStock);
    }

    const fetchAllCategories = async () => {
        const categories = await CategoryService.getAllCategories();
        setCategories(categories);
    };

    const fetchAllRoles = async () => {
        const roles = await RoleService.getAllRoles();
        setRoles(roles);
    };

    const fetchAllBrands = async () => {
        const response = await BrandService.getAllBrandsNoPagination();
        setBrands(response.brands);
    };

    useEffect(() => {
        getUserInfo();
        getOrdersInfo();
        getProductsInfo();
        fetchAllCategories();
        fetchAllRoles();
        fetchAllBrands();
    }, [])

    return (
        <section className='grid gap-3'>
            <section className="w-full flex flex-col gap-8">
                <section className='w-full flex gap-3'>
                    <Card className="col-span-12 sm:col-span-4 h-auto w-full">
                        <CardHeader className="flex-col !items-start pb-0">
                            <p className="text-tiny uppercase font-bold">Usuarios</p>
                            <h4 className="font-medium text-large">Estadísticas</h4>
                        </CardHeader>
                        <CardBody className="justify-center h-auto w-full grid grid-cols-2 grid-row-2 gap-2">
                            <Card className='bg-blue-500 bg-opacity-50 rounded-[0.375rem] '>
                                <CardHeader >
                                    <h4 className="font-medium text-2xs text-tiny">Número total de usuarios</h4>
                                </CardHeader>
                                <CardBody>
                                    <p className="uppercase text-6xl">{numTotalUsers}</p>
                                </CardBody>
                            </Card>
                            <Card className='bg-blue-500 w-auto bg-opacity-50 h-auto flex flex-col rounded-[0.375rem]'>
                                <CardHeader className="z-10 flex-col !items-start pb-0">
                                    <h4 className="font-medium text-2xs  text-tiny">Usuarios registrados esta semana</h4>
                                </CardHeader>
                                <CardBody>
                                    <p className="uppercase text-6xl">{numUsersRegisterWeek}</p>
                                </CardBody>
                            </Card>
                            <Card className='bg-blue-500 w-auto  bg-opacity-50 h-auto flex flex-col rounded-[0.375rem]'>
                                <CardHeader className="z-10 flex-col !items-start pb-0">
                                    <h4 className="font-medium text-2xs text-tiny">Usuarios activos</h4>
                                </CardHeader>
                                <CardBody>
                                    <p className="uppercase text-6xl">{numTotalUsersActive}</p>
                                </CardBody>
                            </Card>
                            <Card className='bg-blue-500 w-auto bg-opacity-50 h-auto flex flex-col rounded-[0.375rem]'>
                                <CardHeader className="z-10 flex-col !items-start pb-0">
                                    <h4 className="font-medium text-2xs text-tiny">Usuarios desabilitados</h4>
                                </CardHeader>
                                <CardBody>
                                    <p className="uppercase text-6xl">{numTotalUsersDisabled}</p>
                                </CardBody>
                            </Card>
                        </CardBody>
                    </Card>
                    <Card className="col-span-12 sm:col-span-4 h-auto w-full">
                        <CardHeader className="flex-col !items-start pb-0">
                            <p className="text-tiny uppercase font-bold">Marcas</p>
                            <h4 className="font-medium text-large">Listado</h4>
                        </CardHeader>
                        <CardBody>
                            <ScrollShadow aria-label='marcas scroll' className='h-[20rem] bg-orange-500 bg-opacity-30 rounded-lg'>
                                <Listbox
                                    items={brands}
                                    aria-label="Marcas"
                                >
                                        {(brand) => (
                                            <ListboxItem
                                                key={brand.id_brand}
                                            >
                                                {brand.brand_name}
                                            </ListboxItem>
                                        )}
                                </Listbox>
                            </ScrollShadow>
                        </CardBody>
                    </Card>
                    <Card className="col-span-12 sm:col-span-4 h-auto w-full">
                    <CardHeader className="flex-col !items-start pb-0">
                            <p className="text-tiny uppercase font-bold">Productos</p>
                            <h4 className="font-medium text-large">Estadísticas</h4>
                        </CardHeader>
                        <CardBody className=" justify-center h-auto w-full grid grid-cols-2 grid-row-2 gap-2">
                            <Card className='bg-green-500 w-auto bg-opacity-50 h-auto flex flex-col rounded-[0.375rem] '>
                                <CardHeader className="z-10 flex-col !items-start pb-0">
                                    <h4 className="font-medium text-2xs text-tiny">Número total de productos</h4>
                                </CardHeader>
                                <CardBody>
                                    <p className="uppercase text-6xl ">{numTotalProducts}</p>
                                </CardBody>
                            </Card>
                            <Card className='bg-green-500 w-auto h-auto bg-opacity-50 flex flex-col rounded-[0.375rem]'>
                                <CardHeader className="z-10 flex-col !items-start pb-0">
                                    <h4 className="font-medium text-2xs  text-tiny">Productos habilitados</h4>
                                </CardHeader>
                                <CardBody>
                                    <p className="uppercase text-6xl">{numTotalProductsEnabled}</p>
                                </CardBody>
                            </Card>
                            <Card className='bg-green-500 w-auto  bg-opacity-50 h-auto flex flex-col rounded-[0.375rem]'>
                                <CardHeader className="z-10 flex-col !items-start pb-0">
                                    <h4 className="font-medium text-2xs  text-tiny">Productos sin stock</h4>
                                </CardHeader>
                                <CardBody>
                                    <p className="uppercase text-6xl">{numTotalProductsOutOfStock}</p>
                                </CardBody>
                            </Card>
                            <Card className='bg-green-500 w-auto h-auto bg-opacity-50  flex flex-col rounded-[0.375rem]'>
                                <CardHeader className="z-10 flex-col !items-start pb-0">
                                    <h4 className="font-medium text-2xs  text-tiny">Productos desabilitados</h4>
                                </CardHeader>
                                <CardBody>
                                    <p className="uppercase text-6xl">{numTotalProductsDisabled}</p>
                                </CardBody>
                            </Card>
                        </CardBody>    
                    </Card>
                    <Card className=" h-auto w-full">
                        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                            <p className="text-tiny uppercase font-bold">Calendario</p>
                        </CardHeader>
                        <CardBody className="flex justify-center items-center mt-6">
                        <Calendar
                            isReadOnly
                            showMonthAndYearPickers
                            aria-label="Date (Max Date Value)"
                            defaultValue={today(getLocalTimeZone())}
                            maxValue={today(getLocalTimeZone())}
                        />
                        </CardBody>
                    </Card>
                </section>
            </section>
            <section className='w-full flex gap-3'>
                <Card className="col-span-12 sm:col-span-4 h-auto w-full">
                    <CardHeader className="flex-col !items-start pb-0">
                        <p className="text-tiny uppercase font-bold">Categorias</p>
                        <h4 className="font-medium text-large">Listado</h4>
                    </CardHeader>
                    <CardBody className="mt-2">
                        <ScrollShadow aria-label='categorias scroll' className='h-[20rem] bg-rose-500 bg-opacity-30 rounded-lg'>
                            <Listbox
                                items={categories}
                                aria-label="Categorias"
                            >
                                    {(category) => (
                                        <ListboxItem
                                            key={category.category_id}
                                        >
                                            {category.category_name}
                                        </ListboxItem>
                                    )}
                            </Listbox>
                        </ScrollShadow>
                    </CardBody>
                </Card>
                <Card className="col-span-12 sm:col-span-4 h-auto w-full">
                    <CardHeader className="flex-col !items-start pb-0">
                        <p className="text-tiny uppercase font-bold">Pedidos</p>
                        <h4 className="font-medium text-large">Estadísticas</h4>
                    </CardHeader>
                    <CardBody className=" justify-center h-auto w-full grid grid-cols-2 grid-row-2 gap-2">
                        <Card className='bg-purple-500 w-auto h-auto bg-opacity-50 flex flex-col rounded-[0.375rem] '>
                            <CardHeader className="z-10 flex-col !items-start pb-0">
                                <h4 className="font-medium text-2xs text-tiny">Número total de pedidos</h4>
                            </CardHeader>
                            <CardBody>
                                <p className="uppercase text-6xl ">{numTotalOrders}</p>
                            </CardBody>
                        </Card>
                        <Card className='bg-purple-500 w-auto h-auto bg-opacity-50 flex flex-col rounded-[0.375rem]'>
                            <CardHeader className="z-10 flex-col !items-start pb-0">
                                <h4 className="font-medium text-2xs text-tiny">Pedidos semanales</h4>
                            </CardHeader>
                            <CardBody>
                                <p className="uppercase text-6xl">{numTotalOrdersWeek}</p>
                            </CardBody>
                        </Card>
                        <Card className='bg-purple-500 w-auto bg-opacity-50 h-auto flex flex-col rounded-[0.375rem]'>
                            <CardHeader className="z-10 flex-col !items-start pb-0">
                                <h4 className="font-medium text-2xs text-tiny">Pedidos en reparto</h4>
                            </CardHeader>
                            <CardBody>
                                <p className="uppercase text-6xl">{numTotalOrdersDelivey}</p>
                            </CardBody>
                        </Card>
                        <Card className='bg-purple-500 w-auto h-auto bg-opacity-50 flex flex-col rounded-[0.375rem]'>
                            <CardHeader className="z-10 flex-col !items-start pb-0">
                                <h4 className="font-medium text-2xs  text-tiny">Pedidos entregados</h4>
                            </CardHeader>
                            <CardBody>
                                <p className="uppercase text-6xl">{numTotalOrdersDelivered}</p>
                            </CardBody>
                        </Card>
                    </CardBody>
                </Card>
                <Card className="col-span-12 sm:col-span-4 h-auto w-full">
                    <CardHeader className="flex-col !items-start pb-0">
                        <p className="text-tiny uppercase font-bold">Rol</p>
                        <h4 className="font-medium text-large">Listado</h4>
                    </CardHeader>
                    <CardBody>
                        <ScrollShadow aria-label='roles scroll' className='h-[20rem] bg-blue-500 bg-opacity-30 rounded-lg'>
                            <Listbox
                                items={roles}
                                aria-label="Roles"
                            >
                                    {(role) => (
                                        <ListboxItem
                                            key={role.role_id}
                                        >
                                            {role.role_name}
                                        </ListboxItem>
                                    )}
                            </Listbox>
                        </ScrollShadow>
                    </CardBody>
                </Card>
                <Card className="col-span-12 sm:col-span-4 h-auto w-full">
                    <CardHeader className="flex-col !items-start pb-0">
                        <p className="text-tiny uppercase font-bold">Hardware</p>
                        <h4 className="font-medium text-large">Estadísticas</h4>
                    </CardHeader>
                    <CardBody className="justify-center h-auto w-full grid grid-cols-2 grid-row-2 gap-2">
                        <Card className='bg-emerald-700 bg-opacity-50 rounded-[0.375rem] '>
                            <CardHeader >
                                <h4 className="font-medium text-2xs text-tiny">Uso de la CPU</h4>
                            </CardHeader>
                            <CardBody>
                                <CircularProgress
                                    classNames={{
                                        svg: "w-20 h-20 drop-shadow-md",
                                        value: "text-xl font-semibold",
                                    }}
                                    aria-label="Loading..."
                                    value={usoCPUPorcentaje || 0}
                                    color={colorCPU}
                                    showValueLabel={true}
                                />
                            </CardBody>
                        </Card>
                        <Card className='bg-emerald-700 bg-opacity-50 rounded-[0.375rem] '>
                            <CardHeader >
                                <h4 className="font-medium text-2xs text-tiny">Uso de la RAM</h4>
                            </CardHeader>
                            <CardBody>
                                <CircularProgress
                                    classNames={{
                                        svg: "w-20 h-20 drop-shadow-md",
                                        value: "text-xl font-semibold",
                                    }}
                                    aria-label="Loading..."
                                    value={usoRAMPorcentaje || 0}
                                    color={colorRAM}
                                    showValueLabel={true}
                                />
                            </CardBody>
                        </Card>
                        <Card className='bg-emerald-700 bg-opacity-50 rounded-[0.375rem] '>
                            <CardHeader >
                                <h4 className="font-medium text-2xs text-tiny">Uso de la RAM</h4>
                            </CardHeader>
                            <CardBody>
                                <CircularProgress
                                    classNames={{
                                        svg: "w-20 h-20 drop-shadow-md",
                                        value: "text-xl font-semibold",
                                    }}
                                    aria-label="Loading..."
                                    value={usoDiskPorcentaje || 0}
                                    color={colorDisk}
                                    showValueLabel={true}
                                />
                            </CardBody>
                        </Card>
                    </CardBody>
                </Card>
            </section>
        </section>
    )
}

export default GeneralAdministration;