-- 테스트용 사용자 데이터 (비밀번호: 123456)
INSERT INTO users (username, email, pw, nickname, auth_provider) 
VALUES ('testuser', 'test@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '테스트유저', 'LOCAL'); 