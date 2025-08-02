import React, { useState, useEffect } from "react";
import "./NotificationPage.css";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useAuth } from "../../hooks/useAuth";
import { scheduleService } from "../../services/scheduleService";

function NotificationPage() {
  const { user } = useAuth();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({});

  // 일정 목록 조회
  const fetchSchedules = async () => {
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
      setSchedules(allSchedules);
      
    } catch (error) {
      console.error('일정 조회 실패:', error);
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  };

  // 알림 설정 토글
  const toggleNotification = async (scheduleId, currentStatus) => {
    if (!user || !user.id) return;

    try {
      setUpdating(prev => ({ ...prev, [scheduleId]: true }));
      
      // API 호출하여 알림 설정 업데이트
      await scheduleService.updateNotificationSetting(scheduleId, !currentStatus);
      
      // 로컬 상태 업데이트
      setSchedules(prev => prev.map(schedule => 
        schedule.id === scheduleId 
          ? { ...schedule, notificationEnabled: !currentStatus }
          : schedule
      ));
      
    } catch (error) {
      console.error('알림 설정 업데이트 실패:', error);
      alert('알림 설정 변경에 실패했습니다.');
    } finally {
      setUpdating(prev => ({ ...prev, [scheduleId]: false }));
    }
  };

  // 일정 타입별 아이콘 반환
  const getScheduleIcon = (type) => {
    const icons = {
      '업무': '💼',
      '개인': '👤',
      '학습': '📚',
      '건강': '💪',
      'default': '📅'
    };
    return icons[type] || icons.default;
  };

  // 우선순위별 색상 반환
  const getPriorityColor = (priority) => {
    const colors = {
      1: '#4CAF50', // 낮음 - 초록
      2: '#FF9800', // 보통 - 주황
      3: '#F44336'  // 높음 - 빨강
    };
    return colors[priority] || colors[2];
  };

  // 날짜 포맷팅
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 컴포넌트 마운트 시 일정 조회
  useEffect(() => {
    if (user) {
      fetchSchedules();
    }
  }, [user]);

  return (
    <div className="page-container notification-page">
      <Header />
      <main className="page-main notification-main">
        <div className="notification-container">
          <div className="notification-header">
            <h1>알림 설정</h1>
            <p>일정별로 알림을 켜거나 끌 수 있습니다.</p>
          </div>
          
          <div className="notification-content">
            {loading ? (
              <div className="loading-message">일정을 불러오는 중...</div>
            ) : schedules.length === 0 ? (
              <div className="empty-message">
                <div className="empty-icon">📅</div>
                <p>등록된 일정이 없습니다.</p>
                <p>캘린더에서 일정을 추가해보세요!</p>
              </div>
            ) : (
              <div className="schedule-list">
                {schedules.map((schedule) => (
                  <div key={schedule.id} className="schedule-card">
                    <div className="schedule-info">
                      <div className="schedule-icon">
                        {getScheduleIcon(schedule.type)}
                      </div>
                      <div className="schedule-details">
                        <div className="schedule-header">
                          <h3 className="schedule-title">{schedule.title}</h3>
                          <div 
                            className="priority-badge"
                            style={{ backgroundColor: getPriorityColor(schedule.priority) }}
                          >
                            {schedule.priority === 1 ? '낮음' : 
                             schedule.priority === 2 ? '보통' : '높음'}
                          </div>
                        </div>
                        <p className="schedule-type">{schedule.type}</p>
                        <p className="schedule-time">
                          {formatDate(schedule.startTime)} ~ {formatDate(schedule.endTime)}
                        </p>
                        <div className="schedule-status">
                          <span className={`status-badge ${schedule.completed ? 'completed' : 'pending'}`}>
                            {schedule.completed ? '완료' : '미완료'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="notification-control">
                      <div className="toggle-container">
                        <label className="toggle-label">
                          <input
                            type="checkbox"
                            checked={schedule.notificationEnabled}
                            onChange={() => toggleNotification(schedule.id, schedule.notificationEnabled)}
                            disabled={updating[schedule.id]}
                            className="toggle-input"
                          />
                          <span className="toggle-slider"></span>
                        </label>
                        <span className="toggle-text">
                          {schedule.notificationEnabled ? '알림 켜짐' : '알림 꺼짐'}
                        </span>
                      </div>
                      {updating[schedule.id] && (
                        <div className="updating-indicator">업데이트 중...</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="notification-summary">
            <div className="summary-card">
              <h3>알림 설정 요약</h3>
              <div className="summary-stats">
                <div className="summary-item">
                  <span className="summary-label">총 일정</span>
                  <span className="summary-value">{schedules.length}건</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">알림 켜진 일정</span>
                  <span className="summary-value enabled">
                    {schedules.filter(s => s.notificationEnabled).length}건
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">알림 꺼진 일정</span>
                  <span className="summary-value disabled">
                    {schedules.filter(s => !s.notificationEnabled).length}건
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default NotificationPage; 