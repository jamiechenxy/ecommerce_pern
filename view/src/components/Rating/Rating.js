import React from "react";
import Star from "./Star";

const Rating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const partialFill = (rating - fullStars) * 100;

    return (
        <div className="product-star-rating">
            {
                [...Array(5)].map((_, index) => {
                    if (index < fullStars) {
                        return <Star fill={100} index={index} key={index}/>
                    } else if (index===fullStars) {
                        return <Star fill={partialFill} index={index} key={index}/>
                    } else {
                        return <Star fill={0} index={index} key={index}/>
                    }
                })
            }
        </div>
    );
}

export default Rating;
