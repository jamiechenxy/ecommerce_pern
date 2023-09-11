import React from "react";
import sampleImg from "../../img/sample.jpg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDetailsByIndex } from "../../features/orderSlice";


const OrderItemsList = (props) => {
    const { itemObj, indexOfOrder, indexOfOrders } = props;
    const dispatch = useDispatch();

    return (
        <Link className="orders-order-item"
            to={`/orders/${itemObj.order_id}`} 
            onClick={() => dispatch(setDetailsByIndex(indexOfOrders))}
        >
            <h6 className="orders-order-item-quantity">{itemObj.quantity}</h6>
            <img className="orders-order-item-sample-img" src={sampleImg} alt="sample-img" />
            <h6 className="orders-order-item-name">{itemObj.product_name}</h6>
        </Link>
    )
};


export default OrderItemsList;