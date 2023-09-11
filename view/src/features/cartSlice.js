import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { 
    addItemToCart, 
    clearCartAndCartItem, 
    getCartInfo, 
    getCartInfoToDisplay, 
    handleCartStatusProcess, 
    subtractCartItemQuantity,
    updateCartPaymentProcess, 
} from "../utils/cart";
import { 
    handleCheckout, 
} from "../utils/checkout";
import { getPaymentInfo, removePaymentInfo } from "../utils/stripe";
import { createNewOrderItem, createOrderStripe } from "../utils/orders";

export const loadCart = createAsyncThunk(
    "cart/loadCart",
    async (dummy, { getState }) => {
        const response = await getCartInfoToDisplay();

        if (response.length===0) { return response; };

        const productIdArr = getState().cart.underEditingProductIdArr;

        // if no item in cart is under editing returns response directly.
        if (productIdArr.length===0) { return response; }
        
        // iterate obj in response match contained productId with the productId in the array.
        // then set toggleEditQuantity of matched obj to true.
        response.map((obj) => {
            if (productIdArr.includes(obj.product_id)) {
                obj.toggleEditQuantity = true;
            } 
        });

        return response;
    }
);

export const processToPayment = createAsyncThunk(
    "cart/processToPayment",
    async(productIdArr, { getState }) => {

        const { firstName } = getState().session.session.user;
        const cartInfoArr = getState().cart.cart;

        // update payment_process in the cart table
        // indicating the cart is about to checkout and under payment process
        const updatedPaymentProcess = await updateCartPaymentProcess(true);

        // form needed data as an array to pass into function
        const dataObj = {
            productIdArr, cartInfoArr, firstName
        };
        const response = await handleCheckout(dataObj);

        window.location.href = response.url;

    }
);

// used to verify and get payment status after stripe webhooks
export const getPaymentStatus = createAsyncThunk(
    "cart/getPaymentStatus",
    async(dummy ,{ rejectWithValue, getState }) => {

        const { status } = await getPaymentInfo();

        return status;

    }
);

export const processForSuccess = createAsyncThunk(
    "cart/processForSuccess",
    async(dummy, { rejectWithValue }) => {
        // get ssId
        const { ssId } = await getPaymentInfo();
        // use ssId as param to create a new order
        const newOrderByStripe = await createOrderStripe(ssId);

        // extract orderId from new order object
        const orderId = newOrderByStripe[0].order_id;

        // create new record in order_item table by extracted orderId
        const newOrderItem = await createNewOrderItem(orderId);
        
        // becuz of constraints. 
        // 1, delete cart item. 2, delete cart info        
        // 3, delete record from stripe_session. 
        // All below response of deletion is expected to be 204. no deleted record expected.

        // use cartId to delete associated records in cart_info and cart_item
        const cartInfo = await getCartInfo();
        const removeCartRes = await clearCartAndCartItem(cartInfo[0].cart_id);
        
        // use ssId to remove associated record from stripe_session
        const removePaymentRecordRes = await removePaymentInfo(ssId);

        return true;

    }
);

