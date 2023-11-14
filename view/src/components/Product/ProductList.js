import React, { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Product from "./Product";
import { 
    loadProductList, 
    selectProductHasError, 
    selectProductIsLoading, 
} from "../../features/productSlice";
import ProductListLoading from "../../loading/ProductListLoading";

const ProductList = ({ products, condition, dispatch }) => {
    const debounceTimeoutRef = useRef();
    const productIsLoading = useSelector(selectProductIsLoading);
    const productHasError = useSelector(selectProductHasError);

    const debouncedAction = useCallback(() => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            dispatch(loadProductList());
        }, 500);
    }, [condition, dispatch]);

    useEffect(() => {

        debouncedAction();

        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };

    }, [condition, debouncedAction]);

    if (productIsLoading) {
        return (
            <div id="products-product-list-container">
                <ProductListLoading numOfcontainers={6} />
            </div>
        )
    };

    return (
        <div id="products-product-list-container">
            {
                products && products.map((product, index) => (
                    <Product 
                        product={product}
                        index={index}
                        dispatch={dispatch}
                        key={index}
                    />
                ))
            }
        </div>
    );
}

export default ProductList;