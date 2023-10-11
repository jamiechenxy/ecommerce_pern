import React, { useState } from "react";
import { setViewDetails } from "../../features/productSlice";
import { Link } from "react-router-dom";
import WineImg from "../Card/WineImg";
import WineInfo from "../Card/WineInfo";
import WineRatingPrice from "../Card/WineRatingPrice";


const Product = ({ product, index, dispatch }) => {
    const [hovered, setHovered] = useState(false);

    const handleClickPrice = (event) => {
        event.stopPropagation();
        console.log('stop redirection.')
    };

    return (
        <Link to={`/product/${product.product_id}`} 
            className="product-container"
            key={index} 
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => dispatch(setViewDetails(index))}
        >
            <WineImg hovered={hovered} picture={product.picture} />
            <div className="product-box">
                <WineInfo 
                    winery={product.winery}
                    grapes={product.grapes}
                    vintage={product.vintage}
                    country_code={product.country_code}
                    region={product.region}
                    country={product.country}
                />
                <WineRatingPrice 
                    rating={product.rating}
                    price={product.price}
                    handleClickPrice={handleClickPrice}
                />
            </div>
        </Link>
    );
}

export default Product;
