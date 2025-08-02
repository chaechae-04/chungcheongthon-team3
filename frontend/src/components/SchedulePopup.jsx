import React, { useState } from 'react';
import './SchedulePopup.css';

function SchedulePopup({ schedule, onClose, onComplete, onDelete, onUpdatePriority }) {
  const [selectedPriority, setSelectedPriority] = useState(schedule.priority);

  if (!schedule) return null;

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const handlePriorityChange = async () => {
    if (onUpdatePriority) {
      await onUpdatePriority(schedule.id, selectedPriority);
    }
  };

  return (
    <div className="schedule-popup-overlay" onClick={onClose}>
      <div className="schedule-popup" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h3>일정 상세</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="popup-content">
          <div className="schedule-info">
            <div className="schedule-title">
              <h4>{schedule.title}</h4>
              <span className={`completed-badge ${schedule.completed ? 'completed' : ''}`}>
                {schedule.completed ? '완료' : '미완료'}
              </span>
            </div>
            
            <div className="schedule-details">
              <div className="detail-item">
                <span className="label">날짜:</span>
                <span>{formatDate(schedule.startTime)}</span>
              </div>
              
              <div className="detail-item">
                <span className="label">시간:</span>
                <span>{formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}</span>
              </div>
              
              <div className="detail-item">
                <span className="label">유형:</span>
                <span>{schedule.type}</span>
              </div>
              
              <div className="detail-item">
                <span className="label">우선순위:</span>
                <div className="priority-control">
                  <select 
                    value={selectedPriority} 
                    onChange={(e) => setSelectedPriority(parseInt(e.target.value))}
                    className="priority-select"
                  >
                    <option value={1}>낮음</option>
                    <option value={2}>보통</option>
                    <option value={3}>높음</option>
                  </select>
                  <button 
                    className="priority-update-btn"
                    onClick={handlePriorityChange}
                  >
                    변경
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="popup-actions">
            <button 
              className={`action-btn ${schedule.completed ? 'uncomplete-btn' : 'complete-btn'}`}
              onClick={() => onComplete(schedule.id, !schedule.completed)}
            >
              {schedule.completed ? '미완료로 변경' : '완료로 변경'}
            </button>
            
            <button 
              className="action-btn delete-btn"
              onClick={() => onDelete(schedule.id)}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchedulePopup; 