# 🐳 Docker로 개발환경 한 번에 설정하기 *작성중인 파일[미완성]

## 📋 목차

### 🎯 [개요](#개요)
- [목표](#목표)
- [Docker 환경의 장점](#📋-docker-환경의-장점)
- [프로젝트 구조](#🗂-프로젝트-구조)

### ⚙️ [설정 파일](#📝-핵심-설정-파일들)
- [docker-compose.yml (메인 설정)](#1-docker-composeyml-메인-설정)
- [환경 변수 (.env)](#2-env-환경-변수)
- [Backend 설정](#3-backenddockerfile-spring-boot)
- [Frontend 설정](#5-frontenddockerfile-react)
- [데이터베이스 설정](#8-databaseinitsql-초기-스키마)

### 🖥 [Windows 사용자](#🖥-windows-개발환경-스크립트)
- [시작 스크립트 (start.bat)](#scriptswindowsstartbat)
- [중지 스크립트 (stop.bat)](#scriptswindowsstopbat)
- [초기화 스크립트 (clean.bat)](#scriptswindowscleanbat)
- [로그 확인 (logs.bat)](#scriptswindowslogsbat)

### 🍎 [Mac/Linux 사용자](#🍎-maclinux-개발환경-스크립트)
- [시작 스크립트 (start.sh)](#scriptsunixstartsh)
- [중지 스크립트 (stop.sh)](#scriptsunixstopsh)
- [초기화 스크립트 (clean.sh)](#scriptsunixcleansh)
- [로그 확인 (logs.sh)](#scriptsunixlogssh)

### 🚀 [실행 가이드](#🚀-팀장이-할-일-환경-설정)
- [팀장이 할 일 (환경 설정)](#🚀-팀장이-할-일-환경-설정)
- [Windows 팀원용 가이드](#🖥-windows-사용자)
- [Mac/Linux 팀원용 가이드](#🍎-maclinux-사용자)

### 🛠 [개발 및 문제해결](#🛠-개발-워크플로우)
- [개발 워크플로우](#🛠-개발-워크플로우)
- [문제 해결 FAQ](#🚨-문제-해결-faq)
- [팀장 체크리스트](#📋-팀장-체크리스트)
  
## 🎯 목표 {#목표}
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
├── .env                        # 환경 변수
├── frontend/
│   ├── Dockerfile             # React 컨테이너 설정
│   ├── .dockerignore          # Docker 제외 파일
│   ├── package.json
│   └── src/
├── backend/
│   ├── Dockerfile             # Spring Boot 컨테이너 설정
│   ├── .dockerignore          # Docker 제외 파일
│   ├── pom.xml
│   └── src/
├── database/
│   ├── init.sql              # 초기 데이터베이스 스키마
│   └── data.sql              # 초기 데이터
├── scripts/
│   ├── windows/              # Windows용 스크립트
│   │   ├── start.bat
│   │   ├── stop.bat
│   │   ├── clean.bat
│   │   └── logs.bat
│   └── unix/                 # Mac/Linux용 스크립트
│       ├── start.sh
│       ├── stop.sh
│       ├── clean.sh
│       └── logs.sh
└── README.md                 # 팀원용 실행 가이드
```

## 📝 핵심 설정 파일들

### 1. docker-compose.yml (메인 설정)
```yaml
version: '3.8'

services:
  # MySQL 데이터베이스
  database:
    image: mysql:8.0
    container_name: hackathon-db
    environment:
      MYSQL_ROOT_PASSWORD: \${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: \${MYSQL_DATABASE}
      MYSQL_USER: \${MYSQL_USER}
      MYSQL_PASSWORD: \${MYSQL_PASSWORD}
    ports:
      - "3306:3306"
    volumes:
      - ./database/init.sql:/docker-entrypoint-initdb.d/01-init.sql
      - ./database/data.sql:/docker-entrypoint-initdb.d/02-data.sql
      - mysql_data:/var/lib/mysql
    networks:
      - hackathon-network
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      timeout: 20s
      retries: 10

  # Spring Boot 백엔드
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: hackathon-backend
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://database:3306/\${MYSQL_DATABASE}
      SPRING_DATASOURCE_USERNAME: \${MYSQL_USER}
      SPRING_DATASOURCE_PASSWORD: \${MYSQL_PASSWORD}
      SPRING_PROFILES_ACTIVE: docker
    ports:
      - "8080:8080"
    depends_on:
      database:
        condition: service_healthy
    volumes:
      - ./backend/src:/app/src
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
      CHOKIDAR_USEPOLLING: true
    ports:
      - "3000:3000"
    depends_on:
      - backend
    volumes:
      - ./frontend/src:/app/src
      - ./frontend/public:/app/public
      - /app/node_modules
    networks:
      - hackathon-network
    restart: unless-stopped

  # phpMyAdmin (DB 관리 도구)
  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    container_name: hackathon-phpmyadmin
    environment:
      PMA_HOST: database
      PMA_USER: \${MYSQL_USER}
      PMA_PASSWORD: \${MYSQL_PASSWORD}
    ports:
      - "8081:80"
    depends_on:
      database:
        condition: service_healthy
    networks:
      - hackathon-network

volumes:
  mysql_data:

networks:
  hackathon-network:
    driver: bridge
```

### 2. .env (환경 변수)
```env
# 데이터베이스 설정
MYSQL_ROOT_PASSWORD=hackathon2024
MYSQL_DATABASE=hackathon_db
MYSQL_USER=hackathon_user
MYSQL_PASSWORD=hackathon_pass

# 개발 환경 설정
SPRING_PROFILES_ACTIVE=docker
NODE_ENV=development
```

### 3. backend/Dockerfile (Spring Boot)
```dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

# Maven 파일 복사
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

# 애플리케이션 실행 (개발 환경 최적화)
CMD ["java", "-Xmx512m", "-Dspring.profiles.active=docker", "-jar", "target/hackathon-backend-0.0.1-SNAPSHOT.jar"]
```

### 4. backend/.dockerignore
```dockerignore
target/
.mvn/wrapper/maven-wrapper.jar
.git
.gitignore
README.md
.env
.vscode
*.log
```

### 5. frontend/Dockerfile (React)
```dockerfile
FROM node:18-alpine

WORKDIR /app

# 패키지 파일 먼저 복사 (캐시 최적화)
COPY package*.json ./
RUN npm ci --only=production=false

# 소스 코드 복사
COPY . .

# 포트 노출
EXPOSE 3000

# 개발 서버 실행 (핫 리로드 활성화)
CMD ["npm", "start"]
```

### 6. frontend/.dockerignore
```dockerignore
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.nyc_output
coverage
.vscode
build
```

### 7. backend/src/main/resources/application.yml
```yaml
spring:
  profiles:
    active: \${SPRING_PROFILES_ACTIVE:local}
  
  datasource:
    url: \${SPRING_DATASOURCE_URL:jdbc:mysql://localhost:3306/hackathon_db}
    username: \${SPRING_DATASOURCE_USERNAME:hackathon_user}
    password: \${SPRING_DATASOURCE_PASSWORD:hackathon_pass}
    driver-class-name: com.mysql.cj.jdbc.Driver
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5
  
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
        format_sql: true
    batch-size: 20
  
  web:
    cors:
      allowed-origins: "http://localhost:3000"
      allowed-methods: GET,POST,PUT,DELETE,OPTIONS
      allowed-headers: "*"
      allow-credentials: true

server:
  port: 8080
  tomcat:
    threads:
      max: 50
      min-spare: 10

---
spring:
  profiles: docker
  
logging:
  level:
    com.hackathon: INFO
    org.springframework.web: INFO
```

### 8. database/init.sql (초기 스키마)
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

### 9. database/data.sql (초기 데이터)
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

## 🖥 Windows 개발환경 스크립트

### scripts/windows/start.bat
```batch
@echo off
chcp 65001 >nul
echo 🐳 해커톤 개발환경 시작하기 (Windows)
echo =====================================

REM Docker 설치 확인
where docker >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker가 설치되지 않았습니다.
    echo 📥 Docker Desktop을 설치해주세요: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

REM docker-compose 설치 확인
where docker-compose >nul 2>&1
if errorlevel 1 (
    echo ❌ docker-compose가 설치되지 않았습니다.
    pause
    exit /b 1
)

REM Docker 실행 상태 확인
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker가 실행되지 않았습니다. Docker Desktop을 실행해주세요.
    pause
    exit /b 1
)

echo 📦 Docker 컨테이너 시작 중...

REM 기존 컨테이너 정리 옵션
set /p choice="기존 환경을 초기화하시겠습니까? (y/N): "
if /i "%choice%"=="y" (
    echo 🧹 기존 환경 정리 중...
    docker-compose down -v
    docker system prune -f
)

REM 환경 변수 파일 확인
if not exist .env (
    echo 📝 환경 변수 파일 생성 중...
    (
        echo # 데이터베이스 설정
        echo MYSQL_ROOT_PASSWORD=hackathon2024
        echo MYSQL_DATABASE=hackathon_db
        echo MYSQL_USER=hackathon_user
        echo MYSQL_PASSWORD=hackathon_pass
        echo.
        echo # 개발 환경 설정
        echo SPRING_PROFILES_ACTIVE=docker
        echo NODE_ENV=development
    ) > .env
)

REM 컨테이너 빌드 및 실행
echo 🚀 환경 구축 중... (처음 실행 시 시간이 걸릴 수 있습니다)
docker-compose up -d --build

REM 서비스 준비 대기
echo ⏳ 서비스 시작 대기 중...
timeout /t 60 /nobreak >nul

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
echo 📝 로그 확인: scripts\windows\logs.bat
echo 🛑 환경 중지: scripts\windows\stop.bat
pause
```

### scripts/windows/stop.bat
```batch
@echo off
chcp 65001 >nul
echo 🛑 해커톤 개발환경 중지하기 (Windows)
echo =====================================

REM Docker 실행 상태 확인
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker가 실행되지 않았습니다.
    pause
    exit /b 1
)

echo 📦 Docker 컨테이너 중지 중...
docker-compose down

echo.
echo ✅ 개발환경이 중지되었습니다!
echo.
echo 🔄 다시 시작하려면: scripts\windows\start.bat
echo 🧹 완전 초기화하려면: scripts\windows\clean.bat
pause
```

### scripts/windows/clean.bat
```batch
@echo off
chcp 65001 >nul
echo 🧹 해커톤 개발환경 완전 초기화 (Windows)
echo ==========================================

REM Docker 실행 상태 확인
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker가 실행되지 않았습니다.
    pause
    exit /b 1
)

echo ⚠️  주의: 모든 데이터가 삭제됩니다!
set /p choice="정말 초기화하시겠습니까? (y/N): "
if /i not "%choice%"=="y" (
    echo 취소되었습니다.
    pause
    exit /b 0
)

echo 🗑️  컨테이너 및 볼륨 삭제 중...
docker-compose down -v

echo 🧹 사용하지 않는 Docker 리소스 정리 중...
docker system prune -f

echo.
echo ✅ 완전 초기화가 완료되었습니다!
echo 🚀 새로 시작하려면: scripts\windows\start.bat
pause
```

### scripts/windows/logs.bat
```batch
@echo off
chcp 65001 >nul
echo 📝 해커톤 개발환경 로그 확인 (Windows)
echo ====================================

REM Docker 실행 상태 확인
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker가 실행되지 않았습니다.
    pause
    exit /b 1
)

echo 어떤 서비스의 로그를 확인하시겠습니까?
echo 1. 전체 로그
echo 2. Frontend 로그
echo 3. Backend 로그
echo 4. Database 로그
echo 5. 실시간 로그 (Ctrl+C로 종료)
echo.
set /p choice="선택 (1-5): "

if "%choice%"=="1" (
    echo 📊 전체 서비스 로그:
    docker-compose logs --tail=50
) else if "%choice%"=="2" (
    echo 🌐 Frontend 로그:
    docker-compose logs --tail=50 frontend
) else if "%choice%"=="3" (
    echo ⚙️ Backend 로그:
    docker-compose logs --tail=50 backend
) else if "%choice%"=="4" (
    echo 🗄️ Database 로그:
    docker-compose logs --tail=50 database
) else if "%choice%"=="5" (
    echo 📡 실시간 로그 (Ctrl+C로 종료):
    docker-compose logs -f
) else (
    echo ❌ 잘못된 선택입니다.
)

pause
```

## 🍎 Mac/Linux 개발환경 스크립트

### scripts/unix/start.sh
```bash
#!/bin/bash

set -e

echo "🐳 해커톤 개발환경 시작하기 (Mac/Linux)"
echo "====================================="

# Docker 설치 확인
if ! command -v docker &> /dev/null; then
    echo "❌ Docker가 설치되지 않았습니다."
    echo "📥 Docker를 설치해주세요: https://docs.docker.com/get-docker/"
    exit 1
fi

# docker-compose 설치 확인
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose가 설치되지 않았습니다."
    echo "📥 docker-compose를 설치해주세요: https://docs.docker.com/compose/install/"
    exit 1
fi

# Docker 실행 상태 확인
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker가 실행되지 않았습니다. Docker를 실행해주세요."
    exit 1
fi

echo "📦 Docker 컨테이너 시작 중..."

# 기존 컨테이너 정리 옵션
read -p "기존 환경을 초기화하시겠습니까? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🧹 기존 환경 정리 중..."
    docker-compose down -v
    docker system prune -f
fi

# 환경 변수 파일 확인
if [ ! -f .env ]; then
    echo "📝 환경 변수 파일 생성 중..."
    cat > .env << EOF
# 데이터베이스 설정
MYSQL_ROOT_PASSWORD=hackathon2024
MYSQL_DATABASE=hackathon_db
MYSQL_USER=hackathon_user
MYSQL_PASSWORD=hackathon_pass

# 개발 환경 설정
SPRING_PROFILES_ACTIVE=docker
NODE_ENV=development
EOF
fi

# 컨테이너 빌드 및 실행
echo "🚀 환경 구축 중... (처음 실행 시 시간이 걸릴 수 있습니다)"
docker-compose up -d --build

# 서비스 준비 대기
echo "⏳ 서비스 시작 대기 중..."
timeout 120 bash -c 'until docker-compose ps | grep -q "Up.*healthy\|Up.*3000"; do sleep 2; done' || {
    echo "❌ 서비스 시작에 실패했습니다. 로그를 확인해주세요."
    docker-compose logs
    exit 1
}

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
echo "📝 로그 확인: ./scripts/unix/logs.sh"
echo "🛑 환경 중지: ./scripts/unix/stop.sh"
```

### scripts/unix/stop.sh
```bash
#!/bin/bash

echo "🛑 해커톤 개발환경 중지하기 (Mac/Linux)"
echo "====================================="

# Docker 실행 상태 확인
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker가 실행되지 않았습니다."
    exit 1
fi

echo "📦 Docker 컨테이너 중지 중..."
docker-compose down

echo ""
echo "✅ 개발환경이 중지되었습니다!"
echo ""
echo "🔄 다시 시작하려면: ./scripts/unix/start.sh"
echo "🧹 완전 초기화하려면: ./scripts/unix/clean.sh"
```

### scripts/unix/clean.sh
```bash
#!/bin/bash

echo "🧹 해커톤 개발환경 완전 초기화 (Mac/Linux)"
echo "=========================================="

# Docker 실행 상태 확인
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker가 실행되지 않았습니다."
    exit 1
fi

echo "⚠️  주의: 모든 데이터가 삭제됩니다!"
read -p "정말 초기화하시겠습니까? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "취소되었습니다."
    exit 0
fi

echo "🗑️  컨테이너 및 볼륨 삭제 중..."
docker-compose down -v

echo "🧹 사용하지 않는 Docker 리소스 정리 중..."
docker system prune -f

echo ""
echo "✅ 완전 초기화가 완료되었습니다!"
echo "🚀 새로 시작하려면: ./scripts/unix/start.sh"
```

### scripts/unix/logs.sh
```bash
#!/bin/bash

echo "📝 해커톤 개발환경 로그 확인 (Mac/Linux)"
echo "===================================="

# Docker 실행 상태 확인
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker가 실행되지 않았습니다."
    exit 1
fi

echo "어떤 서비스의 로그를 확인하시겠습니까?"
echo "1. 전체 로그"
echo "2. Frontend 로그"
echo "3. Backend 로그"
echo "4. Database 로그"
echo "5. 실시간 로그 (Ctrl+C로 종료)"
echo ""
read -p "선택 (1-5): " choice

case $choice in
    1)
        echo "📊 전체 서비스 로그:"
        docker-compose logs --tail=50
        ;;
    2)
        echo "🌐 Frontend 로그:"
        docker-compose logs --tail=50 frontend
        ;;
    3)
        echo "⚙️ Backend 로그:"
        docker-compose logs --tail=50 backend
        ;;
    4)
        echo "🗄️ Database 로그:"
        docker-compose logs --tail=50 database
        ;;
    5)
        echo "📡 실시간 로그 (Ctrl+C로 종료):"
        docker-compose logs -f
        ;;
    *)
        echo "❌ 잘못된 선택입니다."
        exit 1
        ;;
esac
```

## 🚀 팀장이 할 일 (환경 설정)

### 1단계: 프로젝트 구조 생성
```bash
# 프로젝트 폴더 생성
mkdir hackathon-project
cd hackathon-project

# 하위 폴더들 생성
mkdir frontend backend database scripts
mkdir scripts/windows scripts/unix

# 필요한 파일들 생성
touch docker-compose.yml .env
touch frontend/Dockerfile frontend/.dockerignore
touch backend/Dockerfile backend/.dockerignore
touch database/init.sql database/data.sql
```

### 2단계: 스크립트 실행 권한 설정 (Mac/Linux)
```bash
# Unix 스크립트 실행 권한 부여
chmod +x scripts/unix/*.sh
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
# Windows
scripts\windows\start.bat

# Mac/Linux
./scripts/unix/start.sh
```

## 👥 팀원용 실행 가이드

### 🖥 Windows 사용자
1. **Docker Desktop 설치**: https://www.docker.com/products/docker-desktop
2. **프로젝트 클론**: `git clone [리포지토리 URL]`
3. **실행**: `scripts\windows\start.bat` 더블클릭
4. **접속**: http://localhost:3000

### 🍎 Mac/Linux 사용자
1. **Docker 설치**: https://docs.docker.com/get-docker/
2. **프로젝트 클론**: `git clone [리포지토리 URL]`
3. **실행**: `./scripts/unix/start.sh`
4. **접속**: http://localhost:3000

## 🛠 개발 워크플로우

### 코드 수정 시
- **Frontend**: 파일 저장하면 자동 리로드
- **Backend**: 파일 수정 후 컨테이너 자동 재시작

### 새 패키지 설치 시
```bash
# Frontend 패키지 설치
docker-compose exec frontend npm install [패키지명]

# Backend 의존성 추가 후 재빌드
docker-compose up --build backend
```

## 🚨 문제 해결 FAQ

### Q: 포트가 이미 사용 중이라고 나와요
A: docker-compose.yml에서 포트 변경
```yaml
ports:
  - "3001:3000"  # 3000 대신 3001 사용
```

### Q: 데이터베이스 연결이 안 돼요
A: 헬스체크가 추가되어 자동으로 대기합니다. 그래도 안 되면:
```bash
# Windows
scripts\windows\clean.bat

# Mac/Linux
./scripts/unix/clean.sh
```

### Q: 코드 변경이 반영되지 않아요
A: 볼륨 마운트 확인 또는 컨테이너 재빌드
```bash
docker-compose build --no-cache
docker-compose up -d
```

## 📋 팀장 체크리스트

### ✅ 환경 설정 완료
- [ ] 모든 설정 파일 작성 완료
- [ ] Windows/Mac/Linux 스크립트 테스트 완료
- [ ] Frontend-Backend-Database 연동 확인
- [ ] 초기 데이터 정상 로드 확인

### ✅ 팀원 공유 준비
- [ ] GitHub에 모든 파일 업로드
- [ ] 플랫폼별 실행 가이드 작성
- [ ] 문제 해결 FAQ 준비
- [ ] 팀원별 테스트 완료

**이제 모든 플랫폼에서 일관된 개발환경을 제공할 수 있어요! 🚀**
