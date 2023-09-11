const ordersRouter = require('express').Router();
const { checkAuthenticated } = require('../util/restrict');
const { getOrders, createOrderFromStripePayment, createOrderItem } = require('../models/orders');


ordersRouter.use(checkAuthenticated, (req, res, next) => {
    try {
        next();
    } catch (error) {
        next(error);
    }
});

ordersRouter.get('/', async (req, res, next) => {
    try {
        const orders = await getOrders(req.user.user_id);

        res.status(200).send(orders);

    } catch (error) {
        next(error);
    }
});

ordersRouter.get('/:orderId', async (req, res, next) => {
    try {
        const orders = await getOrders(req.user.user_id, req.params.orderId);

        if (orders.length===0 || !orders) {
            throw new Error('No order records found.');
        };

        res.status(200).send(orders);

    } catch (error) {
        next(error);
    }
});

ordersRouter.post('/', async(req, res, next) => {
    try {
        const newOrder = await createOrderFromStripePayment(req.body.ssId);

        if (newOrder.length===0) {
            throw new Error('Error on the new order creation.');
        };

        res.status(201).send(newOrder);
        
    } catch (error) {
        next(error);
    }
});

ordersRouter.post('/orderItem', async(req, res, next) => {
    try {
        const newOrderItem = await createOrderItem(req.body.orderId);

        if (newOrderItem.length===0) {
            throw new Error('Error on the new order item creation.');
        };

        res.status(201).send(newOrderItem);

    } catch (error) {
        next(error);
    }
});



module.exports = ordersRouter;