CREATE TABLE helo_users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(100) NOT NULL,
    profile_pic TEXT
);

CREATE TABLE posts(
    post_id SERIAL PRIMARY KEY,
    title VARCHAR(45) NOT NULL,
    img TEXT,
    content TEXT,
    author_id INTEGER REFERENCES helo_users(id),
    date_created TIMESTAMP
);


-- INSERT INTO helo_users ( username, password, profile_pic)
-- VALUES ('userEX', 'passX', 'user')