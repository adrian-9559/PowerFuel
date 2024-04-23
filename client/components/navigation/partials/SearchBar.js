// SearchBar.js
import React from 'react';
import { Input } from "@nextui-org/react";
import { getAllProductsSearch } from "../../../services/productService";

const searchProduct = (data) => {
    if(data && data != null && data != undefined && data != '') {
        getAllProductsSearch(data)
            .then((response) => {
                console.log(response);
            }
        );
    }
}

const SearchBar = () => {
    return (
        <Input placeholder="Buscar..." type="text" onChange={(e) => searchProduct(e.target.value)}/>
    );
};

export default SearchBar;
