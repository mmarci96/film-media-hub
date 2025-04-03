DROP TABLE IF EXISTS tmdb_movies ;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(200), 
    password_hash VARCHAR(200),
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
