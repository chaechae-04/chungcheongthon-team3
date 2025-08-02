import React, { useState, useEffect } from "react"
import "./MainPage.css"
import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth.js"
import Header from "../../components/layout/Header"
import Footer from "../../components/layout/Footer"
import ScheduleItem from "../../components/ScheduleItem.jsx"
import { scheduleService } from "../../services/scheduleService"

function MainPage() {
  const { isLoggedIn, user } = useAuth();
  const [todaySchedules, setTodaySchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState("");

  // 오늘의 일정 조회
  const fetchTodaySchedules = async () => {
    if (!isLoggedIn || !user || !user.id) {
      return;
    }

    setLoading(true);
    try {
      const today = new Date();
      const dateString = today.toISOString().split('T')[0]; // YYYY-MM-DD 형식
      
      const schedules = await scheduleService.getSchedulesByDate(user.id, dateString);
      setTodaySchedules(schedules);
      
      // AI 인사이트 생성
      generateAiInsights(schedules);
    } catch (error) {
      console.error('오늘의 일정 조회 실패:', error);
      setTodaySchedules([]);
      setAiInsights("일정을 불러올 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  // AI 인사이트 생성
  const generateAiInsights = (schedules) => {
    if (!schedules || schedules.length === 0) {
      setAiInsights("오늘 일정이 없습니다. 새로운 일정을 추가해보세요!");
      return;
    }

    const totalSchedules = schedules.length;
    const completedSchedules = schedules.filter(schedule => schedule.completed).length;
    const completionRate = totalSchedules > 0 ? Math.round((completedSchedules / totalSchedules) * 100) : 0;
    
    // 우선순위별 일정 개수
    const highPriority = schedules.filter(s => s.priority === 3).length;

    let insights = [];
    
    // 완료율 기반 인사이트
    if (completionRate >= 80) {
      insights.push("오늘 일정 완료율이 높습니다! 훌륭한 하루를 보내고 계시네요.");
    } else if (completionRate >= 50) {
      insights.push("일정을 차근차근 진행하고 계시네요. 남은 일정도 화이팅!");
    } else {
      insights.push("아직 완료하지 않은 일정이 많습니다. 우선순위를 정해서 처리해보세요.");
    }

    // 우선순위 기반 인사이트
    if (highPriority > 0) {
      insights.push(`중요한 일정이 ${highPriority}개 있습니다. 이 일정들을 우선적으로 처리하세요.`);
    }

    // 시간대 기반 인사이트 (간단한 버전)
    const now = new Date();
    const currentHour = now.getHours();
    const upcomingSchedules = schedules.filter(s => {
      const scheduleTime = new Date(s.startTime);
      return scheduleTime.getHours() > currentHour && !s.completed;
    });

    if (upcomingSchedules.length > 0) {
      insights.push(`앞으로 ${upcomingSchedules.length}개의 일정이 남아있습니다.`);
    }

    setAiInsights(insights.join(" "));
  };

  // 컴포넌트 마운트 시 오늘의 일정 조회
  useEffect(() => {
    if (isLoggedIn && user) {
      fetchTodaySchedules();
    }
  }, [isLoggedIn, user]);

  // 기본 예시 일정 (로그인하지 않았거나 일정이 없을 때)
  const defaultSchedules = [
    {
      id: 'demo1',
      title: "프로젝트 발표",
      startTime: "2024-01-01T14:00:00",
      endTime: "2024-01-01T15:00:00",
      priority: 3,
      type: "업무"
    },
    {
      id: 'demo2',
      title: "팀 미팅",
      startTime: "2024-01-01T16:00:00",
      endTime: "2024-01-01T17:00:00",
      priority: 2,
      type: "회의"
    },
    {
      id: 'demo3',
      title: "점심 약속",
      startTime: "2024-01-01T12:00:00",
      endTime: "2024-01-01T13:00:00",
      priority: 1,
      type: "개인"
    }
  ];

  // 표시할 일정 결정
  const displaySchedules = isLoggedIn && user ? todaySchedules : defaultSchedules;

  // AI 인사이트 결정
  const displayAiInsights = isLoggedIn && user ? aiInsights : "로그인하면 실제 일정 분석을 받을 수 있어요.";

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
            <div className="schedule-list">
              {loading ? (
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-sub)' }}>
                  일정을 불러오는 중...
                </div>
              ) : displaySchedules.length > 0 ? (
                displaySchedules.map((schedule) => (
                  <ScheduleItem
                    key={schedule.id}
                    title={schedule.title}
                    startTime={schedule.startTime}
                    endTime={schedule.endTime}
                    priority={schedule.priority}
                    completed={schedule.completed}
                    type={schedule.type}
                  />
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-sub)' }}>
                  오늘 일정이 없습니다.
                </div>
              )}
            </div>
          </div>
          <div className="ai-insight">
            <h4>AI 인사이트</h4>
            <div className="insight-box">
              <div>💡 {displayAiInsights}</div>
              {isLoggedIn && user && todaySchedules.length > 0 && (
                <div>⚡ 이번 주 생산성이 <b>15%</b> 향상되었습니다!</div>
              )}
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