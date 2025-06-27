# 🚀 Git 워크플로우 가이드

> 웹 개발과 협업이 처음인 팀원들을 위한 단계별 가이드입니다.

## 📋 목차
- [워크플로우란?](#워크플로우란)
- [사전 준비](#사전-준비)
- [워크플로우 5단계](#워크플로우-5단계)
- [실습 예제](#실습-예제)
- [자주 하는 실수와 해결법](#자주-하는-실수와-해결법)
- [유용한 명령어 모음](#유용한-명령어)

---

<a id="워크플로우란"></a>
## 🤔 워크플로우란?

**워크플로우(Workflow)**는 팀이 함께 코드를 개발할 때 따르는 **작업 순서와 규칙**입니다.

### 왜 워크플로우가 필요한가요?

❌ **워크플로우 없이 작업하면:**
- 여러 사람이 같은 파일을 동시에 수정해서 충돌 발생
- 누가 무엇을 작업하는지 모름
- 버그가 생겨도 언제, 누가, 왜 만들었는지 추적 불가
- 코드 품질 관리 어려움

✅ **워크플로우를 사용하면:**
- 체계적이고 안전한 협업 가능
- 모든 변경사항 추적 가능
- 코드 품질 보장
- 문제 발생 시 빠른 해결

---
<a id="사전-준비"></a>
## 🛠 사전 준비

### 1. 필요한 도구 설치
```bash
# Git 설치 확인
git --version

# Git 사용자 정보 설정 (최초 1회만)
git config --global user.name "본인이름"
git config --global user.email "본인이메일@example.com"
```

### 2. GitHub 계정 및 저장소 준비
- GitHub 계정 생성
- 팀 저장소에 초대받기
- 저장소 클론하기
```bash
git clone https://github.com/팀명/프로젝트명.git
cd 프로젝트명
```

### 3. 개발 환경 설정
- 코드 에디터 설치 (VS Code 추천)
- 프로젝트 의존성 설치
```bash
npm install  # 또는 yarn install
```

---
<a id="워크플로우-5단계"></a>
## 🔄 워크플로우 5단계

### 1️⃣ 이슈 생성 또는 할당받기

#### 🎯 목적
작업할 내용을 명확히 정의하고 팀원들과 공유

#### 📝 방법
1. GitHub 저장소 → **Issues** 탭 클릭
2. **New issue** 버튼 클릭
3. 이슈 작성

**이슈 작성 템플릿:**
```markdown
## 📋 작업 내용
사용자 로그인 기능 구현

## 🎯 목표
- 사용자가 이메일과 비밀번호로 로그인할 수 있다
- 로그인 실패 시 적절한 에러 메시지를 표시한다

## ✅ 체크리스트
- [ ] 로그인 폼 UI 구현
- [ ] 로그인 API 연동
- [ ] 에러 처리 구현
- [ ] 테스트 코드 작성

## 📎 참고사항
- 디자인 시안: [링크]
- API 문서: [링크]
```

#### 🏷 라벨 설정
- `feature`: 새로운 기능
- `bug`: 버그 수정
- `enhancement`: 기능 개선
- `documentation`: 문서 작업

---

### 2️⃣ 브랜치 생성

#### 🎯 목적
메인 코드를 건드리지 않고 안전하게 개발하기 위해

#### 📝 방법
```bash
# 1. 메인 브랜치로 이동
git checkout main

# 2. 최신 코드 받아오기
git pull origin main

# 3. 새로운 브랜치 생성 및 이동
git checkout -b feature/user-login
```

#### 🌿 브랜치 명명 규칙
```
feature/기능명     → 새로운 기능 (예: feature/user-login)
bugfix/버그명      → 버그 수정 (예: bugfix/header-layout)
hotfix/긴급수정명  → 긴급 수정 (예: hotfix/security-patch)
docs/문서명        → 문서 작업 (예: docs/readme-update)
```

#### ❗ 주의사항
- 브랜치명은 **영어**로, **소문자**와 **하이픈(-)**만 사용
- 브랜치명만 봐도 어떤 작업인지 알 수 있게 명확하게 작성

---

### 3️⃣ 개발 및 커밋

#### 🎯 목적
작업한 내용을 의미있는 단위로 저장

#### 📝 개발 과정
```bash
# 1. 현재 상태 확인
git status

# 2. 변경된 파일 확인
git diff

# 3. 파일을 스테이징 영역에 추가
git add .                    # 모든 변경사항 추가
git add src/login.js         # 특정 파일만 추가

# 4. 커밋 (변경사항 저장)
git commit -m "커밋 메시지"
```

#### 📝 좋은 커밋 메시지 작성법

**형식:**
```
타입: 간단한 설명

상세 설명 (선택사항)

관련 이슈 번호 (선택사항)
```

**타입 종류:**
- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 스타일 변경 (기능 변경 없음)
- `refactor`: 코드 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 기타 작업

**예시:**
```bash
# 좋은 예
git commit -m "feat: 사용자 로그인 폼 UI 구현

- 이메일, 비밀번호 입력 필드 추가
- 로그인 버튼 스타일링 적용
- 반응형 디자인 구현

Closes #123"

# 나쁜 예
git commit -m "수정"
git commit -m "버그 고침"
git commit -m "작업 완료"
```

#### 🔄 커밋 주기
- **자주 커밋하세요!** (하루에 최소 1-2회)
- **의미있는 단위**로 커밋 (기능 하나 완성될 때마다)
- **작업 끝날 때**는 반드시 커밋

---

### 4️⃣ Pull Request 생성

#### 🎯 목적
내가 작업한 코드를 팀원들이 검토하고 메인 코드에 합치기 위해

#### 📝 방법

**1단계: 원격 저장소에 브랜치 업로드**
```bash
git push origin feature/user-login
```

**2단계: GitHub에서 Pull Request 생성**
1. GitHub 저장소 페이지 접속
2. **Compare & pull request** 버튼 클릭 (또는 **Pull requests** 탭 → **New pull request**)
3. PR 정보 작성

**PR 작성 템플릿:**
```markdown
## 🚀 작업 내용
사용자 로그인 기능 구현

## 📋 변경사항
- 로그인 폼 UI 구현 (src/components/LoginForm.js)
- 로그인 API 연동 (src/api/auth.js)
- 에러 처리 로직 추가
- 로그인 페이지 라우팅 설정

## 🧪 테스트 방법
1. `npm start`로 개발 서버 실행
2. `/login` 페이지 접속
3. 올바른 이메일/비밀번호로 로그인 테스트
4. 잘못된 정보로 로그인 시 에러 메시지 확인

## 📸 스크린샷
[스크린샷 첨부]

## 📎 관련 이슈
Closes #123

## ✅ 체크리스트
- [x] 코드 작성 완료
- [x] 로컬 테스트 완료
- [x] 문서 업데이트 완료
- [ ] 리뷰어 확인 필요
```

**3단계: 리뷰어 지정**
- 팀 리더나 다른 팀원을 리뷰어로 지정
- 라벨 설정 (feature, bug 등)

---

### 5️⃣ 코드 리뷰 후 머지

#### 🎯 목적
코드 품질을 보장하고 팀원들과 지식 공유

#### 👥 리뷰어가 확인할 사항
- [ ] 코드가 요구사항을 만족하는가?
- [ ] 코드 스타일이 일관성 있는가?
- [ ] 버그나 보안 문제는 없는가?
- [ ] 테스트는 충분한가?
- [ ] 문서는 업데이트되었는가?

#### 📝 리뷰 과정

**리뷰어 입장:**
1. PR 페이지에서 **Files changed** 탭 클릭
2. 코드 검토 후 코멘트 작성
3. **Review changes** → **Approve** 또는 **Request changes**

**작성자 입장:**
1. 피드백 받으면 수정 작업
2. 수정 후 다시 커밋 & 푸시
```bash
# 피드백 반영 후
git add .
git commit -m "fix: 리뷰 피드백 반영 - 에러 메시지 개선"
git push origin feature/user-login
```

#### ✅ 머지 과정
1. 모든 리뷰어가 승인
2. **Merge pull request** 버튼 클릭
3. **Confirm merge** 클릭
4. 브랜치 삭제 (**Delete branch** 클릭)

#### 🧹 로컬 정리
```bash
# 메인 브랜치로 이동
git checkout main

# 최신 코드 받아오기
git pull origin main

# 작업했던 브랜치 삭제
git branch -d feature/user-login
```

---
<a id="실습-예제"></a>
## 💡 실습 예제

### 시나리오: "사용자 프로필 페이지" 기능 추가

#### 1단계: 이슈 생성
```markdown
제목: 사용자 프로필 페이지 구현

내용:
## 📋 작업 내용
사용자가 자신의 프로필 정보를 볼 수 있는 페이지 구현

## ✅ 체크리스트
- [ ] 프로필 페이지 컴포넌트 생성
- [ ] 사용자 정보 표시 (이름, 이메일, 가입일)
- [ ] 프로필 편집 버튼 추가
- [ ] 반응형 디자인 적용

라벨: feature
담당자: @본인아이디
```

#### 2단계: 브랜치 생성 및 개발
```bash
# 브랜치 생성
git checkout main
git pull origin main
git checkout -b feature/user-profile-page

# 파일 생성 및 개발
# src/components/ProfilePage.js 생성
# src/pages/Profile.js 생성
# 라우팅 설정 등...

# 커밋
git add .
git commit -m "feat: 사용자 프로필 페이지 기본 구조 구현

- ProfilePage 컴포넌트 생성
- 사용자 정보 표시 기능 추가
- 기본 스타일링 적용

Related to #456"
```

#### 3단계: 추가 개발 및 커밋
```bash
# 더 개발...
git add .
git commit -m "feat: 프로필 페이지 반응형 디자인 적용

- 모바일 화면 대응
- 태블릿 화면 최적화
- CSS Grid 레이아웃 적용"

# 테스트 코드 추가
git add .
git commit -m "test: 프로필 페이지 컴포넌트 테스트 추가"
```

#### 4단계: PR 생성
```bash
git push origin feature/user-profile-page
```

GitHub에서 PR 생성:
```markdown
제목: feat: 사용자 프로필 페이지 구현

## 🚀 작업 내용
사용자 프로필 정보를 표시하는 페이지 구현

## 📋 변경사항
- ProfilePage 컴포넌트 추가
- 프로필 페이지 라우팅 설정
- 반응형 디자인 적용
- 테스트 코드 추가

## 🧪 테스트 방법
1. 로그인 후 헤더의 프로필 메뉴 클릭
2. 프로필 정보가 올바르게 표시되는지 확인
3. 다양한 화면 크기에서 레이아웃 확인

Closes #456
```

#### 5단계: 리뷰 및 머지
- 팀원이 리뷰 후 승인
- 머지 완료
- 브랜치 정리

---
<a id="자주-하는-실수와-해결법"></a>
## ⚠️ 자주 하는 실수와 해결법

### 1. 메인 브랜치에서 직접 작업
```bash
❌ 잘못된 방법:
git checkout main
# 바로 개발 시작...

✅ 올바른 방법:
git checkout main
git pull origin main
git checkout -b feature/새기능명
# 개발 시작
```

### 2. 커밋 메시지를 대충 작성
```bash
❌ 나쁜 예:
git commit -m "수정"
git commit -m "완료"
git commit -m "버그 고침"

✅ 좋은 예:
git commit -m "feat: 로그인 폼 유효성 검사 추가"
git commit -m "fix: 헤더 메뉴 모바일에서 안 보이는 버그 수정"
git commit -m "docs: README에 설치 방법 추가"
```

### 3. 너무 큰 단위로 커밋
```bash
❌ 잘못된 방법:
# 일주일 작업 후 한 번에 커밋
git add .
git commit -m "로그인 기능 완성"

✅ 올바른 방법:
# 의미있는 단위로 자주 커밋
git commit -m "feat: 로그인 폼 UI 구현"
git commit -m "feat: 로그인 API 연동"
git commit -m "feat: 로그인 에러 처리 추가"
git commit -m "test: 로그인 기능 테스트 코드 추가"
```

### 4. 브랜치 이름을 한글로 작성
```bash
❌ 잘못된 방법:
git checkout -b 로그인기능

✅ 올바른 방법:
git checkout -b feature/user-login
```

### 5. Pull Request 설명을 대충 작성
```markdown
❌ 나쁜 예:
제목: 작업 완료
내용: 로그인 기능 만들었습니다.

✅ 좋은 예:
제목: feat: 사용자 로그인 기능 구현
내용: 
- 구현한 기능 상세 설명
- 테스트 방법
- 스크린샷
- 관련 이슈 번호
```

### 6. 충돌(Conflict) 발생 시 당황
```bash
# 충돌 발생 시 해결 방법
git pull origin main  # 최신 코드 받기
# 충돌 파일 수정 (VS Code에서 충돌 부분 확인)
git add .
git commit -m "resolve: 머지 충돌 해결"
```

---
<a id="유용한-명령어"></a>
## 🛠 유용한 명령어 모음

### 기본 명령어
```bash
# 현재 상태 확인
git status

# 변경사항 확인
git diff

# 커밋 히스토리 확인
git log --oneline

# 브랜치 목록 확인
git branch

# 원격 브랜치 확인
git branch -r

# 브랜치 이동
git checkout 브랜치명

# 브랜치 생성 및 이동
git checkout -b 새브랜치명
```

### 실수 복구 명령어
```bash
# 마지막 커밋 메시지 수정
git commit --amend -m "새로운 커밋 메시지"

# 스테이징 취소
git reset HEAD 파일명

# 파일 변경사항 취소
git checkout -- 파일명

# 마지막 커밋 취소 (변경사항은 유지)
git reset --soft HEAD~1

# 브랜치 삭제
git branch -d 브랜치명
```

### 협업 명령어
```bash
# 원격 저장소 최신 코드 받기
git pull origin main

# 원격 저장소에 푸시
git push origin 브랜치명

# 원격 브랜치 추적
git checkout -t origin/브랜치명
```

---

## 🎯 마무리

### 워크플로우 체크리스트
매번 작업할 때 이 체크리스트를 확인하세요!

- [ ] 1. 이슈 생성 또는 할당받기
- [ ] 2. 메인 브랜치에서 최신 코드 받기
- [ ] 3. 새로운 브랜치 생성
- [ ] 4. 개발 작업
- [ ] 5. 의미있는 단위로 커밋
- [ ] 6. 원격 저장소에 푸시
- [ ] 7. Pull Request 생성
- [ ] 8. 리뷰 받고 피드백 반영
- [ ] 9. 머지 후 브랜치 정리

### 💪 연습이 중요해요!
- 처음에는 어색하고 복잡해 보일 수 있지만, 몇 번 반복하면 자연스러워집니다
- 실수해도 괜찮아요! 팀원들과 함께 배워가는 과정입니다
- 모르는 것이 있으면 언제든 팀원들에게 물어보세요

### 🆘 도움이 필요할 때
- **Git 공식 문서**: https://git-scm.com/doc
- **GitHub 가이드**: https://guides.github.com/
