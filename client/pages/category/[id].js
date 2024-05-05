import ProductListCategory from '@components/category/ProductListCategory';
import { useRouter } from 'next/router';

const Category = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <main>
            <ProductListCategory id={id} />
        </main>
    );
};

export default Category;