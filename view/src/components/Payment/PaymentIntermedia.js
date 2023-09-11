import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    getPaymentStatus, 
    processForSuccess, 
    selectCartHasError, 
    selectCartIsLoading, 
    selectPaymentStatus, 
    selectProcessOrderHasError, 
    selectProcessOrderIsLoading,
    selectProcessOrderResult
} from "../../features/cartSlice";
import { useNavigate } from "react-router-dom";
import loadingAnimationMedium from "../../img/animation_loading_medium.gif";
import "../../stylesheets/PaymentIntermedia.css";


const PaymentIntermedia = () => {
    const [message, setMessage] = useState("");
    const [countdown, setCountdown] = useState(4);

    const paymentStatus = useSelector(selectPaymentStatus);
    const cartIsLoading = useSelector(selectCartIsLoading);
    const cartHasError = useSelector(selectCartHasError);
    const processOrderIsLoading = useSelector(selectProcessOrderIsLoading);
    const processOrderHasError = useSelector(selectProcessOrderHasError);
    const processOrderStatus = useSelector(selectProcessOrderResult);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // At initial state, start polling to confirm status by 4s interval
    // if successful payment confirmed, starting order placing process
    // if not (canceled for now), delete stripe session right away
    useEffect(() => {
        if (paymentStatus!=='paid') {

            const intervalPolling = setInterval(() => {
                    dispatch(getPaymentStatus());
            }, 4000);
            
            return () => clearInterval(intervalPolling); 

        } else if (paymentStatus==='paid') {
            // if payment succeeds, update the order_info table in db....
            // delete the associated record in stripe_session table
            dispatch(processForSuccess());

        } else {
            return;
        }

    }, [paymentStatus]);

    useEffect(() => {
        if (processOrderStatus) {
            setMessage("Order placed! You will receive an email confirmation.");
        } else {
            return;
        }
    }, [processOrderStatus]);

    useEffect(() => {
        if (processOrderStatus!=='none') {
            const countdownToRedirect = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);

            return () => clearInterval(countdownToRedirect);
        }
    }, [processOrderStatus]);


    if (cartIsLoading || paymentStatus==='none') {
        return (
            <div id="payment-intermedia-body">
                <img id="payment-intermedia-loading-animation" src={loadingAnimationMedium} 
                    alt="payment-intermedia-loading-animation" 
                />
                <h2 id="payment-loading-text">
                    Please wait, we are confirming payment...
                </h2>
            </div>
        )
    }

    if (paymentStatus==='paid' && processOrderIsLoading) {
        return (
            <div id="payment-intermedia-body">
                <img id="payment-intermedia-loading-animation" src={loadingAnimationMedium} 
                    alt="payment-intermedia-loading-animation" 
                />
                <h2 id="payment-loading-text">
                    Payment is successful! Your order is proccessing...
                </h2>
            </div>
        )
    }

    if (cartHasError || processOrderHasError) {
        return (
            <div id="payment-intermedia-body">
                Whoops...Something went wrong...
            </div>
        )
    }

    const handleRedirection = () => {
        setTimeout(() => {
            if (processOrderStatus) {
                return navigate('/orders');
            } else {
                return navigate('/cart');
            }
        }, 4000);
    };


    return (
        <div id="payment-intermedia-body-success">
            <h2>{ message }</h2>
            <h3>
                Redirecting to your order page in <span id="redirection-countdown">{countdown}</span> seconds...
            </h3>
            { handleRedirection() }
        </div>
    );
};

export default PaymentIntermedia;
