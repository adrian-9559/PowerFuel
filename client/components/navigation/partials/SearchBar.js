// SearchBar.js
import React from 'react';
import { Input } from "@nextui-org/react";
import ProductService from '@services/productService';

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
        <Input className="w-96" placeholder="Buscar..." type="text" onChange={(e) => searchProduct(e.target.value)}/>
    );
};

export default SearchBar;
