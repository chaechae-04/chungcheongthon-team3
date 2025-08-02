-- 샘플 스케줄 데이터 추가
-- 사용자 ID 1번에 대한 샘플 일정들

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