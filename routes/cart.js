const cartRouter = require('express').Router();
const { 
    addCartItem, 
    getCartItemByCartId, 
    removeItemFromCart, 
    generateCartByUser,
    getCartItemToDisplay,
    getCartByUserId,
    clearCartItemByCartId,
    clearCartByCartId,
    updatePaymentProcessStatusByUserId,
    getPaymentProcessStatusByUserId,
} = require('../models/cart');
const { getProductById } = require('../models/product');
const { checkAuthenticated } = require('../util/restrict');
const { deleteStripePaymentInfoByUserId } = require('../models/stripe');


cartRouter.use(checkAuthenticated, generateCartByUser, async (req, res, next) => {
    try {
        next();
    } catch (error) {
        next(error);
    }
});

// using for verifying payment status upon checkout
cartRouter.get('/', async (req, res, next) => {
    try {
        const cart = await getCartByUserId(req.user.user_id);
        
        res.status(200).send(cart);

    } catch (error) {
        next(error);
    }
});

// get cart and all items info in an user's cart to display.
cartRouter.get('/display', async (req, res, next) => {
    try {
        const cart = await getCartItemToDisplay(req.user.user_id);
        
        res.status(200).send(cart);

    } catch (error) {
        next(error);
    };
});

// create cart items based on cart id (add items to a cart)
cartRouter.post('/', async (req, res, next) => {
    try {
        const cartId = req.userCart.cart_id;
        const {productId} = req.body;

        const productRes = await getProductById(productId); 
    
        if (productRes.length===0 || !productRes) {
            res.status(404);
            throw new Error('The product not existed.');
        };
    
        const result = await addCartItem(productId, cartId);
    
        if (!result || result===undefined || result.length===0) {
            res.status(500);
            throw new Error('Error on adding items to a cart.');
        };
    
        res.status(201).send(result[0]);
        
    } catch (error) {
        next(error);
    }
});

cartRouter.get('/status', async(req, res, next) => {
    try {
        const status = await getPaymentProcessStatusByUserId(req.user.user_id);

        if (status.length===0 || !status) {
            throw new Error('Error on selecting cart status.');
        }

        res.status(200).json({ status: status[0].payment_process });

    } catch (error) {
        next(error);
    }
});

cartRouter.put('/status', async(req, res, next) => {
    const { status } = req.body;
    try {
        const updatedStatus = await updatePaymentProcessStatusByUserId(status, req.user.user_id);

        if (updatedStatus.length===0 || !updatedStatus) {
            throw new Error('Error on updating cart status.');
        }
        // only return status
        res.status(202).json({ paymentProcess: updatedStatus[0].payment_process });

    } catch (error) {
        next(error);
    }
});

cartRouter.get('/process', async(req, res, next) => {
    const userId = req.user.user_id;
    try {
        // get cart status
        const cartStatusRes = await getPaymentProcessStatusByUserId(userId);
        const cartStatus = cartStatusRes[0].payment_process;
        // if false, return 
        if (!cartStatus) {
            return res.status(200).json({ cartStatus: false, });
        }

        // if true, get on process
        const removedPaymentRecordRes = await deleteStripePaymentInfoByUserId(userId);
        // reset user's cart status to false
        const updatedCartStautsRes = await updatePaymentProcessStatusByUserId(false, userId);
        const updatedCartStatus = updatedCartStautsRes[0].payment_process;
        if (updatedCartStatus) {
            throw new Error('Error on setting false on cart status.');
        }

        res.status(200).json({ cartStatus: false, });

    } catch (error) {
        next(error);
    }
});

// remove items from cart
cartRouter.delete('/cartItem/:cartItemId', async (req, res, next) => {
    try {
        const cartId = req.userCart.cart_id; 
        const {cartItemId} = req.params;
        
        // check if any items in the cart item table referenced to this cart id.
        const cartItems = await getCartItemByCartId(cartId);

        if (cartItems.length===0 || !cartItems) {
            res.status(404);
            throw new Error('There is no item in this cart.');
        };

        // filter to fetch the matched cart_item_id.
        const cartItem = cartItems.filter((item) => item.cart_item_id === Number(cartItemId));

        if (cartItem.length===0 || !cartItem) {
            res.status(404);
            throw new Error('No such item in the cart.');
        };

        // remove the desired item by cart item id
        const removedItem = await removeItemFromCart(cartItem[0].cart_item_id);

        if (removedItem.length===0 || !removedItem) {
            res.status(500);
            throw new Error('Error on removing the item.');
        };

        res.send('The item has been removed from the cart.');
        
    } catch (error) {
        next(error);
    }
});

// remove all cart items and cart itself altogether
cartRouter.delete('/clear/:cartId', async(req, res, next) => {
    const { cartId } = req.params;
    try {
        const removedCartItem = await clearCartItemByCartId(cartId);

        if (removedCartItem.length===0) {
            throw new Error('Error on removing cart item.');
        }

        const removedCartInfo = await clearCartByCartId(cartId);

        if (removedCartInfo.length===0) {
            throw new Error('Error on removing cart.');
        }

        res.sendStatus(204);

    } catch (error) {
        next(error);
    }
});



module.exports = cartRouter;