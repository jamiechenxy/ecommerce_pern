const express = require('express');
const apiRouter = express.Router();

const productRouter = require('./product');
const userRouter = require('./user');
const authRouter = require('./auth');
const cartRouter = require('./cart');
const ordersRouter = require('./orders');
const paymentRouter = require('./payment');


apiRouter.use('/product', productRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/cart', cartRouter);
apiRouter.use('/order', ordersRouter);
apiRouter.use('/payment', paymentRouter);


module.exports = apiRouter;