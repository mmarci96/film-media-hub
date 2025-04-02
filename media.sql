DROP DATABASE IF EXISTS media;

CREATE TABLE media (
    id SERIAL PRIMARY KEY,
    title VARCHAR(80),
    description VARCHAR(80),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO media (title, description) 
VALUES 
    ('media1', 'description'),
    ('media2', 'description2')
;
