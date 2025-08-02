import React from 'react';
import './ScheduleItem.css';

const ScheduleItem = ({ 
  title, 
  startTime, 
  endTime, 
  priority, 
  completed,
  type,
  onClick, 
  className = '' 
}) => {
  const getPriorityClass = () => {
    switch (priority) {
      case 3: return 'high';
      case 2: return 'medium';
      case 1: return 'low';
      default: return 'medium';
    }
  };

  const getPriorityText = () => {
    switch (priority) {
      case 3: return '높은 중요도';
      case 2: return '보통 중요도';
      case 1: return '낮은 중요도';
      default: return '보통 중요도';
    }
  };

  const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatTimeRange = () => {
    const start = formatTime(startTime);
    const end = formatTime(endTime);
    return `${start} - ${end}`;
  };

  return (
    <div className={`schedule-item ${getPriorityClass()} ${className} ${completed ? 'completed' : ''}`}>
      <button className="schedule-title-btn" onClick={onClick}>
        {title}
      </button>
      <span className="schedule-time">{formatTimeRange()}</span>
      <span className="schedule-type">{type}</span>
      <span className={`badge ${getPriorityClass()}`}>
        {getPriorityText()}
      </span>
      {completed && <span className="completed-badge">완료</span>}
    </div>
  );
};

export default ScheduleItem; 