# 🐳 Docker로 개발환경 한 번에 설정하기 *작성중인 파일[미완성]

## 🎯 목표
팀장이 Docker로 개발환경을 미리 설정해두고, 팀원들은 명령어 한 줄로 전체 환경을 실행할 수 있게 하기

## 📋 Docker 환경의 장점
- ✅ **일관성**: 모든 팀원이 동일한 환경에서 개발
- ✅ **간편성**: 복잡한 설치 과정 없이 명령어 한 줄로 실행
- ✅ **격리**: 로컬 환경에 영향 없이 개발 가능
- ✅ **공유**: 설정 파일만 공유하면 끝

## 🗂 프로젝트 구조
```
hackathon-project/
├── docker-compose.yml          # 전체 서비스 설정
├── frontend/
│   ├── Dockerfile             # React 컨테이너 설정
│   ├── package.json
│   └── src/
├── backend/
│   ├── Dockerfile             # Spring Boot 컨테이너 설정
│   ├── pom.xml
│   └── src/
├── database/
│   ├── init.sql              # 초기 데이터베이스 스키마
│   └── data.sql              # 초기 데이터
├── nginx/
│   └── nginx.conf            # 프록시 설정 (선택사항)
└── README.md                 # 팀원용 실행 가이드
```

## 📝 설정 파일들

### 1. docker-compose.yml (메인 설정)
```yaml
version: '3.8'

services:
  # MySQL 데이터베이스
  database:
    image: mysql:8.0
    container_name: hackathon-db
    environment:
      MYSQL_ROOT_PASSWORD: hackathon2024
      MYSQL_DATABASE: hackathon_db
      MYSQL_USER: hackathon_user
      MYSQL_PASSWORD: hackathon_pass
    ports:
      - "3306:3306"
    volumes:
      - ./database/init.sql:/docker-entrypoint-initdb.d/01-init.sql
      - ./database/data.sql:/docker-entrypoint-initdb.d/02-data.sql
      - mysql_data:/var/lib/mysql
    networks:
      - hackathon-network

  # Spring Boot 백엔드
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: hackathon-backend
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://database:3306/hackathon_db
      SPRING_DATASOURCE_USERNAME: hackathon_user
      SPRING_DATASOURCE_PASSWORD: hackathon_pass
    ports:
      - "8080:8080"
    depends_on:
      - database
    volumes:
      - ./backend:/app
    networks:
      - hackathon-network
    restart: unless-stopped

  # React 프론트엔드
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: hackathon-frontend
    environment:
      REACT_APP_API_URL: http://localhost:8080/api
    ports:
      - "3000:3000"
    depends_on:
      - backend
    volumes:
      - ./frontend:/app
      - /app/node_modules
    networks:
      - hackathon-network
    restart: unless-stopped

  # phpMyAdmin (DB 관리 도구, 선택사항)
  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    container_name: hackathon-phpmyadmin
    environment:
      PMA_HOST: database
      PMA_USER: hackathon_user
      PMA_PASSWORD: hackathon_pass
    ports:
      - "8081:80"
    depends_on:
      - database
    networks:
      - hackathon-network

volumes:
  mysql_data:

networks:
  hackathon-network:
    driver: bridge
```

### 2. backend/Dockerfile (Spring Boot)
```dockerfile
FROM openjdk:11-jdk-slim

WORKDIR /app

# Maven 또는 Gradle 파일 복사
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# 의존성 다운로드 (캐시 최적화)
RUN ./mvnw dependency:go-offline -B

# 소스 코드 복사
COPY src src

# 애플리케이션 빌드
RUN ./mvnw clean package -DskipTests

# 포트 노출
EXPOSE 8080

# 애플리케이션 실행
CMD ["java", "-jar", "target/hackathon-backend-0.0.1-SNAPSHOT.jar"]
```

