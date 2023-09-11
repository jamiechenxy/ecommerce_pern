import React from "react";
import sampleImg from "../../img/sample.jpg";
import { HiPlusSm, HiMinusSm,  } from 'react-icons/hi';
import { useDispatch } from "react-redux";
import { manageProductIdArr, setToggleEditQuantity } from "../../features/cartSlice";


const CartItems = (props) => {
    const {itemObj, index, onAddItemToCart, onRemoveItemFromCart} = props;
    const dispatch = useDispatch();

    const handleSetToggleEditQuantity = (e) => {
        e.preventDefault();
        dispatch(setToggleEditQuantity(index)); 
        dispatch(manageProductIdArr({index, productId: itemObj.product_id}));
    };


    return (
    <div className="item-box" >
        <img className="sample-img" src={sampleImg} alt="sample-img" />
        <div className="item-info-box">
            <h4 className="item-name">{itemObj.product_name}</h4>
            <h6 className="item-desc">{itemObj.description}</h6>
            <h5 className="price-cube">
                <span>£{itemObj.price}</span>
            </h5>
            {
            itemObj.toggleEditQuantity ? 
            <div className='quantity-cube'>
                <div className="quantity-info">
                    <HiMinusSm className="quan-toggle-icons"
                        onClick={(e) => onRemoveItemFromCart(e, index)}
                    />
                    <h4 className="active-total-quantity">
                        {itemObj.quantity}
                    </h4>
                    <HiPlusSm className="quan-toggle-icons"
                        onClick={(e) => onAddItemToCart(e, itemObj.product_id)} 
                    />
                </div>
                <button className="edit-confirm-button" onClick={(handleSetToggleEditQuantity)}>
                    OK
                </button>
            </div>
            :
            <div className='quantity-cube'>
                <div className="quantity-info">
                    <h4 className="total-quantity">
                        x {itemObj.quantity}
                    </h4>
                </div>
                <button className="edit-button"
                    onClick={(handleSetToggleEditQuantity)}
                >
                    Edit
                </button>
            </div>
            }
        </div>
    </div>
    )
};

export default CartItems;
