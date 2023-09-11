import React from "react";
import OrderItemsList from "./OrderItemsList";


const Order = (props) => {
    const { indexOfOrders, orderObj } = props;
    const orderInfoArr = Object.values(orderObj)[0];

    return (
        <div className="orders-list-box" >
            <div className="order-list-cube">
                {
                    orderInfoArr && orderInfoArr.map((itemObj, index) => (
                        <OrderItemsList  
                            key={index}
                            itemObj={itemObj}
                            indexOfOrder={index}
                            indexOfOrders={indexOfOrders}
                        />
                    ))
                }
            </div>
            <div className="orders-order-info">
                <h4 className="orders-order-info-amount">Total: £{orderObj.orderTotalAmount}</h4>
                <h5 className="orders-order-info-status">{orderInfoArr[0].status}</h5>
            </div>
        </div>
    )
};


export default Order;





