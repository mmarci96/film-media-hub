DROP TABLE IF EXISTS tmdb_movies ;

CREATE  TABLE tmdb_movies (
    id PRIMARY SERIAL KEY,
    title VARCHAR(63),
    overview VARCHAR(200),

    poster_path VARCHAR(200),
    backdrop_path VARCHAR(200),
    release_date DATE,
    popularity INT,
    vote_average INT,
    vote_count INT, 5
);
