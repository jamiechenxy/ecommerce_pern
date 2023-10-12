import React from "react";
import Rating from "../Rating/Rating";

const WineStarRating = ({ rating }) => {
    return (
        <div className="product-rating-price-row">
            <h4 className="wine-rating">
                {rating.toFixed(1)}
            </h4>
            <Rating rating={rating} />
        </div>
    );
}

export default WineStarRating;
