import '../../stylesheets/Cart.css';
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserInfoContext } from '../../app/Context';
import { 
    handleAddItemToCart, 
    handleRemoveItemFromCart, 
    loadCart, 
    selectCartInfo,
    removefromProductIdArr,
    selectTotalAmount,
    selectCartIsLoading,
    selectCartHasError,
    selectOnPaymentProcess,
    selectIsLoadingOnPaymentProcess,
    processCarStatus,
} from "../../features/cartSlice";
import { selectSessionIsLoading } from "../../features/sessionSlice";
import CartItems from "./CartItems";
import { Link, useNavigate } from "react-router-dom";
import ItemListLoading from '../../loading/ItemListLoading';
import PaymentInfoLoading from '../../loading/PaymentInfoLoading';
import TitleLoading from '../../loading/TitleLoading';
import "../../stylesheets/TitleLoading.css";
import loadingAnimation from "../../img/loading_small.gif";


const Cart = () => {
    const userInfo = useContext(UserInfoContext);
    const cartInfoArr = useSelector(selectCartInfo);
    const cartIsLoading = useSelector(selectCartIsLoading);
    const cartHasError = useSelector(selectCartHasError);
    const onPaymentProcess = useSelector(selectOnPaymentProcess);
    const isLoadingOnPaymentProcess = useSelector(selectIsLoadingOnPaymentProcess);
    const totalAmount = useSelector(selectTotalAmount);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionIsLoading = useSelector(selectSessionIsLoading);

    // when cart component loads, always check cart status firstly
    useEffect(() => {
            if (!sessionIsLoading) {
                dispatch(processCarStatus());
            }
    }, []);

    // after above procedure, loading cart info
    useEffect(() => {
        // when onPaymentProcess is neither default nor true and isLoadingOnPaymentProcess is false
        // then load cart
        if (onPaymentProcess!=='none' && !onPaymentProcess && !isLoadingOnPaymentProcess) {
            setTimeout(() => {
                dispatch(loadCart());
            }, 1000);
        }
    }, [onPaymentProcess]);

    const onAddItemToCart = async (e, productId) => {
        e.preventDefault();

        await handleAddItemToCart(productId);
        dispatch(loadCart());
    };

    const onRemoveItemFromCart = async (e, index) => {
        e.preventDefault();

        const itemIdArray = cartInfoArr[index].cart_item_id_arr;

        const itemId = Number(itemIdArray[0]);

        if (itemIdArray.length===1) {
            await handleRemoveItemFromCart(itemId);
            dispatch(removefromProductIdArr(cartInfoArr[index].product_id));
        } else {
            await handleRemoveItemFromCart(itemId);
        }

        dispatch(loadCart());
    };

    const [proceed, setProceed] = useState(false);
    const handleClickCheckout = async (e) => {
        e.preventDefault();

        await setProceed(true);

        setTimeout(() => {
            navigate('/checkout');
        }, 1500);
        
    };

    if (cartIsLoading && cartInfoArr.length===0) {
        return (
            <div id="body-container">
                <h2 id="user-loading-box">
                    <TitleLoading />
                </h2>
                <div id='main-container'>
                    <div id='list-container'>
                        <ItemListLoading numOfcontainers={4} />
                    </div>
                    <div id="checkout-info-container">
                        <PaymentInfoLoading />
                    </div>
                </div>
            </div>
        );
      };
    
      if (cartHasError) {
        return <div>Whoops...Somthing went wrong...</div>;
      };


    return (
        <div id="body-container">
            <h2 id="user-box">
                {userInfo && `${userInfo.firstName}'s Cart:` }
            </h2>
            <div id='main-container'>
                <div id='list-container'>
                    {
                    cartInfoArr.length===0 && !cartIsLoading ?
                        <h3>Your Cart is Empty now</h3>
                    :
                        cartInfoArr && cartInfoArr.map((itemObj, index) => (
                            <CartItems 
                                key={index}
                                itemObj={itemObj} 
                                index={index}
                                onAddItemToCart={onAddItemToCart}
                                onRemoveItemFromCart={onRemoveItemFromCart}
                            />
                        ))
                    }
                </div>
                <div id='checkout-info-container'>
                    {
                    cartInfoArr.length===0 && !cartIsLoading ?
                        <Link to='/product'>Go to see what you might like</Link>
                    :
                        <div id="checkout-info-box">
                            <h1 id="total-amount">
                                <span>Total: </span><span>£{totalAmount}</span>
                            </h1>
                            {
                                    proceed?
                                    <div id='cart-process-box'>
                                        <img id='cart-loading-animation' src={loadingAnimation} alt='loading-animation' />
                                    </div>
                                :
                                    <button id="checkout-button"
                                        onClick={handleClickCheckout}
                                    >
                                        Proceed To Checkout
                                    </button>
                            }

                        </div>
                    }
                </div>
            </div>
        </div>
    )
};


export default Cart;
