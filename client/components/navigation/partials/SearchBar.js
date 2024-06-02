// SearchBar.js
import React, { useState, useEffect } from 'react';
import { Input, Image, Card} from "@nextui-org/react";
import ProductService from '@services/productService';
import {SearchIcon} from '@icons/SearchIcon';
import { useRouter } from 'next/router';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
    const [results, setResults] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [searchTerm]);

    useEffect(() => {
        const searchProduct = async (data) => {
            if(data && data != null && data != undefined && data != '') {
                const response = await ProductService.getAllProductsSearch(data, 5, 1);
                if (response && Array.isArray(response.products)) {
                    setResults(response.products);
                } else {
                    console.error('Response does not contain an array of products:', response);
                }
            } else {
                setResults([]);
            }
        }

        if (debouncedTerm) {
            searchProduct(debouncedTerm);
        } else {
            setResults([]);
        }
    }, [debouncedTerm]);

    return (
        <div className='w-full relative'>
            <Input 
                className="w-full" variant='faded' placeholder="Buscar..." type="text" 
                onChange={(e) => setSearchTerm(e.target.value)}
                startContent={<SearchIcon size={16} />}
            />
            {results.length > 0 && (
                <div className='absolute top-full w-full left-0 bg-default-50 rounded-lg shadow-lg border-1 border-default-200 p-1 flex flex-col gap-1' style={{ zIndex: 9999 }}>
                    {Array.isArray(results) && results.map((result, index) => (
                        <Card key={index} className="flex flex-row items-center space-x-2 p-2 focus:bg-default-100 hover:bg-default-100 cursor-pointer" onClick={() => router.push(`/product/${result.product_id}`)}>
                            <Image 
                                src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/product/${result.product_id}/1.png`} 
                                width={50} 
                                height={50} 
                                alt={result.product_name}
                            />
                            <div className="flex-grow text-sm text-start">
                                <h2 className="font-bold overflow-hidden text-overflow ellipsis whitespace-nowrap max-w-[200px] w-full">{result.product_name}</h2>
                                <p>{result.Brand.brand_name}</p>
                            </div>
                            <p className="text-sm font-bold">{result.price} €</p>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;