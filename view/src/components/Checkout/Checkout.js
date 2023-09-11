import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    processToPayment, 
    selectCartInfo, 
    selectPickedItems, 
    selectTotalAmount 
} from "../../features/cartSlice";
import sampleImg from "../../img/sample.jpg";
import "../../stylesheets/Checkout.css";
import loadingAnimationMedium from "../../img/animation_loading_medium.gif";


const Checkout = () => {
    const checkoutItems = useSelector(selectCartInfo);
    const totalAmount = useSelector(selectTotalAmount);
    const pickedItemsArr = useSelector(selectPickedItems);
    const dispatch = useDispatch();

    const [proceed, setProceed] = useState(false);
    const handleClickPay = async(e) => {
        e.preventDefault();

        await setProceed(true);

        setTimeout(() => {
            dispatch(processToPayment(pickedItemsArr));
        }, 500);
    }

    return (
    <>
        <div id="checkout-body-container">

            <section id="checkout-delivery-info-box">

                <section id="checkout-delivery-box-title">
                    <h4>Delivery Information:</h4>
                </section>

                <section id="checkout-delivery-box-info">
                    <h5 className="checkout-delivery-info-content">Recipient: JJ</h5>
                    <h5 className="checkout-delivery-info-content">Address: King Street, Edinburgh, UK</h5>
                    <h5 className="checkout-delivery-info-content">Tel: +44 7779000111</h5>
                    <h5 className="checkout-delivery-info-content">Post Code: EH00 9YU</h5>
                </section>

            </section>

            <div id='checkout-main-container'>
                <h4>Items To Checkout:</h4>

                <div id="checkout-items-box">
                    <div className="checkout-item-cube">
                        {
                            checkoutItems && checkoutItems.map((itemObj, index) => (
                                <div key={index} className="item-box">
                                    <img className="sample-img" src={sampleImg} alt="sample-img" />
                                    <div className="item-info-box">
                                        <h4 className="item-name">{itemObj.product_name}</h4>
                                        <h6 className="item-desc">{itemObj.description}</h6>
                                        <div className="checkout-item-price-quantity-cube">
                                            <h4 className="price-cube">
                                                £ {itemObj.price}
                                            </h4>
                                            <h4 className="quantity-cube">
                                                x {itemObj.quantity}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div id="checkout-payment-info-cube">
                        <h3 id="checkout-payment-amount">
                            Total Amount: <br></br>
                            <span>£{totalAmount}</span>
                        </h3>
                        {
                            proceed ? 
                            <button id="active-checkout-payment-button" 
                                type="submit" disabled
                            >
                                <img id="payment-loading-animation" src={loadingAnimationMedium} alt="loading-animation" />
                                <h4 id="payment-loading-text">Processing...</h4>
                            </button>
                            :
                            <button id="checkout-payment-button"
                                type="submit"
                                // using stripe pre-built checkout
                                onClick={(e) => handleClickPay(e)}
                            >
                                PAY NOW
                            </button>
                        }
                    </div>
                </div>
            </div>

        </div>
    </>
    );
}


export default Checkout;
