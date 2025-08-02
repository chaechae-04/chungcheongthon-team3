# 충청톤 팀3 프로젝트

## 프로젝트 개요
이 프로젝트는 충청톤 해커톤에서 개발된 스케줄 관리 애플리케이션입니다.

## 주요 기능

### 1. 사용자 인증
- 로그인/회원가입 기능
- JWT 토큰 기반 인증
- 사용자별 개인화된 스케줄 관리

### 2. 캘린더 및 스케줄 관리
- 월간/주간 캘린더 뷰
- **실시간 데이터베이스 연동**: 하드코딩된 데이터 대신 백엔드 API를 통해 실제 데이터베이스에서 스케줄 조회
- 날짜별 일정 조회 및 표시
- 일정 중요도 설정 (높음/보통/낮음)
- 일정 완료 상태 관리
- 일정 타입 분류 (업무/개인/학습/건강)

### 3. 친구 관리
- 친구 추가/삭제
- 친구 닉네임 관리

## 기술 스택

### Frontend
- React 18
- Vite
- CSS3 (CSS Variables 활용)
- Responsive Design

### Backend
- Spring Boot 3
- Spring Security
- Spring Data JPA
- MySQL
- JWT Authentication

### DevOps
- Docker
- Docker Compose

## API 엔드포인트

### 스케줄 관련 API
- `GET /api/schedules?userId={id}` - 사용자별 전체 일정 조회
- `GET /api/schedules/date?userId={id}&date={date}` - 특정 날짜 일정 조회
- `POST /api/schedules` - 일정 추가
- `PATCH /api/schedules/{id}/complete` - 일정 완료 표시
- `PATCH /api/schedules/{id}/priority` - 일정 중요도 변경

## 데이터베이스 스키마

### Schedule 엔티티
```java
- id: Long (Primary Key)
- userId: Long (사용자 ID)
- title: String (일정 제목)
- type: String (일정 타입)
- startTime: LocalDateTime (시작 시간)
- endTime: LocalDateTime (종료 시간)
- priority: int (중요도: 1=낮음, 2=보통, 3=높음)
- completed: boolean (완료 여부)
```

## 설치 및 실행

### 1. 프로젝트 클론
```bash
git clone [repository-url]
cd chungcheongthon-team3
```

### 2. Docker를 사용한 실행
```bash
# 개발 환경 실행
./start-dev.sh

# 또는 Windows의 경우
start-dev.bat
```

### 3. 수동 실행
```bash
# Backend 실행
cd backend
./gradlew bootRun

# Frontend 실행
cd frontend
npm install
npm run dev
```

## 샘플 데이터 추가
테스트를 위해 샘플 스케줄 데이터를 추가할 수 있습니다:
```sql
-- database/sample_schedules.sql 파일 실행
```

## 개발 가이드

### 프론트엔드 개발
- 컴포넌트 기반 아키텍처
- CSS Variables를 활용한 테마 시스템
- 반응형 디자인 적용

### 백엔드 개발
- RESTful API 설계
- JPA를 활용한 데이터 접근
- Spring Security를 통한 인증/인가

## 프로젝트 구조
```
chungcheongthon-team3/
├── frontend/          # React 프론트엔드
├── backend/           # Spring Boot 백엔드
├── database/          # 데이터베이스 스크립트
├── docs/             # 프로젝트 문서
└── docker-compose.yml # Docker 설정
```

## 기여 가이드
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 라이선스
이 프로젝트는 MIT 라이선스 하에 배포됩니다.
