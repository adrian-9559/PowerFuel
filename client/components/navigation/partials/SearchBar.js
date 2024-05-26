// SearchBar.js
import React from 'react';
import { Input } from "@nextui-org/react";
import ProductService from '@services/productService';
import {SearchIcon} from '@icons/SearchIcon';

const searchProduct = (data) => {
    if(data && data != null && data != undefined && data != '') {
        ProductService.getAllProductsSearch(data)
            .then((response) => {
                console.log(response);
            }
        );
    }
}

const SearchBar = () => {
    return (
        <Input 
            className="w-full" variant='faded' placeholder="Buscar..." type="text" 
            onChange={(e) => searchProduct(e.target.value)}
            startContent={<SearchIcon size={16} />}
        />
    );
};

export default SearchBar;
