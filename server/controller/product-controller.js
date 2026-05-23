import pool from '../database/index.js';

export const getProducts = async (request, response) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        response.json(result.rows);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

export const getProductById = async (request, response) => {
    try {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [request.params.id]);
        response.json(result.rows[0]);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};