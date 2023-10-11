import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectProductDetails } from "../../features/productSlice";
import { selectLoginStatus, selectUser } from "../../features/sessionSlice";
import { handleAddItemToCart } from "../../features/cartSlice";
import "../../stylesheets/ProductDetails.css";
import WineStarRating from "../Card/WineStarRating";


const ProductDetails = () => {
    const loginStatus = useSelector(selectLoginStatus);
    const product = useSelector(selectProductDetails);
    const navigate = useNavigate();

    const handleClickAddingToCartButton = () => {
        if (loginStatus) {
            onAddItemToCart();
        } else {
            redirectToLogin();
        }
    };

    const onAddItemToCart = () => {
        handleAddItemToCart(product.product_id);
    };

    const redirectToLogin = () => {
        const redirectionElement = document.createElement('div');
        redirectionElement.innerHTML = "Not sign in yet. Redirecting to login page.";
        redirectionElement.className = "redirect-message";

        // select the element of add item button
        const addItemButton = document.getElementById('product-details-price-add-to-cart-button');

        addItemButton.insertAdjacentElement('afterend', redirectionElement);

        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    // const displayGrapes = () => {
    //     const { grapes } = product;
    //     const grapesArr = 
    // };


    return (
        <div id="product-details-main-container">

            <div id="product-details-1st-container">
                <img className={`details-wine-img`}
                    src={`/wineImg/${product.picture}.png`}
                    alt={`${product.picture} sample picture`} 
                />

                <ul className="details-wine-info-cube">
                    <li className="wine-info-row details-wine-info-row">
                        <h4 className="wine-info-winery">
                            {product.winery}
                        </h4>
                    </li>
                    <li className="wine-info-row details-wine-info-row">
                        <h4 className="wine-info-grapes-vintage">
                            {product.grapes.length>2?'Blend':product.grapes.join(', ')} {product.vintage}
                        </h4>
                    </li>
                    <li className="wine-info-row details-wine-info-row">
                        <h4 className="wine-info-region">
                            {product.country} · {product.region} · {product.winery} · {`${product.type} Wine`} · {product.grapes.length>2?'Blend':product.grapes.join(' · ')}
                        </h4>
                    </li>

                    <li className="wine-info-row details-rating-row">
                        <WineStarRating rating={product.rating} />
                    </li>
                </ul>
                
                <ul className="details-function-cube">

                </ul>


            </div>


            <div id="product-details-2nd-container">

            </div>


            <div id="product-details-3rd-container">

            </div>      


            
            <button id="product-details-price-add-to-cart-button"
                onClick={handleClickAddingToCartButton}
            >
                <h3>Add To Cart</h3>
            </button>
            
        </div>
    )
};



export default ProductDetails;
