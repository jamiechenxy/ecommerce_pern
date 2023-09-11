import React, { useContext, useEffect } from "react";
import Order from "./Order";
import { useDispatch, useSelector } from "react-redux";
import { 
    loadOrdersList, 
    selectOrdersHasError, 
    selectOrdersIsLoading, 
    selectOrdersList 
} from "../../features/orderSlice";
import { 
    selectSessionIsLoading, 
} from "../../features/sessionSlice";
import { Link } from "react-router-dom";
import "../../stylesheets/Orders.css";
import { UserInfoContext } from '../../app/Context';
import TitleLoading from "../../loading/TitleLoading";
import OrderItemsLoading from "../../loading/OrderItemsLoading";
import "../../stylesheets/OrderItemsLoading.css";


const Orders = () => {
    const userInfo = useContext(UserInfoContext);
    const sessionIsLoading = useSelector(selectSessionIsLoading);
    const ordersArr = useSelector(selectOrdersList); 
    const dispatch = useDispatch();
    const ordersIsLoading = useSelector(selectOrdersIsLoading);
    const ordersHasError = useSelector(selectOrdersHasError);

    useEffect(() => {
        if (!sessionIsLoading) {
            setTimeout(() => {
                dispatch(loadOrdersList());
            }, 1000);
        }
    }, [dispatch]);

    if (ordersIsLoading && ordersArr.length===0) {
        return (
            <div id="orders-body-container">
                <div id="orders-main-container">
                    <TitleLoading />
                </div>
                <div id="orders-list-loading-container">
                    <OrderItemsLoading numOfcontainers={4} />
                </div>
            </div>
        );
    }

    return (
        <div id="orders-body-container">
        {
        ordersArr.length===0 && !ordersIsLoading ? 
            <div id="orders-main-container">
                <h5>You have not placed any orders yet.</h5>
                <Link to="/product">Shop Now</Link>
            </div>
        :
            <div id="orders-main-container">
                <h4 id="orders-user-box">
                    <span id="orders-user-box-name">{userInfo && userInfo.firstName}'s</span> Orders: 
                </h4>
                <div id="orders-list-container">
                    {
                        ordersArr && ordersArr.map((orderObj, index) => (
                            <Order
                                key={index}
                                orderObj={orderObj} 
                                indexOfOrders={index}
                            />
                        ))
                    }
                </div>
            </div>
        }

        </div>
    );
};


export default Orders;