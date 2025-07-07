# 🐳 Docker 개발환경 가이드

## 📋 목차
- [목표](#목표)
- [Docker를 왜 쓰나요?](#docker를-왜-쓰나요)
- [Docker 기본 개념](#docker-기본-개념)
- [실행 가이드](#실행-가이드)
- [개발 워크플로우](#개발-워크플로우)
- [문제해결 FAQ](#문제해결-faq)
- [팀장 체크리스트](#팀장-체크리스트)

<a id="목표"></a>
## 🎯 목표
> 팀원 모두가 **5분 안에** 동일한 개발환경을 구축하고 바로 개발을 시작할 수 있도록!
> 
> "내 컴퓨터에서는 잘 되는데?"라는 말을 없애자! 🚫

<a id="docker를-왜-쓰나요"></a>
## 🤔 Docker를 왜 쓰나요?

### ❌ Docker 없이 개발할 때
- **김다빈**: "MySQL 8.0 설치했어요!"
- **김태연**: "어? 저는 MySQL 5.7인데 에러나요..."
- **심건보**: "Node.js 18 버전 써야 하나요? 16 버전 쓰고 있는데..."
- **이영수**: "제 컴퓨터에서는 안 돌아가요 ㅠㅠ"

### ✅ Docker로 개발할 때
- **모든 팀원**: `./start-dev.sh` 실행 (PowerShell/CMD → `start-dev.bat`) → **동일한 환경에서 개발!** 🎉

### 🚀 Docker의 장점
1. **환경 통일**: 모든 팀원이 똑같은 개발환경
2. **빠른 설정**: MySQL, Node.js 등 개별 설치 불필요
3. **격리**: 내 컴퓨터 환경을 건드리지 않음
4. **배포 용이**: 개발환경 = 운영환경

<a id="docker-기본-개념"></a>
## 📚 Docker 기본 개념

### 🏠 컨테이너 = 격리된 방
> 각각의 서비스(Frontend, Backend, Database)가 독립된 방에서 실행

```
🏢 우리 컴퓨터
├── 🏠 Frontend 컨테이너 (React + Vite)
├── 🏠 Backend 컨테이너 (Spring Boot)  
└── 🏠 Database 컨테이너 (MySQL)
```

### 📋 주요 파일들
- **docker-compose.yml**: 전체 서비스 설정 파일
- **Dockerfile**: 각 서비스별 환경 설정
- **start-dev.sh**: 원클릭 실행 스크립트

<a id="실행-가이드"></a>
## 🚀 실행 가이드

### 📋 사전 준비 (모든 OS 공통)
1. **Docker Desktop 설치** 
   - [Docker 공식 사이트](https://www.docker.com/products/docker-desktop/)에서 다운로드
   - 설치 후 Docker Desktop 실행 (백그라운드에서 실행되어야 함)

2. **Git 설치**

### 👑 팀장용 환경설정

#### 1단계: 프로젝트 클론
```bash
git clone https://github.com/chaechae-04/chungcheongthon-team3.git
cd chungcheongton-team3
```

#### 2단계: Docker 파일 확인

> #### 필요한 파일들이 있는지 확인
```bash
ls -la docker-compose.yml
ls -la start-dev.sh
ls -la frontend/Dockerfile
ls -la backend/Dockerfile
```

#### 3단계: 실행 권한 부여 (Mac/Linux만)
```bash
chmod +x start-dev.sh
```

#### 4단계: 개발환경 실행
```bash
./start-dev.sh
```

### 🪟 Windows 사용자 가이드

#### Git Bash 사용 (권장)
> #### 1. Git Bash 열기
> #### 2. 프로젝트 폴더로 이동
> #### 3. 실행
```bash
cd /c/Users/[사용자명]/Desktop/chungcheongthon-team3
./start-dev.sh
```

#### PowerShell/CMD 사용
> #### 1. PowerShell 또는 CMD 열기
> #### 2. 프로젝트 폴더로 이동
> #### 3. 실행
```cmd
cd C:\Users\[사용자명]\Desktop\chungcheongthon-team3
start-dev.bat
```

### 🍎 Mac/Linux 사용자 가이드

#### Terminal 사용
> #### 1. Terminal 열기
> #### 2. 프로젝트 폴더로 이동
> #### 3. 실행 권한 부여 (최초 1회만)
> #### 4. 실행
```bash
cd ~/Desktop/chungcheongthon-team3
chmod +x start-dev.sh
./start-dev.sh
```

### ✅ 실행 성공 확인
실행 후 이런 메시지가 나오면 성공! 🎉
```
✅ 개발환경 준비 완료!
📱 Frontend: http://localhost:5173
🖥️  Backend: http://localhost:8080
🗄️  Database: localhost:3306
```

<a id="개발-워크플로우"></a>
## 💻 개발 워크플로우

### 📅 매일 개발 시작할 때
> #### 1. 최신 코드 받기
> #### 2. Docker 환경 실행
> #### 3. 브라우저에서 확인
```bash
git pull

./start-dev.sh

# Frontend: http://localhost:5173
# Backend: http://localhost:8080
```

### 🔄 개발 중
- **코드 수정**: 평소처럼 VSCode/IntelliJ에서 수정
- **자동 반영**: 저장하면 자동으로 컨테이너에 반영됨
- **로그 확인**: `docker compose logs -f`

### 🛑 개발 종료할 때
> #### Docker 환경 종료
```bash
docker compose down
```

### 📊 유용한 명령어들
> #### 컨테이너 상태 확인
```bash
docker compose ps
```
> #### 로그 실시간 확인
```bash
docker compose logs -f
```
> #### 특정 서비스 로그만 확인
```bash
docker compose logs frontend
docker compose logs backend
docker compose logs database
```
> #### 컨테이너 재시작
```bash
docker compose restart
```
> #### 완전히 새로 빌드
```bash
docker compose up -d --build
```

<a id="문제해결-faq"></a>
## 🆘 문제해결 FAQ

### ❓ "Docker가 실행되지 않습니다"
**증상**: `docker info` 명령어가 에러
**해결책**: 
1. Docker Desktop이 실행되고 있는지 확인
2. Docker Desktop 재시작
3. 컴퓨터 재부팅

### ❓ "포트가 이미 사용 중입니다"
**증상**: `port 3306 already in use` 에러
**해결책**:
```bash
# 사용 중인 포트 확인
lsof -i :3306  # Mac/Linux
netstat -ano | findstr :3306  # Windows

# 기존 MySQL 서비스 종료 후 재실행
```

### ❓ "빌드가 실패합니다"
**증상**: `failed to solve` 에러
**해결책**:
```bash
# 1. 기존 컨테이너 정리
docker compose down
docker system prune -f

# 2. 새로 빌드
docker compose up -d --build
```

### ❓ "Frontend가 접속되지 않습니다"
**증상**: `http://localhost:5173` 접속 안됨
**해결책**:
1. `docker compose ps`로 컨테이너 상태 확인
2. `docker compose logs frontend`로 에러 확인
3. `package.json` 파일 존재 여부 확인

### ❓ "Backend가 접속되지 않습니다"
**증상**: `http://localhost:8080` 접속 안됨
**해결책**:
1. `docker compose logs backend`로 에러 확인
2. Java 버전 확인 (Dockerfile에서 Java 21 사용)
3. `build.gradle` 파일 존재 여부 확인

### ❓ "Database 연결이 안됩니다"
**증상**: Backend에서 DB 연결 에러
**해결책**:
```bash
# 1. MySQL 컨테이너 상태 확인
docker compose logs database

# 2. 데이터베이스 접속 테스트
docker exec -it [컨테이너명] mysql -u root -p
# 비밀번호: password123
```

### ❓ "변경사항이 반영되지 않습니다"
**해결책**:
```bash
# 1. 컨테이너 재시작
docker compose restart

# 2. 캐시 무시하고 새로 빌드
docker compose up -d --build --no-cache
```

<a id="팀장-체크리스트"></a>
## 👑 팀장 체크리스트

### 🔧 환경 설정 전 체크
- [ ] 모든 팀원이 Docker Desktop 설치 완료
- [ ] Git 저장소에 필요한 파일들 업로드 완료
  - [ ] docker-compose.yml
  - [ ] start-dev.sh / start-dev.bat
  - [ ] frontend/Dockerfile
  - [ ] backend/Dockerfile
  - [ ] database/init.sql
- [ ] README.md에 Docker 실행 가이드 추가

### 👥 팀원 온보딩 체크
각 팀원별로 확인:
- [ ] **이영수**: Docker 환경 실행 성공
- [ ] **김태연**: Docker 환경 실행 성공  
- [ ] **정시연**: Docker 환경 실행 성공
- [ ] **심건보**: Docker 환경 실행 성공
- [ ] **김다빈**: Docker 환경 실행 성공
- [ ] **정상원**: Docker 환경 실행 성공

### 🚨 문제 발생 시 대응
1. **즉시 해결**: 간단한 명령어 문제
2. **팀 공유**: 공통 문제는 단체방에 해결책 공유
3. **문서 업데이트**: 새로운 문제는 이 가이드에 추가

### 📊 일일 체크 (개발 기간 중)
- [ ] 모든 팀원의 개발환경 정상 작동 확인
- [ ] 새로운 환경변수나 설정 변경사항 공유
- [ ] Docker 관련 문제 발생 시 즉시 해결

### 🔄 주기적 관리
- [ ] **주 1회**: `docker system prune`으로 불필요한 이미지 정리
- [ ] **배포 전**: 모든 서비스 정상 작동 확인
- [ ] **문제 발생 시**: FAQ 섹션 업데이트

---

## 💡 추가 팁

### 🎯 개발 효율성 높이기
1. **별칭 설정**: 자주 쓰는 명령어는 별칭으로 등록
```bash
# ~/.bashrc 또는 ~/.zshrc에 추가
alias dcu="docker compose up -d"
alias dcd="docker compose down"  
alias dcl="docker compose logs -f"
```

2. **VSCode Docker 확장**: Docker 컨테이너를 VSCode에서 직접 관리

3. **데이터베이스 GUI 도구**: 
   - **MySQL Workbench**: GUI로 데이터베이스 관리
   - **DBeaver**: 무료 데이터베이스 클라이언트

### 🔒 보안 주의사항
- **비밀번호 변경**: `docker-compose.yml`의 기본 비밀번호 변경
- **포트 노출**: 필요한 포트만 외부에 노출
- **환경변수**: 민감한 정보는 `.env` 파일 사용

### 📈 성능 최적화
- **볼륨 사용**: 데이터 영속성을 위한 볼륨 설정
- **멀티스테이지 빌드**: Docker 이미지 크기 최적화
- **캐시 활용**: 빌드 시간 단축을 위한 레이어 캐싱
