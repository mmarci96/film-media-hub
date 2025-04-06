DROP TABLE IF EXISTS tmdb_movies ;
DROP TABLE IF EXISTS users;

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


CREATE  TABLE tmdb_movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(63),
    overview VARCHAR(200),

    poster_path VARCHAR(200),
    backdrop_path VARCHAR(200),
    release_date DATE,
    popularity INT,
    vote_average INT,
    vote_count INT, 5
);
