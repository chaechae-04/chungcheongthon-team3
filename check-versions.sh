#!/bin/bash
echo "🔍 프로젝트 환경 버전 확인"
echo "================================"

echo "📱 시스템 정보:"
echo "OS: $(uname -s) $(uname -r)"
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "macOS: $(sw_vers -productVersion)"
fi

echo ""
echo "☕ Java 환경:"
java -version 2>&1 | head -1
echo "JAVA_HOME: $JAVA_HOME"

echo ""
echo "📦 Node.js 환경:"
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"

echo ""
echo "⚛️ Frontend (React + Vite):"
cd frontend
echo "React: $(cat package.json | grep '"react"' | head -1 | sed 's/.*: "//;s/".*//')"
echo "Vite: $(cat package.json | grep '"vite"' | head -1 | sed 's/.*: "//;s/".*//')"

echo ""
echo "🍃 Backend (Spring Boot):"
cd ../backend
echo "Gradle: $(./gradlew --version | grep 'Gradle' | head -1)"
echo "Spring Boot: $(cat build.gradle | grep 'org.springframework.boot' | sed "s/.*version '//;s/'.*//")"
echo "Java (Project): $(cat build.gradle | grep -A5 'java {' | grep 'languageVersion' | sed 's/.*of(//;s/).*//' || echo 'Not specified')"

echo ""
echo "🐳 Docker 환경:"
if command -v docker &> /dev/null; then
    echo "Docker: $(docker --version)"
else
    echo "Docker: Not installed"
fi

if command -v docker-compose &> /dev/null; then
    echo "Docker Compose: $(docker-compose --version)"
else
    echo "Docker Compose: Not installed"
fi