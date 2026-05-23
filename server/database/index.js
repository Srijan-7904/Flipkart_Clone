import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

const pool = new pg.Pool({
  host: POSTGRES_HOST || 'localhost',
  port: POSTGRES_PORT || 5432,
  user: POSTGRES_USER || 'postgres',
  password: POSTGRES_PASSWORD || '221976',
  database: POSTGRES_DB || 'ecommerce_db',
});

export default pool;
