import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import ApiTest from "./components/test/ApiTest.jsx"
import "./components/test/ApiTest.css"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>🚀 팀3 해커톤 프로젝트</h1>
          <nav className="nav-menu">
            <Link to="/" className="nav-link">
              홈
            </Link>
            <Link to="/api-test" className="nav-link">
              API 테스트
            </Link>
            <Link to="/about" className="nav-link">
              프로젝트 소개
            </Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/api-test" element={<ApiTest />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

// 홈 페이지 컴포넌트
function Home() {
  return (
    <div className="page-container">
      <h2>🏠 메인 페이지</h2>
      <p>교통대학교 충청톤 3팀 프로젝트에 오신 것을 환영합니다!</p>
      <div className="feature-cards">
        <div className="feature-card">
          <h3>🔗 API 연동</h3>
          <p>Frontend와 Backend 연동 테스트</p>
          <Link to="/api-test" className="card-link">
            테스트하기 →
          </Link>
        </div>
        <div className="feature-card">
          <h3>📋 프로젝트 정보</h3>
          <p>해커톤 프로젝트에 대한 상세 정보</p>
          <Link to="/about" className="card-link">
            자세히 보기 →
          </Link>
        </div>
      </div>
    </div>
  )
}

// 프로젝트 소개 페이지
function About() {
  return (
    <div className="page-container">
      <h2>📋 프로젝트 소개</h2>
      <div className="about-content">
        <div className="info-section">
          <h3>🎯 해커톤 정보</h3>
          <ul>
            <li>
              <strong>대회명:</strong> 2025 SW 융합클러스터 2.0 세종 DX 해커톤
            </li>
            <li>
              <strong>팀명:</strong> 교통대학교 3팀
            </li>
            <li>
              <strong>일시:</strong> 8/2(토) 11:00 ~ 20:00
            </li>
            <li>
              <strong>장소:</strong> 홍익대학교 세종 홍익아트홀
            </li>
          </ul>
        </div>

        <div className="info-section">
          <h3>🛠 기술 스택</h3>
          <div className="tech-stack">
            <div className="tech-category">
              <h4>Frontend</h4>
              <span className="tech-tag">React</span>
              <span className="tech-tag">Vite</span>
              <span className="tech-tag">JavaScript</span>
            </div>
            <div className="tech-category">
              <h4>Backend</h4>
              <span className="tech-tag">Java</span>
              <span className="tech-tag">Spring Boot</span>
              <span className="tech-tag">MySQL</span>
            </div>
            <div className="tech-category">
              <h4>DevOps</h4>
              <span className="tech-tag">Docker</span>
              <span className="tech-tag">GitHub</span>
            </div>
          </div>
        </div>

        <div className="info-section">
          <h3>👥 팀원</h3>
          <div className="team-grid">
            <div className="team-member">
              <strong>이영수</strong> - 팀장, Frontend
            </div>
            <div className="team-member">
              <strong>김태연</strong> - Frontend
            </div>
            <div className="team-member">
              <strong>정시연</strong> - Design
            </div>
            <div className="team-member">
              <strong>심건보</strong> - Backend
            </div>
            <div className="team-member">
              <strong>김다빈</strong> - Backend
            </div>
            <div className="team-member">
              <strong>정상원</strong> - Backend
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 404 페이지
function NotFound() {
  return (
    <div className="page-container">
      <h2>🚫 페이지를 찾을 수 없습니다</h2>
      <p>요청하신 페이지가 존재하지 않습니다.</p>
      <Link to="/" className="back-link">
        ← 홈으로 돌아가기
      </Link>
    </div>
  )
}

export default App
