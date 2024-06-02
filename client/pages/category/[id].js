import React, { useEffect, useState } from 'react';
import ProductListCategory from '@components/category/ProductListCategory';
import { useRouter } from 'next/router';
import CategoryService from '@services/categoryService';

const Category = () => {
    const router = useRouter();
    const { id } = router.query;
    const [category, setCategory] = useState({});

    useEffect(() => {
        if (id) {
            CategoryService.getCategoryById(id)
                .then(category => {
                    setCategory(category);
                    console.log(category);
                });
        }
    }
    , [id]);

    return (
        <main className='px-32'>
            <h1 className='text-2xl font-bold text-gray-700 mb-4'>{category.category_name}</h1>
            <div className='grid grid-cols-3 gap-4'>
                <ProductListCategory id={id} />
            </div>
        </main>
    );
};

export default Category;