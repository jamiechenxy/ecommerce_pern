import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectProductDetails } from "../../features/productSlice";
import { selectLoginStatus, selectUser } from "../../features/sessionSlice";
import { handleAddItemToCart } from "../../features/cartSlice";
import "../../stylesheets/ProductDetails.css";
import WineStarRating from "../Card/WineStarRating";
import { CiBookmarkPlus, CiBookmarkMinus, CiDeliveryTruck } from "react-icons/ci";
import { HiPlusSm, HiMinusSm, } from 'react-icons/hi';
import { estimateArrival } from "../../utils/estimateArrival";
import TastingFeature from "../Card/TastingFeature";


const ProductDetails = () => {
    const loginStatus = useSelector(selectLoginStatus);
    const product = useSelector(selectProductDetails);
    const navigate = useNavigate();
    const [ num, setNum ] = useState(1);
    const eta = estimateArrival(2);

    const increment = () => { setNum(preNum => preNum + 1) };
    const decrement = () => {setNum(preNum => preNum===1 ? 1 : preNum - 1)};

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
        <div id="product-details-main-container">

            <div id="product-details-1st-container">
                <img id="details-wine-img"
                    src={`/wineImg/${product.picture}.png`}
                    alt={`${product.picture} sample picture`} 
                />

                <div id="details-wine-info-cube">
                    <div className="wine-info-row details-wine-info-row">
                        <h4 className="wine-info-winery">
                            {product.winery}
                        </h4>
                    </div>
                    <div className="wine-info-row details-wine-info-row">
                        <h4 className="wine-info-grapes-vintage">
                            {product.grapes.length>2?'Blend':product.grapes.join(', ')} {product.vintage}
                        </h4>
                    </div>
                    <div className="wine-info-row details-wine-info-row">
                        <h4 className="wine-info-region">
                            {product.country} · {product.region} · {product.winery} · {`${product.type} Wine`} · {product.grapes.length>2?'Blend':product.grapes.join(' · ')}
                        </h4>
                    </div>

                    <div className="details-rating-row">
                    <div id="details-rating-cube">
                            <WineStarRating rating={product.rating} />
                        </div>
                    </div>
                    <div id="details-wishlist">
                        <CiBookmarkPlus id="add-to-wishlist-icon"/>
                        <h4 id="details-wishlist-text">
                            Add to Wishlist
                        </h4>
                    </div>
                </div>
                
                <div id="details-function-cube">
                    <div id="details-price-row">
                        <h2>£ {product.price.toFixed(2)}</h2>
                        <h6> The price is per bottle</h6>
                    </div>
                    
                    <div id="details-add-to-cart-row">
                        <div id="details-quantity-info">
                            <HiMinusSm className="details-modify-quan-icon"
                                onClick={decrement}
                            />
                            <h4 id="details-quantity">
                                {num}
                            </h4>
                            <HiPlusSm className="details-modify-quan-icon"
                                onClick={increment} 
                            />
                        </div>
                        <button id="details-add-to-cart-button"
                            onClick={handleClickAddingToCartButton}
                        >
                            <h3>Add to Cart</h3>
                        </button>
                    </div>

                    <div id="etd-row">
                        <CiDeliveryTruck id="delivery-icon"/>
                        <p>Estimated date of reception from {eta[0][0]}, {eta[0][1]} {eta[0][2]} to {eta[1][0]}, {eta[1][1]} {eta[1][2]}.</p>
                    </div>
                </div>
            </div>

            <div id="product-details-2nd-container">
                <div id="details-tasting-container">
                    <h2>Tasting of the wine</h2>

                    <div id="tasting-feature-box">

                        <div className="tasting-feature-cube">
                            <h5>Body</h5>
                            <div className="tasting-feature">
                                <h6>Light</h6>
                                <TastingFeature taste={product.body} />
                                <h6>Full</h6>
                            </div>
                        </div>

                        <div className="tasting-feature-cube">
                            <h5>Sweetness</h5>
                            <div className="tasting-feature">
                                <h6>Dry</h6>
                                <TastingFeature taste={product.sweetness} />
                                <h6>Luscious</h6>
                            </div>
                        </div>

                        <div className="tasting-feature-cube">
                            <h5>Tannin</h5>
                            <div className="tasting-feature">
                                <h6>Low</h6>
                                <TastingFeature taste={product.tannin} />
                                <h6>High</h6>
                            </div>
                        </div>


                        <div className="tasting-feature-cube">
                            <h5>Acidity</h5>
                            <div className="tasting-feature">
                                <h6>Low</h6>
                                <TastingFeature taste={product.acidity} />
                                <h6>High</h6>
                            </div>
                        </div>

                    </div>
                </div>

                <div id="details-aroma-container">
                    

                </div>


            </div>


            <div id="product-details-3rd-container">

            </div>      
            
        </div>
    )
};



export default ProductDetails;
