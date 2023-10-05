import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    loadProductList, 
    selectProductHasError, 
    selectProductIsLoading, 
    selectProductList, 
    setViewDetails,
} from "../../features/productSlice";
import { Link } from "react-router-dom";
import "../../stylesheets/ProductList.css";
import TextLineLoading from "../../loading/TextLineLoading";
import ProductListLoading from "../../loading/ProductListLoading";
import "../../stylesheets/ProductListLoading.css";
import familyWineryImg from '../../img/family-winery.png';
import wine1Img from '../../img/wine1.png';


const ProductList = () => {
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
            <div id="product-list-body-container">
                <TextLineLoading lines={1} />
                <div id="product-list-main-container">
                    <ProductListLoading numOfcontainers={4} />
                </div>
            </div>
        )
    }

    return (
        <div id="product-list-body-container">
            <h2 id="product-list-headline-container">Finest Selections For Delightful Living!</h2>
            <div id="product-list-main-container">
                {
                    productsArray && productsArray.map((product, index) => (
                        <Link to={`/product/${product.product_id}`} 
                            className="product-list-box" 
                            key={index} 
                            onClick={() => dispatch(setViewDetails(index))}
                        >
                            <img className="product-list-sample-img" src={wine1Img} alt="sample_picture" />
                            <ul className="product-info-cube">
                                <li className="product-info-name">
                                    <h4 className="product-info-text">{product.name}</h4>
                                </li>
                                <li className="product-info-price">
                                    <h5 className="product-info-text">${product.price}</h5>
                                </li>
                            </ul>
                        </Link>
                    ))
                }
            </div>
        </div>
    );

};


export default ProductList;