// handle on backend (to check failure of payment process)
export const processCarStatus = createAsyncThunk(
    "cart/processCarStatus",
    async(dummy, { rejectWithValue }) => {
        // here to handle all process on backend.
        const cartStautsRes = await handleCartStatusProcess();
        
        const { cartStatus } = cartStautsRes;
        if (cartStatus) {
            return rejectWithValue('Unexpected cartStatus to be true.');
        }

        return cartStatus;
    }
);


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
        isLoading: true,
        hasError: false,
        underEditingProductIdArr: [],
        checkout: {
            totalAmount: 0.00,
            pickedItems: [],
            success: 'none', // none is initial state, payload: a string, either paid or unpaid.
            onPaymentProcess: 'none', // none is initial state, payload: t or f.
            isLoadingOnPaymentProcess: true,
            hasErrorOnPaymentProcess: false,
            // 

        },
        processCancel: {
            hasUnfinishedPaymentAttempt: true, // boolen value indicating payment record already removed or not
            finish: false, // none is initial state, payload: a string, either paid or unpaid.
        },
        processOrder: {
            isProcessingOrder: false,
            hasErrorOnProcessingOrder: false,
            success: 'none', // none is initial state, payload: t or f.
        },
    },
    reducers: {
        setToggleEditQuantity: (state, action) => {
            state.cart[action.payload].toggleEditQuantity = !state.cart[action.payload].toggleEditQuantity;
        },
        manageProductIdArr: (state, action) => {
            const { index, productId } = action.payload;
            // if user is editing quantity, push the productId to array
            if (state.cart[index].toggleEditQuantity) {
                state.underEditingProductIdArr.push(productId);
            } else {
                state.underEditingProductIdArr = state.underEditingProductIdArr.filter(id=>id!==productId);
            }
        },
        removefromProductIdArr: (state, action) => {
            state.underEditingProductIdArr = state.underEditingProductIdArr.filter(id=>id!==action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadCart.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(loadCart.fulfilled, (state, action) => {
            const cartInfoArr = action.payload;
            state.cart = cartInfoArr;
            state.isLoading = false; 
            state.hasError = false;
            
            // if returned cartInfo array is not empty, then continue update state
            // otherwise skip the process.
            if (cartInfoArr.length!==0) {
                let totalAmount = 0;
                let pickedItemsArr = [];
                cartInfoArr.forEach((obj) => {
                    totalAmount = obj.price * obj.quantity + totalAmount;
                    pickedItemsArr.push(obj.product_id);
                });
                state.checkout.totalAmount = parseFloat(totalAmount).toFixed(2);
                state.checkout.pickedItems = pickedItemsArr;
            }
        })
        .addCase(loadCart.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        })
        .addCase(processToPayment.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(processToPayment.fulfilled, (state) => {
            state.isLoading = false;
            state.hasError = false;
        })
        .addCase(processToPayment.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        })
        .addCase(getPaymentStatus.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(getPaymentStatus.fulfilled, (state, action) => {
            state.checkout.success = action.payload;
            state.isLoading = false;
            state.hasError = false;
        })
        .addCase(getPaymentStatus.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        })
        .addCase(processForSuccess.pending, (state) => {
            state.processOrder.isProcessingOrder = true;
            state.processOrder.hasErrorOnProcessingOrder = false;
        })
        .addCase(processForSuccess.fulfilled, (state, action) => {
            // return t or f indicating completion status of order process
            state.processOrder.success = action.payload;
            state.processOrder.isProcessingOrder = false;
            state.processOrder.hasErrorOnProcessingOrder = false;
        })
        .addCase(processForSuccess.rejected, (state) => {
            state.processOrder.isProcessingOrder = false;
            state.processOrder.hasErrorOnProcessingOrder = true;
        })
        .addCase(processCarStatus.pending, (state) => {
            state.checkout.isLoadingOnPaymentProcess = true;
            state.checkout.hasErrorOnPaymentProcess = false;
        })
        .addCase(processCarStatus.fulfilled, (state, action) => {
            state.checkout.isLoadingOnPaymentProcess = false;
            state.checkout.hasErrorOnPaymentProcess = false;
            // expected return payload to be false.
            state.checkout.onPaymentProcess = action.payload;
        })
        .addCase(processCarStatus.rejected, (state) => {
            state.checkout.isLoadingOnPaymentProcess = false;
            state.checkout.hasErrorOnPaymentProcess = true;
        })
    }
});

// add an item to cart
export const handleAddItemToCart = async (productId) => {
    const response = await addItemToCart(productId);
};

// remove an item from cart
export const handleRemoveItemFromCart = async (itemId) => {
    const response = await subtractCartItemQuantity(itemId);
};


export const selectCartInfo = state => state.cart.cart;

export const selectUnderEditingProductIdArr = state => state.cart.underEditingProductIdArr;

export const selectTotalAmount = state => state.cart.checkout.totalAmount;

export const selectPickedItems = state => state.cart.checkout.pickedItems;

export const selectCartIsLoading = state => state.cart.isLoading;

export const selectCartHasError = state => state.cart.hasError;

export const selectPaymentStatus = state => state.cart.checkout.success;

export const selectProcessOrderIsLoading = state => state.cart.processOrder.isProcessingOrder;

export const selectProcessOrderHasError = state => state.cart.processOrder.hasErrorOnProcessingOrder;

export const selectProcessOrderResult = state => state.cart.processOrder.success;

export const selectOnPaymentProcess = state => state.cart.checkout.onPaymentProcess;

export const selectIsLoadingOnPaymentProcess = state => state.cart.checkout.isLoadingOnPaymentProcess;

export const selectHasErrorOnPaymentProcess = state => state.cart.processCancel.hasErrorOnPaymentProcess;

export const selectHasRemovedPaymentRecord = state => state.cart.processCancel.hasUnfinishedPaymentAttempt;




export const { 
    setToggleEditQuantity, 
    manageProductIdArr, 
    removefromProductIdArr,
} = cartSlice.actions;


export default cartSlice.reducer;