### 3. frontend/Dockerfile (React)
```dockerfile
FROM node:16-alpine

WORKDIR /app

# package.json 복사 (캐시 최적화)
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# 포트 노출
EXPOSE 3000

# 개발 서버 실행
CMD ["npm", "start"]
```

### 4. database/init.sql (초기 스키마)
```sql
-- 데이터베이스 초기 스키마
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS posts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    user_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at);
```

### 5. database/data.sql (초기 데이터)
```sql
-- 초기 테스트 데이터
INSERT INTO users (username, email, password) VALUES
('admin', 'admin@hackathon.com', '$2a$10$example_hashed_password'),
('testuser', 'test@hackathon.com', '$2a$10$example_hashed_password'),
('developer', 'dev@hackathon.com', '$2a$10$example_hashed_password');

INSERT INTO categories (name, description) VALUES
('공지사항', '중요한 공지사항을 올리는 카테고리'),
('자유게시판', '자유롭게 이야기하는 공간'),
('질문답변', '궁금한 것을 묻고 답하는 공간');

INSERT INTO posts (title, content, user_id) VALUES
('환영합니다!', '해커톤 프로젝트에 오신 것을 환영합니다.', 1),
('개발 환경 테스트', 'Docker 환경이 정상적으로 작동하는지 테스트하는 글입니다.', 2),
('팀원 모집', '함께 개발할 팀원을 모집합니다.', 3);
```

### 6. backend/src/main/resources/application.yml
```yaml
spring:
  datasource:
    url: ${SPRING_DATASOURCE_URL:jdbc:mysql://localhost:3306/hackathon_db}
    username: ${SPRING_DATASOURCE_USERNAME:hackathon_user}
    password: ${SPRING_DATASOURCE_PASSWORD:hackathon_pass}
    driver-class-name: com.mysql.cj.jdbc.Driver
  
  jpa:
    hibernate:
      ddl-auto: validate  # Docker에서는 validate 사용 (init.sql로 스키마 관리)
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
        format_sql: true
  
  web:
    cors:
      allowed-origins: "http://localhost:3000"
      allowed-methods: GET,POST,PUT,DELETE,OPTIONS
      allowed-headers: "*"
      allow-credentials: true

server:
  port: 8080

logging:
  level:
    com.hackathon: DEBUG
    org.springframework.web: DEBUG
```

## 🚀 팀장이 할 일 (환경 설정)

### 1단계: Docker 설치 확인
```bash
# Docker 버전 확인
docker --version
docker-compose --version

# Docker가 실행 중인지 확인
docker ps
```

### 2단계: 프로젝트 구조 생성
```bash
# 프로젝트 폴더 생성
mkdir hackathon-project
cd hackathon-project

# 하위 폴더들 생성
mkdir frontend backend database nginx

# Docker 설정 파일들 생성
touch docker-compose.yml
touch frontend/Dockerfile
touch backend/Dockerfile
touch database/init.sql
touch database/data.sql
```

### 3단계: 기본 프로젝트 생성
```bash
# React 프로젝트 생성
cd frontend
npx create-react-app . --template typescript  # TypeScript 사용시
# 또는
npx create-react-app .

# Spring Boot 프로젝트 생성 (Spring Initializr 사용)
cd ../backend
# Spring Initializr에서 다운로드한 프로젝트 압축 해제
```

### 4단계: Docker 환경 테스트
```bash
# 프로젝트 루트에서
docker-compose up --build

# 백그라운드 실행
docker-compose up -d --build
```

### 5단계: 접속 테스트
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8080
- **Database**: localhost:3306
- **phpMyAdmin**: http://localhost:8081

## 👥 팀원용 실행 가이드

### 필수 준비사항
1. **Docker Desktop 설치** (Windows/Mac)
   - https://www.docker.com/products/docker-desktop
2. **Git 설치**

### 실행 방법 (3단계)
```bash
# 1. 프로젝트 클론
git clone [리포지토리 URL]
cd hackathon-project

# 2. Docker 환경 실행
docker-compose up -d

# 3. 브라우저에서 확인
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080/api
# DB 관리: http://localhost:8081
```

