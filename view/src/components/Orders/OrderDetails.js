import React from "react";
import { useSelector } from "react-redux";
import { selectOrderByIndex } from "../../features/orderSlice";
import OrderDetailsItems from "./OrderDetailsItems";
import "../../stylesheets/OrderDetails.css";

const OrderDetails = () => {
    const orderArr = useSelector(selectOrderByIndex);

    const orderDataArr = orderArr[0];
    const orderTotalAmount = orderArr[1];

    return (
        <div id="order-details-body-container">
            <div id="order-details-delivery-container">

                <section id="order-details-delivery-status-box">
                    <h4 className="order-details-status-box-content">Order Status: {orderDataArr[0].status}</h4>
                    <h6 className="order-details-status-box-content">Order created on {orderDataArr[0].created}</h6>
                </section>

                <section id="order-details-delivery-info-box">

                    <section id="order-details-delivery-box-title">
                        <h4>Delivery Information:</h4>
                    </section>

                    <section id="order-details-delivery-box-info">
                        <h6 className="order-details-delivery-info-content">Recipient: JJ</h6>
                        <h6 className="order-details-delivery-info-content">Address: King Street, Edinburgh, UK</h6>
                        <h6 className="order-details-delivery-info-content">Tel: +44 7779000111</h6>
                        <h6 className="order-details-delivery-info-content">Post Code: EH00 9YU</h6>
                    </section>

                </section>

            </div>

            <div id="order-details-items-billing-container">

                <section id="order-details-items-conainer">
                    {
                        orderDataArr && orderDataArr.map((obj, index) => (
                            <OrderDetailsItems  
                                key={index}
                                index={index}
                                obj={obj}
                            />
                        ))
                    }
                </section>

                <section id="order-details-billing-box">
                    <section id="order-details-billing-title">
                        <h4>Billing Information: </h4>
                    </section>
                    <section id="order-details-billing-info">
                        <h6>Amount Paid: £{orderTotalAmount}</h6>
                        <h6>Payment Method: Card</h6>
                        <h6>Payment Date: {orderDataArr[0].created}</h6>
                    </section>
                </section>
            </div>
        </div>
    );
};


export default OrderDetails;
