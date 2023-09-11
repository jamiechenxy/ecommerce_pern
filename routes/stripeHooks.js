const stripeHooksRouter = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_TEST_SK);
const endpointSecret = 'whsec_xNR1DaDZefJ01RKUmPh5ND9jduCoFcMI';
const { baseUrl } = require("../config");
const bodyParser = require('body-parser');
const { checkAuthenticated } = require('../util/restrict');
const { updateCartCheckoutStatus } = require('../models/cart');
const { updateStripePaymentStatus } = require('../models/stripe');


stripeHooksRouter.post('/', async (req, res, next) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
      req.status(400).send(`Webhook Error: ${err.message}`);
      return;
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      // // Then define and call a function to handle the event checkout.session.completed
      // below for paid successfully. 
      const { payment_status, id } = checkoutSessionCompleted;
      const updateRes = await updateStripePaymentStatus(payment_status, id);
      break;
      
    case 'checkout.session.expired':
      const checkoutSessionExpired = event.data.object;
      // Then define and call a function to handle the event checkout.session.expired
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.sendStatus(200);

});


module.exports = stripeHooksRouter;
