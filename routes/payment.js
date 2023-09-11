const paymentRouter = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_TEST_SK);
const { getStripeProductIdById } = require('../models/product');
const { checkAuthenticated } = require('../util/restrict');
const { baseUrl } = require("../config");
const { 
    addStripeInfo, 
    getStripePaymentInfoByUserId, 
    deleteStripePaymentInfoBySsId
} = require('../models/stripe');
const { findUserById } = require('../models/user');

paymentRouter.use(checkAuthenticated, (req, res, next) => {
    try {
        next();
    } catch (error) {
        next(error);
    }
});

// stripe route. using pre-built payment flow.
paymentRouter.post('/', async (req, res, next) => {
    const { productIdArr, cartInfoArr, firstName } = req.body;
    const userId = req.user.user_id;

    try {
        const { email } = findUserById(userId);
        const lineItemsArray = [];
        for (obj of cartInfoArr) {
            if (productIdArr.includes(obj.product_id)) {
                const responseOfId = await getStripeProductIdById(obj.product_id);
                const stripeProductId = responseOfId[0].stripe_product_id;

                const product = await stripe.products.retrieve(stripeProductId);
                const defaultPrice = await stripe.prices.retrieve(product.default_price);

                const lineItemObj = {
                    price: defaultPrice.id,
                    quantity: obj.quantity,
                }
                lineItemsArray.push(lineItemObj);
            }
        }

        const session = await stripe.checkout.sessions.create({
            line_items: lineItemsArray,
            mode: 'payment',
            success_url: `${baseUrl}/checkout/${firstName}/feedback`,
            cancel_url: `${baseUrl}/cart`,
            customer_email: email,
        });

        // session.created is unix timestamp, converting to uk local date.
        const createdDate = new Date(session.created*1000);
        const sessionAdded = await addStripeInfo([
            session.id, createdDate, session.amount_total, 
            session.currency, session.payment_status, userId
        ]);

        res.status(303).json({ 
            url: session.url, 
        });
        
    } catch (error) {
        // console.log('error:', error);
        next(error);
    }
});

// using for verifying payment status upon checkout
paymentRouter.get('/status', async (req, res, next) => {
    const userId = req.user.user_id;
    try {
        const paymentInfo = await getStripePaymentInfoByUserId(userId);

        if (paymentInfo.length!==1) {
            throw new Error('More than ONE record for the user.');
        }

        const { ss_id, payment_status } = paymentInfo[0];

        res.status(200).json({ 
            ssId: ss_id,
            status: payment_status,
        });

    } catch (error) {
        next(error);
    }
});

paymentRouter.delete('/:ssId', async (req, res, next) => {
    try {
        const removedRecord = await deleteStripePaymentInfoBySsId(req.params.ssId);

        if (removedRecord.length===0) {
            throw new Error('Error on deleting stripe session record.');
        }

        res.sendStatus(204);

    } catch (error) {
        next(error);
    }
});


module.exports = paymentRouter;