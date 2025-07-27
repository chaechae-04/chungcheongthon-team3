import React from "react"
import "./MainPage.css"
import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth.js"
import Header from "../../components/layout/Header"
import Footer from "../../components/layout/Footer"
import ScheduleItem from "../../components/ScheduleItem.jsx"

function MainPage() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="page-container mainframe">
      <Header />
      <section className="main-hero">
        <h1>AI가 분석하는 스마트한 일정 관리</h1>
        <p>당신의 일정을 AI가 분석하여 중요도를 판단하고, 최적의 알림을 제공합니다</p>
        {!isLoggedIn && (
          <Link to="/signup">
            <button className="cta">무료로 시작하기</button>
          </Link>
        )}
      </section>
      <section className="feature-cards">
        <div className="feature-card">
          <div className="feature-icon">🧠</div>
          <h3>AI 일정 분석</h3>
          <p>AI가 일정 패턴을 학습하여 중요도를 자동 분석합니다</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔔</div>
          <h3>스마트 알림</h3>
          <p>중요도에 따라 최적의 타이밍에 맞춤형 알림을 제공합니다</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📅</div>
          <h3>자동 일정 관리</h3>
          <p>반복 일정과 우선순위를 자동으로 관리합니다</p>
        </div>
      </section>
      <section className="preview-section">
        <h2>실제 화면 미리보기</h2>
        <div className="preview-grid">
          <div className="today-schedule">
            <h4>오늘의 일정</h4>
            <button className="add-schedule">+ 일정 추가</button>
            <div className="schedule-list">
              <ScheduleItem
                title="프로젝트 발표"
                time="오후 2:00 - 3:00"
                priority="high"
                onClick={() => console.log('View: 프로젝트 발표')}
              />
              <ScheduleItem
                title="팀 미팅"
                time="오후 4:00 - 5:00"
                priority="medium"
                onClick={() => console.log('View: 팀 미팅')}
              />
              <ScheduleItem
                title="점심 약속"
                time="오후 12:00 - 1:00"
                priority="low"
                onClick={() => console.log('View: 점심 약속')}
              />
            </div>
          </div>
          <div className="ai-insight">
            <h4>AI 인사이트</h4>
            <div className="insight-box">
              <div>💡 오늘 중요한 일정이 3개 있습니다. 30분 전 알림을 설정했어요.</div>
              <div>⚡ 이번 주 생산성이 <b>15%</b> 향상되었습니다!</div>
            </div>
          </div>
          <div className="alarm-settings">
            <h4>알림 설정</h4>
            <div className="toggle-list">
              <div className="toggle-item">
                <span>중요 일정 알림</span>
                <input type="checkbox" checked readOnly />
              </div>
              <div className="toggle-item">
                <span>일일 요약</span>
                <input type="checkbox" readOnly />
              </div>
              <div className="toggle-item">
                <span>주간 리포트</span>
                <input type="checkbox" checked readOnly />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default MainPage 