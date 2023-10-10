import React, { useState } from "react";
import { setViewDetails } from "../../features/productSlice";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";


const Product = ({ product, index, dispatch }) => {
    const prodcutImg = require(`../../img/wine_img/${product.picture}.png`);
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
            <img className={`product-img${hovered?'-hovered':''}`}
                src={prodcutImg} 
                alt="sample_picture" 
            />

            <div className="product-box">

                <ul className="product-wine-info-cube">
                    <li className="product-wine-info-row">
                        <h4 className="product-wine-info-winery">
                            {product.winery}
                        </h4>
                    </li>
                    <li className="product-wine-info-row">
                        <h4 className="product-wine-info-grapes-vintage">
                            {product.grapes.split(',').length>2?'Blend':product.grapes} {product.vintage}
                        </h4>
                    </li>
                    <li className="product-wine-info-row">
                        <h4 className="product-wine-info-region">
                            <span className={`fi fi-${product.country_code} fis`}></span>
                            {product.region}, {product.country}
                        </h4>
                    </li>
                </ul>

                <ul className="product-rating-price-cube">
                    <li className="product-wine-info-row product-rating-price-row">
                        <h4 className="product-rating">
                            {product.rating.toFixed(1)}
                        </h4>
                        <Rating rating={product.rating} />
                    </li>

                    <li className="product-wine-info-row product-rating-price-row">
                        <button className="product-cart-button "
                            onClick={handleClickPrice}
                        >
                            <h4 className="product-price">
                                £ {product.price.toFixed(2)}
                            </h4>
                        </button>
                    </li>
                </ul>
            </div>
        </Link>
    );
}

export default Product;
