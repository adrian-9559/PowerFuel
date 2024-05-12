import React from 'react';
import {Card, Button} from '@nextui-org/react';
import ProductCategory from '@components/category/ProductListCategory';
import CategoryService from '@services/categoryService';
import { useRouter } from 'next/router';

const CategoryList = () => {

    const [categories, setCategories] = React.useState([]);
    const router = useRouter();

    React.useEffect(() => {
        CategoryService.getCategories().then((response) => {
            setCategories(response.categories);
        });
    }
    , []);

    // Function to generate a hash from a string
    const stringToHash = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    }

    // Function to generate a color from a hash
    const hashToColor = (hash) => {
        const hue = hash % 280;
        return `hsl(${hue}, 100%, 80%)`;
    }

    // Function to lighten a color
    const lightenColor = (color, percent) => {
        const [hue, saturation, lightness] = color.match(/\d+/g);
        return `hsl(${hue}, ${saturation}%, ${Math.min(100, Number(lightness) + percent)}%)`;
    }

    return (
        <main className='mx-48'>
            <section className='flex flex-col gap-4 px-4'>
                {categories && categories.map((category) => {
                    const color = hashToColor(stringToHash(category.category_name));
                    const lightColor = lightenColor(color, 20); // Lighten the color by 20%
                    return (
                        <Card key={category.category_id} shadow className='p-4 rounded-lg'> {/* Add padding and rounded corners here */}
                            <Card className='flex flex-row items-center p-2 justify-between' style={{backgroundColor: color}}> {/* Move the background color here */}
                                <h2 className='font-bold ml-2'>{category.category_name}</h2> 
                                <Button style={{backgroundColor: lightColor}} light auto onClick={() => {router.push(`/category/${category.category_id}`)}}>Ver más</Button> {/* Use the lightened color here */}
                            </Card>
                            <ProductCategory key={category.id} id={category.category_id} />
                        </Card>
                    );
                })}
            </section>
        </main>
    );
};

export default CategoryList;