import ProductListCategory from '@components/category/ProductListCategory';
import DefaultLayout from '@layouts/default';
import { useRouter } from 'next/router';

const Category = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <>
            <DefaultLayout>
                <main>
                    <ProductListCategory id={id} />
                </main>
            </DefaultLayout>
        </>
    );
};

export default Category;