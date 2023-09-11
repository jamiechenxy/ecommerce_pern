const db = require('../db/index');

const generateCartByUser = async (req, res, next) => {
    try {
        const userCart = await getCartByUserId(req.user.user_id);

        // if cart not created then create new cart. 
        if (userCart.length===0 || !userCart) {
            
            const newCart = await createCart(req.user.user_id);

            if (!newCart || newCart===undefined || newCart.length===0) {
                throw new Error('Error on creating a new cart.');
            };

            req.userCart = newCart[0];

            next();
        };

        req.userCart = userCart[0];

        next();

    } catch (error) {
        next(error);
    }
};

const createCart = async (user_id) => {
    try {
        const text = "INSERT INTO cart_info(created, user_id, payment_process) VALUES(NOW(), $1, FALSE) RETURNING *";
        const values = [user_id];

        const result =  await db.executeQuery(text, values);

        return result;
        
    } catch (error) {
        throw(error);
    }
};

const getCartItemInfoByUserId = async (user_id) => {
    try {
        const textHead = 'WITH cart AS (SELECT info.cart_id as cart_id, item.cart_item_id as cart_item_id, item.product_id as product_id FROM cart_info as info, cart_item as item WHERE info.cart_id = item.cart_id AND info.user_id = $1) ';
        const textTail = 'SELECT cart.cart_id, cart.cart_item_id as cart_item_id, product."name" as product_name, product.price as price, product.description as description FROM cart LEFT JOIN product ON cart.product_id = product.product_id ORDER BY 1;';
        const text = textHead + textTail;
        const values = [user_id];

        const result =  await db.executeQuery(text, values);

        return result;
        
    } catch (error) {
        throw(error);
    }
};

const getCartByUserId = async (user_id) => {
    try {
        const text = 'SELECT * FROM cart_info WHERE user_id = $1';
        const values = [user_id];

        const result = await db.executeQuery(text, values);

        return result;

    } catch (error) {
        throw(error);
    }
};


const getCartById = async (cartId) => {
    try {
        const text = 'SELECT * FROM cart_info WHERE cart_id = $1';
        const values = [cartId];

        const result = await db.executeQuery(text, values);

        return result;

    } catch (error) {
        throw(error);
    }
};

const addCartItem = async (productId, cartId) => {
    try {
        const text = 'INSERT INTO cart_item(created, product_id, cart_id) VALUES(NOW(), $1, $2) RETURNING *';
        const values = [productId, cartId];

        const result = await db.executeQuery(text, values);

        return result;

    } catch (error) {
        throw error;
    }
};

const getCartItemByCartId = async (cartId) => {
    try {
        const text = 'SELECT * FROM cart_item WHERE cart_id = $1';
        const values = [cartId];

        const result = await db.executeQuery(text, values);

        return result;

    } catch (error) {
        throw(error);
    }
};

const getItemsByCartItemId = async (cartItemId) => {
    try {
        const text = 'SELECT * FROM cart_item WHERE cart_item_id = $1';
        const values = [cartItemId];

        const result = await db.executeQuery(text, values);

        return result;

    } catch (error) {
        throw(error);
    }
};

const removeItemFromCart = async (cartItemId) => {
    try {
        const text = 'DELETE FROM cart_item WHERE cart_item_id=$1 RETURNING *';
        const values = [cartItemId];

        const response = await db.executeQuery(text, values);

        return response;

    } catch (error) {
        throw(error);
    }
};


// the blow is only display cart info at frontend.
const getCartItemToDisplay = async (userId) => {
    try {
        const textHead = "SELECT co.user_id as user_id, co.cart_id as cart_id, co.product_id as product_id, co.product_name as product_name, co.description as description, ROUND(co.price::NUMERIC, 2) as price, COUNT(co.product_id) as quantity, ARRAY_TO_STRING(ARRAY_AGG(co.cart_item_id), ',') as cart_item_id_arr FROM (";
        const textBody = "WITH cart AS (SELECT info.user_id as user_id, info.cart_id as cart_id, item.cart_item_id as cart_item_id, item.product_id as product_id FROM cart_info as info, cart_item as item WHERE info.cart_id = item.cart_id AND info.user_id = $1";
        const textTail = ") SELECT cart.user_id as user_id, cart.cart_id as cart_id, product.product_id as product_id, product.name as product_name, product.description as description, product.price as price, cart.cart_item_id as cart_item_id FROM cart LEFT JOIN product ON cart.product_id = product.product_id) AS co GROUP BY 1,2,3,4,5,6 ORDER BY 1,2,3;";
        
        const text = textHead + textBody + textTail;
        const values = [userId];

        const response = await db.executeQuery(text, values);

        if (response.length===0) {
            return response;
        }

        response.map((obj) => (
            obj.quantity = Number(obj.quantity),
            obj.cart_item_id_arr = obj.cart_item_id_arr.split(','),
            obj.toggleEditQuantity = false
        ));

        return response;

    } catch (error) {
        throw (error);
    }
};

const getPaymentProcessStatusByUserId = async (userId) => {
    try {
        const text = "SELECT payment_process FROM cart_info WHERE user_id=$1";
        const values = [userId];

        const response = await db.executeQuery(text, values);

        return response;

    } catch (error) {
        throw(error);
    }
};

// for stripe to call to update payment status when payment is done 
const updatePaymentProcessStatusByUserId = async (status, userId) => {
    try {
        const text = "UPDATE cart_info SET payment_process=$1 WHERE user_id=$2 RETURNING payment_process";
        const values = [status, userId];

        const response = await db.executeQuery(text, values);

        return response;

    } catch (error) {
        throw(error);
    }
};

// remove all associated cart items by cart id
const clearCartItemByCartId = async(cartId) => {
    try {
        const text = "DELETE FROM cart_item WHERE cart_id = $1 RETURNING *";
        const values = [cartId];

        const response = await db.executeQuery(text, values);

        return response;

    } catch (error) {
        throw(error);
    }
};

// remove a cart by cart id
const clearCartByCartId = async(cartId) => {
    try {
        const text = "DELETE FROM cart_info WHERE cart_id = $1 RETURNING *";
        const values = [cartId];

        const response = await db.executeQuery(text, values);

        return response;

    } catch (error) {
        throw(error);
    }
};


module.exports = {
    createCart, getCartById, addCartItem, getCartItemByCartId,
    removeItemFromCart, getItemsByCartItemId,
    getCartItemInfoByUserId, getCartByUserId, generateCartByUser, 
    getCartItemToDisplay, updatePaymentProcessStatusByUserId,
    clearCartByCartId, clearCartItemByCartId, 
    getPaymentProcessStatusByUserId,
};
