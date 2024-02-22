drop table if exists user;
CREATE TABLE user(
    "userid" INTEGER PRIMARY KEY,
    'username' TEXT UNIQUE NOT NULL,
    'password' TEXT NOT NULL,
    'email' TEXT UNIQUE NOT NULL
);
