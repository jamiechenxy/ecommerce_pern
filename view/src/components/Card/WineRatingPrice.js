import React from "react";
import WineStarRating from "./WineStarRating";
import "../../stylesheets/WineRatingPrice.css";

const WineRatingPrice = ({ rating, price, handleClickPrice }) => {
    return(
        <div className="product-rating-price-card">
            <WineStarRating rating={rating} />

            <div className="product-rating-price-row">
                <button className="product-cart-button "
                    onClick={handleClickPrice}
                >
                    <h4 className="wine-price">
                        £ {price.toFixed(2)}
                    </h4>
                </button>
            </div>
        </div>
    );
}

export default WineRatingPrice;
