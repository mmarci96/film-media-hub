CREATE TABLE movies (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    overview TEXT,
    poster_path VARCHAR(255),
    backdrop_path VARCHAR(255),
    release_date DATE,
    popularity FLOAT,
    vote_average FLOAT,
    vote_count INT
);

INSERT INTO movies (id, title, overview, poster_path, backdrop_path, release_date, popularity, vote_average, vote_count) VALUES
(438631, 'Dune', 'Paul Atreides, a brilliant and gifted young man ...', '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg', '/jYEW5xZkZk2WTrdbMGAPFuBqbDc.jpg', '2021-09-15', 25.481, 7.782, 13368),
(841, 'Dune', 'In the year 10,191, the most precious substance ...', '/4kJmUCE7mkVJjXa7A0g2rY4IGTm.jpg', '/cAOaUTJzUG8vfXcThFNIC5tUMig.jpg', '1984-12-14', 4.7261, 6.2, 3150),
(697620, 'Dune', 'Sounds as witnesses. They blurr into memories ...', '/CecUPdnnP22wV1NoRFQaG231zj.jpg', '', '2020-06-15', 0.7903, 7.4, 35),
(16672, 'Woman in the Dunes', 'A vacationing entomologist suffers extreme ...', '/f0JpsMQ9oEjKBD66Ky3qK3z7LGT.jpg', '/dxfFh9pTKDaYH2B6PwcR6ohCM1L.jpg', '1964-02-15', 2.4018, 8.2, 463),
(881460, 'Planet Dune', 'A crew on a mission to rescue a marooned base ...', '/cPSPghn6tr6fGY6hTi78SrxBcqY.jpg', '/3BBwgGaZmM8KqEdCqovoTwLQHBY.jpg', '2021-10-29', 2.4362, 5.3, 61),
(271683, 'The Dune', 'Through the course of several accidents and ...', '/qNnFzvRyXk0FkHOGuxS4jWqj1vO.jpg', '/8MaAovYobRzVvpUSOPrMlSk29PP.jpg', '2014-08-13', 0.1849, 5.868, 19),
(693134, 'Dune: Part Two', 'Follow the mythic journey of Paul Atreides ...', '/6izwz7rsy95ARzTR3poZ8H6c5pp.jpg', '/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg', '2024-02-27', 27.0401, 8.149, 6486),
(641213, 'The Dunes', 'When a domestic counselor''s ex-wife attempts ...', '/jRNt7YRAPtYrCnd8eqkIsB6Gppd.jpg', '/uo863w1G19zWQuBZyaARmtPWvor.jpg', '2019-11-01', 0.2703, 6, 14),
(911972, 'Devil In Dune', 'The film tells the story of a near future ...', '/nQLdzYYB71sUugtSR7e7YdjF6Vx.jpg', '/pyw45YPB9Mk01zQiAnvfIdUFYQo.jpg', '2021-12-03', 0.5366, 7, 17);

-- More entries can be added following the same pattern