### 개발 중 유용한 명령어
```bash
# 로그 확인
docker-compose logs -f

# 특정 서비스 로그만 확인
docker-compose logs -f backend

# 서비스 재시작
docker-compose restart backend

# 환경 중지
docker-compose down

# 완전 초기화 (데이터 삭제)
docker-compose down -v
```

## 🛠 개발 워크플로우

### 코드 수정 시
1. **Frontend**: 파일 저장하면 자동 리로드
2. **Backend**: 파일 수정 후 컨테이너 재시작 필요
   ```bash
   docker-compose restart backend
   ```

### 데이터베이스 스키마 변경 시
1. `database/init.sql` 파일 수정
2. 데이터베이스 컨테이너 재생성
   ```bash
   docker-compose down
   docker volume rm hackathon-project_mysql_data
   docker-compose up -d
   ```

### 새 패키지 설치 시
```bash
# Frontend 패키지 설치
docker-compose exec frontend npm install [패키지명]

# Backend 의존성 추가 후 재빌드
docker-compose up --build backend
```

## 🚨 문제 해결 FAQ

### Q: 포트가 이미 사용 중이라고 나와요
A: 다른 서비스가 해당 포트를 사용 중입니다
```bash
# 포트 사용 확인
netstat -an | grep :3000
netstat -an | grep :8080

# docker-compose.yml에서 포트 변경
ports:
  - "3001:3000"  # 3000 대신 3001 사용
```

### Q: 데이터베이스 연결이 안 돼요
A: 컨테이너 시작 순서 문제일 수 있습니다
```bash
# 모든 컨테이너 중지 후 재시작
docker-compose down
docker-compose up -d database
# 30초 대기 후
docker-compose up -d
```

### Q: 코드 변경이 반영되지 않아요
A: 볼륨 마운트 확인 또는 컨테이너 재빌드
```bash
# 캐시 없이 재빌드
docker-compose build --no-cache
docker-compose up -d
```

### Q: Docker Desktop이 느려요
A: 리소스 할당 조정
- Docker Desktop 설정에서 CPU/Memory 할당량 조정
- 불필요한 컨테이너 정리: `docker system prune`

## 📋 팀장 체크리스트

### ✅ 환경 설정 완료
- [ ] Docker 설정 파일들 작성 완료
- [ ] 로컬에서 전체 환경 실행 테스트 완료
- [ ] Frontend-Backend-Database 연동 확인
- [ ] 초기 데이터 정상 로드 확인

### ✅ 팀원 공유 준비
- [ ] GitHub에 모든 설정 파일 업로드
- [ ] README.md에 실행 가이드 작성
- [ ] 팀원용 실행 가이드 문서 작성
- [ ] 문제 해결 FAQ 준비

### ✅ 팀원 지원
- [ ] Docker Desktop 설치 도움
- [ ] 초기 실행 테스트 함께 진행
- [ ] 개발 워크플로우 설명
- [ ] 문제 발생 시 즉시 지원

***

> 실행 스크립트 
>
> start.sh

```
#!/bin/bash

echo "🐳 해커톤 개발환경 시작하기"
echo "=========================="

# Docker가 실행 중인지 확인
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker가 실행되지 않았습니다. Docker Desktop을 실행해주세요."
    exit 1
fi

echo "📦 Docker 컨테이너 시작 중..."

# 기존 컨테이너 정리 (선택사항)
read -p "기존 환경을 초기화하시겠습니까? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🧹 기존 환경 정리 중..."
    docker-compose down -v
fi

# 컨테이너 빌드 및 실행
echo "🚀 환경 구축 중... (처음 실행 시 시간이 걸릴 수 있습니다)"
docker-compose up -d --build

# 서비스 상태 확인
echo "⏳ 서비스 시작 대기 중..."
sleep 30

# 상태 확인
echo "📊 서비스 상태 확인:"
docker-compose ps

echo ""
echo "✅ 개발환경이 준비되었습니다!"
echo "🌐 Frontend: http://localhost:3000"
echo "⚙️  Backend: http://localhost:8080"
echo "🗄️  Database: localhost:3306"
echo "🔧 phpMyAdmin: http://localhost:8081"
echo ""
echo "📝 로그 확인: docker-compose logs -f"
echo "🛑 환경 중지: docker-compose down"
```

