import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    loadFilter,
    loadProductList, 
    selectFilter, 
    selectFilterHasError, 
    selectFilterIsLoading, 
    selectProductHasError, 
    selectProductIsLoading, 
    selectProductList, 
} from "../../features/productSlice";
import TextLineLoading from "../../loading/TextLineLoading";
import ProductListLoading from "../../loading/ProductListLoading";
import Product from "./Product";
import "../../stylesheets/Products.css";
import "../../stylesheets/ProductListLoading.css";
import FilterType from "./FilterType";


const Products = () => {
    const products = useSelector(selectProductList);
    const productIsLoading = useSelector(selectProductIsLoading);
    const productHasError = useSelector(selectProductHasError);
    const filter = useSelector(selectFilter);
    const filterIsLoading = useSelector(selectFilterIsLoading);
    const filterHasError = useSelector(selectFilterHasError);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(loadFilter());
            dispatch(loadProductList());  
        }, 500);
    }, []);

    if (productIsLoading && products.length===0) {
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
                    <FilterType wineTypes={filter.wineTypes}/>
                    
                    <div className="products-filters-box" id="filters-price-range-box">
                        <div className="products-filters-box-title">
                            <h3>Price Range</h3>
                            <h6>GBP</h6>
                        </div>
                        <div className="products-filters-box-content">

                        </div>
                    </div>
                    

                </div>
            
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
            </div>
        </div>
    );

};


export default Products;
