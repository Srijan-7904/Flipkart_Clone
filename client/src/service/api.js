import axios from 'axios';

const url = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const authenticateLogin = async (user) => {
    try {
        return await axios.post(`${url}/login`, user);
    } catch (error) {
        console.log('Error while calling login API: ', error);
    }
};

export const authenticateSignup = async (user) => {
    try {
        return await axios.post(`${url}/signup`, user);
    } catch (error) {
        console.log('Error while calling Signup API: ', error);
    }
};

export const getProductById = async (id) => {
    try {
        return await axios.get(`${url}/product/${id}`);
    } catch (error) {
        console.log('Error while getting product by id response', error);
    }
};

/**
 * Creates a Razorpay order on the backend and returns { orderId, amount, currency, key }
 */
export const createRazorpayOrder = async (amount) => {
    try {
        const response = await axios.post(`${url}/payment/order`, { amount });
        return response.data;
    } catch (error) {
        console.log('Error creating Razorpay order:', error);
    }
};

/**
 * Verifies Razorpay payment signature on the backend.
 */
export const verifyRazorpayPayment = async (paymentData) => {
    try {
        const response = await axios.post(`${url}/payment/verify`, paymentData);
        return response.data;
    } catch (error) {
        console.log('Error verifying Razorpay payment:', error);
    }
};

export const getOrders = async (username) => {
    try {
        const response = await axios.get(`${url}/orders/${username}`);
        return response.data;
    } catch (error) {
        console.log('Error calling getOrders API:', error);
    }
};