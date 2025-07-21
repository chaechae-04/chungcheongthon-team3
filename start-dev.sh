#!/bin/bash
echo "🚀 팀 개발환경 시작..."

# Docker가 실행 중인지 확인
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker가 실행되지 않았습니다. Docker Desktop을 실행해주세요."
    exit 1
fi

echo "🔨 Docker 컨테이너 빌드 및 실행..."
docker compose up --build -d

echo "⏳ 서비스 시작 대기 중..."
sleep 5

echo "✅ 개발환경 준비 완료!"
echo "📱 Frontend: http://localhost:5173"
echo "🖥️  Backend: http://localhost:8080"
echo "🗄️  Database: localhost:3306"
echo ""
echo "📋 로그 확인: docker compose logs -f"
echo "🛑 중지: docker compose down"
