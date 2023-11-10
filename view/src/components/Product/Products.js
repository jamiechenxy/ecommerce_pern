import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    selectCondition, 
    selectFilter, 
    selectProductList, 
} from "../../features/productSlice";
import "../../stylesheets/Products.css";
import "../../stylesheets/ProductListLoading.css";
import ProductList from "./ProductList";
import FilterList from "./FilterList";
import ProductHeadline from "./ProductHeadline";


const Products = () => {
    const filter = useSelector(selectFilter);
    const products = useSelector(selectProductList);
    const condition = useSelector(selectCondition);
    const dispatch = useDispatch();

    return (
        <div id="products-body-container">
                <ProductHeadline 
                    numOfSelections={products.length} 
                    condition={condition}
                    filterType={filter.type}
                    dispatch={dispatch}
                />
            <div id="products-main-container">
                <FilterList 
                    filter={filter}
                    dispatch={dispatch} 
                />
                <ProductList 
                    products={products}
                    condition={condition} 
                    dispatch={dispatch} 
                />
            </div>
        </div>
    );

};


export default Products;
