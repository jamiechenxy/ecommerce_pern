import React from "react";
import sampleImg from "../../img/sample.jpg";


const OrderDetailsItems = (props) => {
    const { obj, index } = props;

    return (
        <div className="order-details-item-box">
            <img className="order-details-sample-img" src={sampleImg} alt="sample-img" />
                <h5 className="order-details-product-name">{obj.product_name}</h5>
                <h6 className="order-details-description">{obj.description}</h6>
                <h6 className="order-details-price">£ {obj.price}</h6>
                <h6 className="order-details-quantity">x {obj.quantity}</h6>
        </div>  
    )
};


export default OrderDetailsItems;