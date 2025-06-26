# 📝 API 명세서 작성 가이드

## 🎯 API 명세서란?
> Frontend와 Backend가 "어떻게 소통할지" 정한 약속서
>
> 쉽게 말해서: "이런 주소로 이런 데이터를 보내면, 이런 결과를 줄게"라는 약속!

## 📊 API의 기본 구조

### HTTP 메서드
- **GET**: 데이터 조회 (읽기)
- **POST**: 데이터 생성 (쓰기)
- **PUT**: 데이터 수정 (전체 수정)
- **PATCH**: 데이터 부분 수정
- **DELETE**: 데이터 삭제

### URL 구조
```
http://localhost:8080/api/users/123
│                    │   │     │
│                    │   │     └─ 리소스 ID
│                    │   └─ 리소스 타입
│                    └─ API 경로
└─ 서버 주소
```

## 📋 API 명세서 템플릿

### 기본 정보
```
API 이름: [기능명] API
설명: [무엇을 하는 API인지]
Base URL: http://localhost:8080/api
```

### 엔드포인트 정보
```
HTTP 메서드: GET/POST/PUT/DELETE
URL: /api/resource
설명: [이 API가 하는 일]
```

### 요청 (Request)
```
Headers: 
  Content-Type: application/json
  
Parameters: (URL 파라미터)
  - id: 사용자 ID (필수)
  
Body: (POST/PUT일 때)
{
  "name": "홍길동",
  "email": "hong@example.com"
}
```

### 응답 (Response)
```
Status Code: 200 OK

Body:
{
  "success": true,
  "data": {
    "id": 1,
    "name": "홍길동",
    "email": "hong@example.com"
  },
  "message": "성공적으로 조회되었습니다"
}
```

## 🎨 실제 예시: 할일 관리 API

### 1. 할일 목록 조회
```
GET /api/todos

설명: 모든 할일 목록을 조회합니다

요청:
- Headers: 없음
- Parameters: 없음
- Body: 없음

응답:
Status: 200 OK
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "프로젝트 기획하기",
      "completed": false,
      "createdAt": "2024-07-08T10:00:00Z"
    },
    {
      "id": 2,
      "title": "와이어프레임 그리기", 
      "completed": true,
      "createdAt": "2024-07-08T11:00:00Z"
    }
  ],
  "message": "할일 목록을 성공적으로 조회했습니다"
}
```

### 2. 새 할일 추가
```
POST /api/todos

설명: 새로운 할일을 추가합니다

요청:
Headers:
  Content-Type: application/json

Body:
{
  "title": "개발 환경 설정하기",
  "description": "React와 Spring Boot 환경 구축"
}

응답:
Status: 201 Created
{
  "success": true,
  "data": {
    "id": 3,
    "title": "개발 환경 설정하기",
    "description": "React와 Spring Boot 환경 구축",
    "completed": false,
    "createdAt": "2024-07-08T12:00:00Z"
  },
  "message": "할일이 성공적으로 추가되었습니다"
}
```

### 3. 할일 완료 처리
```
PUT /api/todos/{id}

설명: 특정 할일의 완료 상태를 변경합니다

요청:
Parameters:
  - id: 할일 ID (필수)

Headers:
  Content-Type: application/json

Body:
{
  "completed": true
}

응답:
Status: 200 OK
{
  "success": true,
  "data": {
    "id": 1,
    "title": "프로젝트 기획하기",
    "completed": true,
    "updatedAt": "2024-07-08T13:00:00Z"
  },
  "message": "할일 상태가 성공적으로 변경되었습니다"
}
```

### 4. 할일 삭제
```
DELETE /api/todos/{id}

설명: 특정 할일을 삭제합니다

요청:
Parameters:
  - id: 할일 ID (필수)

응답:
Status: 200 OK
{
  "success": true,
  "message": "할일이 성공적으로 삭제되었습니다"
}
```

## 🚨 에러 응답 정의

### 일반적인 에러 형식
```
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "사용자에게 보여줄 메시지"
  }
}
```

### 주요 에러 코드들
```
400 Bad Request - 잘못된 요청
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "필수 필드가 누락되었습니다"
  }
}

404 Not Found - 리소스를 찾을 수 없음
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "해당 할일을 찾을 수 없습니다"
  }
}

500 Internal Server Error - 서버 오류
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "서버에서 오류가 발생했습니다"
  }
}
```

## 📋 API 명세서 작성 체크리스트

### ✅ 기본 정보
- [ ] API 이름과 설명이 명확한가?
- [ ] Base URL이 정확한가?
- [ ] HTTP 메서드가 적절한가?

### ✅ 요청 정보
- [ ] 필수/선택 파라미터가 명시되었나?
- [ ] 요청 데이터 형식이 명확한가?
- [ ] 예시 데이터가 실제와 일치하나?

### ✅ 응답 정보
- [ ] 성공 응답 형식이 일관적인가?
- [ ] 에러 응답이 정의되었나?
- [ ] Status Code가 적절한가?

### ✅ 팀 협업
- [ ] Frontend 팀이 이해할 수 있나?
- [ ] Backend 팀이 구현 가능한가?
- [ ] 모든 필요한 API가 포함되었나?

## 💡 팁

### ✅ API 설계 팁
1. **RESTful 원칙 따르기**: 리소스 중심으로 URL 설계
2. **일관성 유지**: 같은 패턴으로 API 설계
3. **명확한 네이밍**: 누구나 이해할 수 있는 이름 사용
4. **버전 관리**: /api/v1/ 같은 버전 표시

### ✅ 문서 작성 팁
1. **예시 포함**: 실제 사용할 수 있는 예시 데이터
2. **에러 케이스**: 가능한 모든 에러 상황 정의
3. **업데이트**: 개발 중 변경사항 즉시 반영
4. **테스트**: Postman 등으로 실제 테스트

### 🚫 피해야 할 실수들
- 모호한 API 이름 (getData, doSomething)
- 일관성 없는 응답 형식
- 에러 처리 누락
- 실제와 다른 예시 데이터
