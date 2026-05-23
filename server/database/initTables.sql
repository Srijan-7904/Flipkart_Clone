CREATE TABLE IF NOT EXISTS users (
    id          SERIAL PRIMARY KEY,
    firstname   VARCHAR(20) NOT NULL,
    lastname    VARCHAR(20) NOT NULL,
    username    VARCHAR(50) UNIQUE NOT NULL,
    email       VARCHAR(100) UNIQUE NOT NULL,
    password    VARCHAR(255) NOT NULL,
    phone       VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS products (
    id          TEXT PRIMARY KEY,
    url         TEXT,
    detailUrl   TEXT,
    title       JSONB,
    price       JSONB,
    quantity    INTEGER,
    description TEXT,
    discount    TEXT,
    tagline     TEXT
);
