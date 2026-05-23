import express from 'express';
import { getProductById, getProducts } from '../controller/product-controller.js';
import { userSignUp, userLogIn } from '../controller/user-controller.js';
import { createOrder, verifyPayment, getOrders } from '../controller/payment-controller.js';

const router = express.Router();

// Auth
router.post('/signup', userSignUp);
router.post('/login', userLogIn);

// Products
router.get('/products', getProducts);
router.get('/product/:id', getProductById);

// Razorpay Payment
router.post('/payment/order', createOrder);
router.post('/payment/verify', verifyPayment);
router.get('/orders/:username', getOrders);

export default router;