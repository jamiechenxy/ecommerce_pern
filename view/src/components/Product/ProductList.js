import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Product from "./Product";
import { 
    loadProductList, 
    selectProductHasError, 
    selectProductIsLoading, 
} from "../../features/productSlice";
import ProductListLoading from "../../loading/ProductListLoading";

const ProductList = ({ products, condition, dispatch }) => {
    const productIsLoading = useSelector(selectProductIsLoading);
    const productHasError = useSelector(selectProductHasError);

    useEffect(() => {
        setTimeout(() => {
            dispatch(loadProductList());  
        }, 500);
    }, [condition, dispatch]);

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