***

> 중지 스크립트
>
> stop.sh

```
#!/bin/bash

echo "🛑 해커톤 개발환경 중지하기"
echo "=========================="

# 컨테이너 중지
echo "📦 Docker 컨테이너 중지 중..."
docker-compose down

echo "✅ 개발환경이 중지되었습니다!"
echo ""
echo "🔄 다시 시작하려면: ./start.sh"
echo "🧹 완전 초기화하려면: docker-compose down -v"
```

***

> 원클릭 실행
>
> start.bat

```
@echo off
chcp 65001 >nul
echo 🐳 해커톤 개발환경 시작하기
echo ==========================

REM Docker가 실행 중인지 확인
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker가 실행되지 않았습니다. Docker Desktop을 실행해주세요.
    pause
    exit /b 1
)

echo 📦 Docker 컨테이너 시작 중...

REM 기존 컨테이너 정리 (선택사항)
set /p choice="기존 환경을 초기화하시겠습니까? (y/N): "
if /i "%choice%"=="y" (
    echo 🧹 기존 환경 정리 중...
    docker-compose down -v
)

REM 컨테이너 빌드 및 실행
echo 🚀 환경 구축 중... (처음 실행 시 시간이 걸릴 수 있습니다)
docker-compose up -d --build

REM 서비스 상태 확인
echo ⏳ 서비스 시작 대기 중...
timeout /t 30 /nobreak >nul

REM 상태 확인
echo 📊 서비스 상태 확인:
docker-compose ps

echo.
echo ✅ 개발환경이 준비되었습니다!
echo 🌐 Frontend: http://localhost:3000
echo ⚙️  Backend: http://localhost:8080
echo 🗄️  Database: localhost:3306
echo 🔧 phpMyAdmin: http://localhost:8081
echo.
echo 📝 로그 확인: docker-compose logs -f
echo 🛑 환경 중지: docker-compose down
pause
```

***

> 원클릭 중지
>
> stop.bat

```
@echo off
chcp 65001 >nul
echo 🛑 해커톤 개발환경 중지하기
echo ==========================

REM Docker가 실행 중인지 확인
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker가 실행되지 않았습니다.
    pause
    exit /b 1
)

echo 📦 Docker 컨테이너 중지 중...

REM 컨테이너 중지
docker-compose down

echo.
echo ✅ 개발환경이 중지되었습니다!
echo.
echo 🔄 다시 시작하려면: start.bat 실행
echo 🧹 완전 초기화하려면: clean.bat 실행
pause
```

***

# ⚡ 원클릭으로 개발환경 시작하기

## 🎯 목표: 클릭 한 번으로 전체 환경 실행

### Windows 사용자
1. `start.bat` 파일 **더블클릭**
2. 끝! 🎉

### Mac/Linux 사용자
1. 터미널에서 `./start.sh` 실행
2. 끝! 🎉

## 📱 실행 후 접속 주소
- **메인 앱**: http://localhost:3000
- **API 서버**: http://localhost:8080
- **DB 관리**: http://localhost:8081

## 🛑 종료하기
- Windows: `stop.bat` 더블클릭
- Mac/Linux: `./stop.sh` 실행

## 💡 꿀팁
- 바탕화면에 `start.bat` 바로가기 만들어두면 더 편해요!
- 처음 실행 시 5-10분 정도 걸릴 수 있어요 (이미지 다운로드)

