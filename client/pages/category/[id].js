import ProductListCategory from '@components/product/ProductListCategory';
import DefaultLayout from '@layouts/default';
import { useAppContext } from '@context/index';

const Category = () => {
    const { router } = useAppContext();
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