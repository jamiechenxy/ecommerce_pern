import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectProductDetails } from "../../features/productSlice";
import { selectLoginStatus, selectUser } from "../../features/sessionSlice";
import { handleAddItemToCart } from "../../features/cartSlice";
import "../../stylesheets/ProductDetails.css";
import WineStarRating from "../Card/WineStarRating";
import { CiBookmarkPlus, CiBookmarkMinus, CiDeliveryTruck } from "react-icons/ci";
import { HiPlusSm, HiMinusSm, HiOutlineInformationCircle } from 'react-icons/hi';
import { PiCastleTurretLight } from 'react-icons/pi';
import { GiGrapes, GiWineBottle } from 'react-icons/gi';
import { SlLocationPin } from "react-icons/sl";
import { estimateArrival } from "../../utils/estimateArrival";
import { RiWaterPercentLine } from 'react-icons/ri';
import TastingFeature from "../Card/TastingFeature";
import AromaCube from "../Card/AromaCube";


const ProductDetails = () => {
    const loginStatus = useSelector(selectLoginStatus);
    const product = useSelector(selectProductDetails);
    const navigate = useNavigate();
    const [ num, setNum ] = useState(1);
    const eta = estimateArrival(2);
    // const aromaArr = product.aroma.split(',');

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

                        {
                            product.type==='Red' 
                            ? 
                            <div className="tasting-feature-cube">
                                <h5>Tannin</h5>
                                <div className="tasting-feature">
                                    <h6>Low</h6>
                                    <TastingFeature taste={product.tannin} />
                                    <h6>High</h6>
                                </div>
                            </div>
                            :
                            ''
                        }


                        <div className="tasting-feature-cube">
                            <h5>Acidity</h5>
                            <div className="tasting-feature">
                                <h6>Low</h6>
                                <TastingFeature taste={product.acidity} />
                                <h6>High</h6>
                            </div>
                        </div>

                        <div className="tasting-feature-cube details-aroma-container">
                            <h5>Aroma</h5>
                            <div id="details-aroma-box">
                            {
                                product.aroma && product.aroma.map((aromaElement, index) => (
                                    <AromaCube 
                                        aromaElement={aromaElement}
                                        index={index}
                                        key={index}
                                    />
                                ))
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="product-details-3rd-container">
                <div id="details-facts-container">
                    <h2>Facts about the wine</h2>
                    <div id="facts-info-box">
                        <div className="facts-info-row">
                            <div className="facts-info-row-title">
                                <PiCastleTurretLight className="facts-info-icon"/>
                                <h6>Winery</h6>
                            </div>
                            <p className="facts-info-row-content">{product.winery}</p>
                        </div>

                        <div className="facts-info-row">
                            <div className="facts-info-row-title">
                                <GiGrapes className="facts-info-icon"/>
                                <h6>Grapes</h6>
                            </div>
                            <p className="facts-info-row-content">{product.grapes.join(', ')}</p>
                        </div>

                        <div className="facts-info-row">
                            <div className="facts-info-row-title">
                                <SlLocationPin className="facts-info-icon"/>
                                <h6>Region</h6>
                            </div>
                            <p className="facts-info-row-content">{product.country}, {product.region}</p>
                        </div>

                        <div className="facts-info-row">
                            <div className="facts-info-row-title">
                                <GiWineBottle className="facts-info-icon"/>
                                <h6>Wine style</h6>
                            </div>
                            <p className="facts-info-row-content">{product.type} wine</p>
                        </div>

                        <div className="facts-info-row">
                            <div className="facts-info-row-title">
                                <HiOutlineInformationCircle className="facts-info-icon"/>
                                <h6>Allergens</h6>
                            </div>
                            <p className="facts-info-row-content">Contains sulfites</p>
                        </div>

                        <div className="facts-info-row">
                            <div className="facts-info-row-title">
                                <RiWaterPercentLine className="facts-info-icon"/>
                                <h6>Alcohol by volumn</h6>
                            </div>
                            <p className="facts-info-row-content">{product.alcohol}%</p>
                        </div>
                    </div>
                </div>
            </div>      
        </div>
    )
};



export default ProductDetails;
