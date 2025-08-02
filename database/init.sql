CREATE DATABASE IF NOT EXISTS hackathon_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE hackathon_db;

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    pw VARCHAR(100) NOT NULL,
    nickname VARCHAR(50),
    google_id VARCHAR(100),
    profile_image VARCHAR(500),
    auth_provider VARCHAR(20) DEFAULT 'LOCAL'
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS schedules (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    type VARCHAR(50) NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    priority INT NOT NULL DEFAULT 2,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 테스트용 사용자 데이터 (비밀번호: 123456)
INSERT INTO users (username, email, pw, nickname, auth_provider) VALUES 
('admin', 'admin@example.com', '$2a$10$4D3Du1repNEboOb6zDhoWOZGGzEfaqyo7j06ZmbFjF/RS.s62LRiC', 'admin', 'LOCAL'),
('testuser', 'test@example.com', '$2a$10$4D3Du1repNEboOb6zDhoWOZGGzEfaqyo7j06ZmbFjF/RS.s62LRiC', 'testUser', 'LOCAL'),
('user1', 'user1@example.com', '$2a$10$4D3Du1repNEboOb6zDhoWOZGGzEfaqyo7j06ZmbFjF/RS.s62LRiC', 'user1', 'LOCAL');
