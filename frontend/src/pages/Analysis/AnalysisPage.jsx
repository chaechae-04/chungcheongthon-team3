import React, { useState, useEffect } from "react"
import "../../styles/variables.css"
import "./AnalysisPage.css"
import Header from "../../components/layout/Header"
import Footer from "../../components/layout/Footer"
import { useAuth } from "../../hooks/useAuth"
import { scheduleService } from "../../services/scheduleService"

function AnalysisPage() {
  const { user } = useAuth();
  const [scheduleStats, setScheduleStats] = useState({
    total: 0,
    completed: 0,
    incomplete: 0
  });
  const [aiInsights, setAiInsights] = useState("");
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(true);

  // 일정 통계 계산
  const calculateScheduleStats = async () => {
    if (!user || !user.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // 사용자의 모든 일정 조회 (날짜 범위를 넓게 설정)
      const currentDate = new Date();
      const startDate = new Date(currentDate.getFullYear() - 1, 0, 1); // 1년 전부터
      const endDate = new Date(currentDate.getFullYear() + 1, 11, 31); // 1년 후까지
      
      const startDateString = startDate.toISOString().split('T')[0];
      const endDateString = endDate.toISOString().split('T')[0];
      
      const allSchedules = await scheduleService.getSchedulesByDateRange(user.id, startDateString, endDateString);
      
      // 통계 계산
      const total = allSchedules.length;
      const completed = allSchedules.filter(schedule => schedule.completed).length;
      const incomplete = total - completed;
      
      setScheduleStats({
        total,
        completed,
        incomplete
      });
      
    } catch (error) {
      console.error('일정 통계 조회 실패:', error);
      setScheduleStats({
        total: 0,
        completed: 0,
        incomplete: 0
      });
    } finally {
      setLoading(false);
    }
  };

  // AI 분석 수행
  const performAiAnalysis = async () => {
    if (!user || !user.id) {
      setAiLoading(false);
      return;
    }

    try {
      setAiLoading(true);
      const analysisResult = await scheduleService.getScheduleAnalysis(user.id);
      
      if (analysisResult.aiInsights) {
        setAiInsights(analysisResult.aiInsights);
      } else {
        setAiInsights("AI 분석을 수행할 수 없습니다. 잠시 후 다시 시도해주세요.");
      }
    } catch (error) {
      console.error('AI 분석 실패:', error);
      setAiInsights("AI 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setAiLoading(false);
    }
  };

  // 컴포넌트 마운트 시 통계 계산 및 AI 분석
  useEffect(() => {
    if (user) {
      calculateScheduleStats();
      performAiAnalysis();
    }
  }, [user]);

  // AI 인사이트를 파싱하여 표시용으로 변환
  const parseAiInsights = (insights) => {
    if (!insights) return [];
    
    // 줄바꿈으로 분리하고 숫자로 시작하는 항목들을 찾음
    const lines = insights.split('\n').filter(line => line.trim());
    const insightItems = [];
    
    lines.forEach((line, index) => {
      if (line.match(/^\d+\./)) {
        insightItems.push({
          id: index,
          icon: getInsightIcon(index),
          content: line.replace(/^\d+\.\s*/, '').trim()
        });
      }
    });
    
    return insightItems.length > 0 ? insightItems : [
      { id: 1, icon: "📊", content: insights }
    ];
  };

  // 인사이트 아이콘 매핑
  const getInsightIcon = (index) => {
    const icons = ["📊", "🎯", "💡", "⚡", "🔍"];
    return icons[index] || "💡";
  };

  const insightItems = parseAiInsights(aiInsights);

  return (
    <div className="page-container analysis-page">
      <Header />
      <main className="page-main analysis-main">
        <div className="analysis-container">
          <div className="analysis-header">
            <h1>분석 대시보드</h1>
            <p>일정과 알림의 통계를 한눈에 확인할 수 있습니다.</p>
          </div>
          
          <div className="stats-grid">
            {/* 일정 통계 */}
            <div className="stats-card schedule-stats">
              <h3>일정 통계</h3>
              <div className="stats-items">
                {loading ? (
                  <div className="loading-message">통계를 불러오는 중...</div>
                ) : (
                  <>
                    <div className="stat-item">
                      <span className="stat-label">총 일정 수</span>
                      <span className="stat-value total">{scheduleStats.total}건</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">완료된 일정</span>
                      <span className="stat-value completed">{scheduleStats.completed}건</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">미완료 일정</span>
                      <span className="stat-value incomplete">{scheduleStats.incomplete}건</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* 알림 통계 */}
            {/* <div className="stats-card notification-stats">
              <h3>알림 통계</h3>
              <div className="stats-items">
                <div className="stat-item">
                  <span className="stat-label">총 알림 수</span>
                  <span className="stat-value total">15건</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">읽은 알림</span>
                  <span className="stat-value read">12건</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">안 읽은 알림</span>
                  <span className="stat-value unread">3건</span>
                </div>
              </div>
            </div> */}
          </div>
          
          {/* AI 분석 인사이트 */}
          <div className="ai-insights-section">
            <div className="insights-header">
              <div className="ai-icon">🤖</div>
              <h2>AI 분석 인사이트</h2>
              <p>당신의 일정 패턴을 분석한 결과입니다</p>
            </div>
            
            <div className="insights-grid">
              {aiLoading ? (
                <div className="loading-message" style={{ gridColumn: "1 / -1", textAlign: "center" }}>
                  AI가 일정을 분석하고 있습니다...
                </div>
              ) : insightItems.length > 0 ? (
                insightItems.map((item) => (
                  <div key={item.id} className="insight-card">
                    <div className="insight-icon">{item.icon}</div>
                    <div className="insight-content">
                      <p>{item.content}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="insight-card">
                  <div className="insight-icon">💡</div>
                  <div className="insight-content">
                    <p>AI 분석 결과를 불러올 수 없습니다.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default AnalysisPage 