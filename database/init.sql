CREATE DATABASE IF NOT EXISTS hackathon_db;
USE hackathon_db;

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    pw VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO users (username, email) VALUES 
('admin', 'admin@example.com', '12345'),
('user1', 'user1@example.com', '12346576');
