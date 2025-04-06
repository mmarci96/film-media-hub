-- DROP TABLE IF EXISTS favorites ;
-- DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(200) NOT NULL, 
    password_hash VARCHAR(200),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    tmdb_id INT NOT NULL, 
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    media_type VARCHAR(80) NOT NULL,
    status TEXT CHECK (status IN ('watching', 'paused', 'planned', 'completed', 'dropped', 'rewatching', 'skipped', 'on_hold')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
