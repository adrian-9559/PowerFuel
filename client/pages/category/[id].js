import ProductListCategory from '@components/product/ProductListCategory';
import DefaultLayout from '@layouts/default';

const Category = () => {
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