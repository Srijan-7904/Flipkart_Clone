import Razorpay from 'razorpay';
import crypto from 'crypto';
import pool from '../database/index.js';

// ── Razorpay test credentials ────────────────────────────────────────────────
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_SsVB2xSMPYcP3F',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'OWq5FRxpw6W0dsI39D6eq74Q',
});

/**
 * POST /payment/order
 * Body: { amount: <number in rupees> }
 * Creates a Razorpay order and returns { orderId, amount, currency, key }
 */
export const createOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || isNaN(amount)) {
            return res.status(400).json({ error: 'Valid amount is required' });
        }

        const options = {
            amount: Math.round(amount * 100), // Razorpay expects paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        return res.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            key: process.env.RAZORPAY_KEY_ID || 'rzp_test_SsVB2xSMPYcP3F',
        });
    } catch (error) {
        console.error('Razorpay order creation error:', error);
        return res.status(500).json({ error: error.message || error });
    }
};

/**
 * POST /payment/verify
 * Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature, username, amount, items }
 * Verifies the payment signature to confirm success and inserts the order record.
 */
export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, username, amount, items } = req.body;

        const keySecret = process.env.RAZORPAY_KEY_SECRET || 'OWq5FRxpw6W0dsI39D6eq74Q';
        const hmac = crypto.createHmac('sha256', keySecret);
        hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const generatedSignature = hmac.digest('hex');

        if (generatedSignature === razorpay_signature) {
            // Save order to the database
            await pool.query(
                'INSERT INTO orders (username, order_id, payment_id, amount, items) VALUES ($1, $2, $3, $4, $5)',
                [username || 'guest', razorpay_order_id, razorpay_payment_id, amount || 0, JSON.stringify(items || [])]
            );
            return res.json({ success: true, message: 'Payment verified and order logged successfully' });
        } else {
            return res.status(400).json({ success: false, message: 'Payment verification failed' });
        }
    } catch (error) {
        console.error('Payment verification error:', error);
        return res.status(500).json({ error: error.message || error });
    }
};

/**
 * GET /orders/:username
 * Fetches all orders for a specific user
 */
export const getOrders = async (req, res) => {
    try {
        const { username } = req.params;
        const result = await pool.query(
            'SELECT * FROM orders WHERE username = $1 ORDER BY order_date DESC',
            [username]
        );
        return res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching orders:', error);
        return res.status(500).json({ error: error.message || error });
    }
};