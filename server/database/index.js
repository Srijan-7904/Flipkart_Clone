import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool(
  process.env.DATABASE_URL 
    ? { connectionString: process.env.DATABASE_URL }
    : {
        host: process.env.POSTGRES_HOST || 'localhost',
        port: process.env.POSTGRES_PORT || 5432,
        user: process.env.POSTGRES_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD || '221976',
        database: process.env.POSTGRES_DB || 'ecommerce_db',
      }
);

const initializeDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                firstname VARCHAR(255),
                lastname VARCHAR(255),
                username VARCHAR(255) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                phone VARCHAR(255)
            );
        `);
        
        await pool.query(`
            CREATE TABLE IF NOT EXISTS orders (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                order_id VARCHAR(255) NOT NULL,
                payment_id VARCHAR(255),
                amount INTEGER NOT NULL,
                items JSONB NOT NULL,
                order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS products (
                id VARCHAR(255) PRIMARY KEY,
                url TEXT,
                detailUrl TEXT,
                title JSONB,
                price JSONB,
                quantity INTEGER,
                description TEXT,
                discount VARCHAR(255),
                tagline VARCHAR(255)
            );
        `);
        console.log('Database tables verified/created successfully.');
    } catch (err) {
        console.error('Error initializing database tables:', err);
    }
};

initializeDB();

export default pool;
