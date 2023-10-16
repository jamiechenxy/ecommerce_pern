const express = require('express');
const apiRouter = express.Router();
const productRouter = require('./product');
const userRouter = require('./user');
const authRouter = require('./auth');
const cartRouter = require('./cart');
const ordersRouter = require('./orders');
const paymentRouter = require('./payment');
const featureRouter = require('./feature');


apiRouter.use('/product', productRouter);
apiRouter.use('/feature', featureRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/cart', cartRouter);
apiRouter.use('/order', ordersRouter);
apiRouter.use('/payment', paymentRouter);


module.exports = apiRouter;