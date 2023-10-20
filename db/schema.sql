-- Drop the database if it already exists (for safety).
DROP DATABASE IF EXISTS tech_blog_db;

-- Create a new database called "tech_blog_db".
CREATE DATABASE tech_blog_db;

-- Switch to using the "tech_blog_db" database.
USE tech_blog_db;

-- Create the "users" table to store user information.
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL, -- Passwords are hashed.
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create the "posts" table to store blog posts.
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    user_id INT NOT NULL, -- References the "users" table.
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create the "comments" table to store comments on posts.
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    user_id INT NOT NULL, -- References the "users" table.
    post_id INT NOT NULL, -- References the "posts" table.
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);
