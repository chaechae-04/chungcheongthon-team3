-- 샘플 사용자 데이터 추가
-- 비밀번호는 BCrypt로 해시화된 "password123"입니다.

INSERT INTO users (email, username, nickname, password, auth_provider, created_at, updated_at) VALUES
('test@test.com', 'testuser', '테스트유저', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'LOCAL', NOW(), NOW()),
('admin@test.com', 'admin', '관리자', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'LOCAL', NOW(), NOW()),
('user1@test.com', 'user1', '사용자1', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'LOCAL', NOW(), NOW());

-- 비밀번호: password123 