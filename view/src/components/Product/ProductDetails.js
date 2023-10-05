import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectProductDetails } from "../../features/productSlice";
import { selectLoginStatus, selectUser } from "../../features/sessionSlice";
import { handleAddItemToCart } from "../../features/cartSlice";
import "../../stylesheets/ProductDetails.css";
import familyWineryImg from '../../img/family-winery.png';
import wine1Img from '../../img/wine1.png';


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


    return (
        <div id="product-details-container">

            <h2 id="product-details-title">{product.name}</h2>
                
            <img id="product-details-sample-img" src={wine1Img} alt="sample-img" />

            <h4 id="product-details-name">{product.name}</h4>

            <h4 id="product-details-description">{product.description}</h4>
            
            <h4 id="product-details-price">${product.price}</h4>
            
            <button id="product-details-price-add-to-cart-button"
                onClick={handleClickAddingToCartButton}
            >
                <h3>Add To Cart</h3>
            </button>
            
        </div>
    )
};



export default ProductDetails;
