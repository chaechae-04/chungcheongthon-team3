import React from "react"
import "./MainPage.css"
import { Link } from "react-router-dom"

function MainPage() {
  return (
    <div className="main-wireframe">
      {/* 상단 네비게이션 */}
      <header className="wire-header">
        <div className="wire-header-inner">
          <div className="wire-logo">SmartCal</div>
          <nav className="wire-nav">
            <a href="#" className="active">대시보드</a>
            <a href="#">캘린더</a>
            <a href="#">알림 설정</a>
            <a href="#">분석</a>
          </nav>
          <div className="wire-auth">
            <Link to="/login" className="wire-login">로그인</Link>
            <Link to="/signup" className="wire-signup">회원가입</Link>
          </div>
        </div>
      </header>
      {/* 메인 헤더 */}
      <section className="wire-main-hero">
        <h1>AI가 분석하는 스마트한 일정 관리</h1>
        <p>당신의 일정을 AI가 분석하여 중요도를 판단하고, 최적의 알림을 제공합니다</p>
        <button className="wire-cta">무료로 시작하기</button>
      </section>
      {/* 핵심 기능 카드 */}
      <section className="wire-feature-cards">
        <div className="wire-feature-card">
          <div className="wire-feature-icon">🧠</div>
          <h3>AI 일정 분석</h3>
          <p>AI가 일정 패턴을 학습하여 중요도를 자동 분석합니다</p>
        </div>
        <div className="wire-feature-card">
          <div className="wire-feature-icon">🔔</div>
          <h3>스마트 알림</h3>
          <p>중요도에 따라 최적의 타이밍에 맞춤형 알림을 제공합니다</p>
        </div>
        <div className="wire-feature-card">
          <div className="wire-feature-icon">📅</div>
          <h3>자동 일정 관리</h3>
          <p>반복 일정과 우선순위를 자동으로 관리합니다</p>
        </div>
      </section>
      {/* 실제 화면 미리보기 */}
      <section className="wire-preview-section">
        <h2>실제 화면 미리보기</h2>
        <div className="wire-preview-grid">
          {/* 오늘의 일정 */}
          <div className="wire-today-schedule">
            <h4>오늘의 일정</h4>
            <button className="wire-add-schedule">+ 일정 추가</button>
            <div className="wire-schedule-list">
              <div className="wire-schedule-item high">프로젝트 발표 <span>오후 2:00 - 3:00</span> <span className="wire-badge high">높은 중요도</span></div>
              <div className="wire-schedule-item medium">팀 미팅 <span>오후 4:00 - 5:00</span> <span className="wire-badge medium">보통 중요도</span></div>
              <div className="wire-schedule-item low">점심 약속 <span>오후 12:00 - 1:00</span> <span className="wire-badge low">낮은 중요도</span></div>
            </div>
          </div>
          {/* AI 인사이트 */}
          <div className="wire-ai-insight">
            <h4>AI 인사이트</h4>
            <div className="wire-insight-box">
              <div>💡 오늘 중요한 일정이 3개 있습니다. 30분 전 알림을 설정했어요.</div>
              <div>⚡ 이번 주 생산성이 <b>15%</b> 향상되었습니다!</div>
            </div>
          </div>
          {/* 알림 설정 */}
          <div className="wire-alarm-settings">
            <h4>알림 설정</h4>
            <div className="wire-toggle-list">
              <div className="wire-toggle-item">
                <span>중요 일정 알림</span>
                <input type="checkbox" checked readOnly />
              </div>
              <div className="wire-toggle-item">
                <span>일일 요약</span>
                <input type="checkbox" readOnly />
              </div>
              <div className="wire-toggle-item">
                <span>주간 리포트</span>
                <input type="checkbox" checked readOnly />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 푸터 */}
      <footer className="wire-footer">
        <div className="wire-footer-logo">SmartCal</div>
        <div className="wire-footer-desc">AI 기반 스마트 일정 관리 서비스</div>
      </footer>
    </div>
  )
}

export default MainPage 