import React from "react";
import Rating from "../Rating/Rating";

const WineStarRating = ({ rating }) => {
    return (
        <ul className="product-rating-price-cube">
            <li className="wine-info-row product-rating-price-row">
                <h4 className="wine-rating">
                    {rating.toFixed(1)}
                </h4>
                <Rating rating={rating} />
            </li>
        </ul>
    );
}

export default WineStarRating;
