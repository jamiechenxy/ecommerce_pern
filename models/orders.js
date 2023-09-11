const db = require('../db/index');


const getOrders = async (userId, orderId) => {
    try {
        const textHead = 'WITH orders AS(SELECT oi.order_id as order_id, oi.status as status, oi.created as created, oit.quantity as quantity, oit.price as price, oit.product_id as product_id FROM order_info as oi, order_item as oit WHERE oi.order_id = oit.order_id AND oi.user_id = $1 ';
        const textTail = ') SELECT o.order_id as order_id, o.status as status, o.created as created, p.product_id as product_id, p."name" as product_name, o.quantity as quantity, o.quantity * o.price as price,  p.description as description FROM orders AS o LEFT JOIN product AS p ON o.product_id = p.product_id ORDER BY 3 DESC';

        // get specific order by order id of the user's
        if (orderId!==undefined || orderId) {
            const condition = 'AND oi.order_id = $2';
            const ordersText = textHead + condition + textTail;
            const ordersValues = [userId, orderId];

            const ordersRecords = await db.executeQuery(ordersText, ordersValues);

            return ordersRecords;
        };

        // get all orders of the user's
        const allOrdersText = textHead + textTail;
        const allOrdersValues = [userId];

        const AllOrdersRecords = await db.executeQuery(allOrdersText, allOrdersValues);
        
        return AllOrdersRecords;
    
    } catch (error) {
        throw (error);
    }
};

// not used in this project
const generateCheckoutItemInfo = async (userId) => {
    try {
        const textHead = 'SELECT co.cart_id as cart_id, co.product_id as product_id, co.product_name as product_name, co.description as description, SUM(co.price) as total_price, COUNT(co.product_id) as quantity FROM ';
        const textBody = '(WITH cart AS (SELECT info.cart_id as cart_id, item.cart_item_id as cart_item_id, item.product_id as product_id FROM cart_info as info, cart_item as item WHERE info.cart_id = item.cart_id AND info.user_id = $1) ';
        const textTail = 'SELECT cart.cart_id, product.product_id as product_id, product."name" as product_name, product.description as description, product.price as price FROM cart LEFT JOIN product ON cart.product_id = product.product_id) AS co GROUP BY 1,2,3,4 ORDER BY 1,2;';
        const text = textHead + textBody + textTail;
        const values = [userId];

        const orderItemInfo = await db.executeQuery(text, values);

        return orderItemInfo;

    } catch (error) {
        throw (error);
    }
};


const createOrderFromStripePayment = async (ssId) => {
    try {
        const textHead = "INSERT INTO order_info (created,modified,total,status,user_id,quantity,currency,payment_status,ss_id,payment_date) WITH sscit AS(WITH ssci AS(SELECT ss.user_id, ci.cart_id FROM stripe_session ss, cart_info ci WHERE ss.user_id = ci.user_id ";
        const textBody = "AND ss_id=$1) SELECT ssci.user_id,ssci.cart_id,COUNT(cit.cart_item_id) AS quantity FROM ssci LEFT JOIN cart_item cit ON ssci.cart_id=cit.cart_id GROUP BY 1,2) ";
        const textTail = "SELECT NOW(),NULL,ss.amount_total,'pending',ss.user_id,sscit.quantity,ss.currency,ss.payment_status,ss.ss_id,ss.created FROM sscit LEFT JOIN stripe_session AS ss ON sscit.user_id=ss.user_id RETURNING *";
        const text = textHead + textBody + textTail;
        const values = [ssId];

        const resOrderInfo = await db.executeQuery(text, values);

        if (resOrderInfo.length===0) {
            throw new Error('Error on creating order.');
        };

        return resOrderInfo;

    } catch (error) {
        throw(error);
    }
};

const createOrderItem = async(orderId) => {
    try {
        const textHead = "INSERT INTO order_item (created,modified,quantity,price,order_id,product_id) WITH ocit AS (WITH oci AS(SELECT oi.order_id,oi.user_id,ci.cart_id FROM order_info oi,cart_info ci WHERE oi.order_id=$1 AND oi.user_id=ci.user_id) ";
        const textTail = "SELECT oci.order_id,oci.user_id,oci.cart_id,cit.product_id,COUNT(product_id) AS quantity FROM oci,cart_item cit WHERE oci.cart_id=cit.cart_id GROUP BY 1,2,3,4) SELECT NOW(),NULL,ocit.quantity,p.price,ocit.order_id,ocit.product_id FROM ocit, product p WHERE ocit.product_id=p.product_id RETURNING *";
        const text = textHead + textTail;
        const values = [orderId];

        const resOrderItem = await db.executeQuery(text, values);

        if (resOrderItem.length===0) {
            throw new Error('Error on creating order item.');
        };

        return resOrderItem;

    } catch (error) {
        throw(error);
    }
};


module.exports = {
    getOrders, createOrderFromStripePayment, generateCheckoutItemInfo, 
    createOrderItem, 
};