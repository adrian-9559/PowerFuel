import ProductListCategory from '@components/product/ProductListCategory';
import DefaultLayout from '@layouts/default';
import { useRouter } from 'next/router';

const Category = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <>
            <DefaultLayout>
                <ProductListCategory id={id} />
            </DefaultLayout>
        </>
    );
};

export default Category;