import React from "react";
import Rating from "../Rating/Rating";


const WineRatingPrice = ({ rating, price, handleClickPrice }) => {
    return(
        <ul className="product-rating-price-cube">
            <li className="wine-info-row product-rating-price-row">
                <h4 className="wine-rating">
                    {rating.toFixed(1)}
                </h4>
                <Rating rating={rating} />
            </li>

            <li className="wine-info-row product-rating-price-row">
                <button className="product-cart-button "
                    onClick={handleClickPrice}
                >
                    <h4 className="wine-price">
                        £ {price.toFixed(2)}
                    </h4>
                </button>
            </li>
        </ul>
    );
}

export default WineRatingPrice;
