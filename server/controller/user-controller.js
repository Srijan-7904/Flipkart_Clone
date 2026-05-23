import pool from '../database/index.js';

export const userLogIn = async (request, response) => {
    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE (username = $1 OR email = $1) AND password = $2',
            [request.body.username, request.body.password]
        );
        if (result.rows.length > 0) {
            const user = result.rows[0];
            delete user.password;
            return response.status(200).json(user);
        } else {
            return response.status(401).json('Invalid Login');
        }
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

export const userSignUp = async (request, response) => {
    try {
        const exist = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [request.body.username]
        );
        if (exist.rows.length > 0) {
            return response.status(401).json({ message: 'User already exists' });
        }
        const { firstname, lastname, username, email, password, phone } = request.body;
        await pool.query(
            'INSERT INTO users (firstname, lastname, username, email, password, phone) VALUES ($1, $2, $3, $4, $5, $6)',
            [firstname, lastname, username, email, password, phone]
        );
        response.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};
