FROM node:22.16.0-alpine

WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci

# 소스 코드 복사
COPY . .

# Vite 개발 서버 실행 (Hot Reload 지원)
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
