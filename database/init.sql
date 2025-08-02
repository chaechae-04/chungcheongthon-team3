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

-- 오늘 날짜의 일정들 (한국 시간)
INSERT INTO schedules (user_id, title, type, start_time, end_time, priority, completed) VALUES
(1, '프로젝트 발표', '업무', '2025-08-02 14:00:00', '2025-08-02 15:00:00', 3, false),
(1, '팀 미팅', '업무', '2025-08-02 16:00:00', '2025-08-02 17:00:00', 2, false),
(1, '점심 약속', '개인', '2025-08-02 12:00:00', '2025-08-02 13:00:00', 1, true);

-- 내일 날짜의 일정들 (한국 시간)
INSERT INTO schedules (user_id, title, type, start_time, end_time, priority, completed) VALUES
(1, '코딩 스터디', '학습', '2025-08-03 10:00:00', '2025-08-03 12:00:00', 2, false),
(1, '운동', '건강', '2025-08-03 18:00:00', '2025-08-03 19:00:00', 1, false);

-- 이번 주 다른 날짜들의 일정들 (한국 시간)
INSERT INTO schedules (user_id, title, type, start_time, end_time, priority, completed) VALUES
(1, '의사 예약', '건강', '2025-08-04 15:30:00', '2025-08-04 16:30:00', 2, false),
(1, '친구 만남', '개인', '2025-08-04 19:00:00', '2025-08-04 21:00:00', 1, false),
(1, '주간 회고', '업무', '2025-08-04 09:00:00', '2025-08-04 10:00:00', 3, false);

-- 다음 주 일정들 (한국 시간)
INSERT INTO schedules (user_id, title, type, start_time, end_time, priority, completed) VALUES
(1, '새 프로젝트 기획', '업무', '2025-08-05 10:00:00', '2025-08-05 12:00:00', 3, false),
(1, '독서', '학습', '2025-08-05 20:00:00', '2025-08-05 21:00:00', 1, false),
(1, '가족 저녁', '개인', '2025-08-05 18:00:00', '2025-08-05 20:00:00', 2, false); 