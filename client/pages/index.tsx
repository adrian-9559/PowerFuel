
import React, { useEffect } from 'react';
import DefaultLayout from '@layouts/default';
import {NextUIProvider} from "@nextui-org/react";
import CategoryList from '@components/category/categoryList';

const HomePage = () => {
    return (
        <NextUIProvider>
            <DefaultLayout>
                <CategoryList />
            </DefaultLayout>
        </NextUIProvider>
    );
};

export default HomePage;