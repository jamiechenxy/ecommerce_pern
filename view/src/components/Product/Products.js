import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    loadProductList, 
    selectProductHasError, 
    selectProductIsLoading, 
    selectProductList, 
} from "../../features/productSlice";
import TextLineLoading from "../../loading/TextLineLoading";
import ProductListLoading from "../../loading/ProductListLoading";
import Product from "./Product";
import "../../stylesheets/Products.css";
import "../../stylesheets/ProductListLoading.css";


const Products = () => {
    const productsArray = useSelector(selectProductList);
    const productIsLoading = useSelector(selectProductIsLoading);
    const productHasError = useSelector(selectProductHasError);

    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(loadProductList());  
        }, 500);
    }, []);

    if (productIsLoading && productsArray.length===0) {
        return (
            <div id="products-body-container">
                <TextLineLoading lines={1} />
                <div id="products-product-list-container">
                    <ProductListLoading numOfcontainers={4} />
                </div>
            </div>
        )
    }

    return (
        <div id="products-body-container">
            <h2 id="products-headline-container">
                Finest Selections For Delightful Living!
            </h2>
            <div id="products-main-container">
                <div id="products-filters-container">
                    <div id="products-filters-wine-types-container">
                        <h2>Wine Types</h2>
                    </div>

                </div>
            
                <div id="products-product-list-container">
                    {
                        productsArray && productsArray.map((product, index) => (
                            <Product 
                                product={product}
                                index={index}
                                dispatch={dispatch}
                                key={index}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );

};


export default Products;
