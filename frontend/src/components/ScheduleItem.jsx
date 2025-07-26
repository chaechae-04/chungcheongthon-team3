import React from 'react';
import './ScheduleItem.css';

const ScheduleItem = ({ 
  title, 
  time, 
  priority, 
  onClick, 
  className = '' 
}) => {
  const getPriorityClass = () => {
    switch (priority) {
      case 'high': return 'high';
      case 'medium': return 'medium';
      case 'low': return 'low';
      default: return 'medium';
    }
  };

  const getPriorityText = () => {
    switch (priority) {
      case 'high': return '높은 중요도';
      case 'medium': return '보통 중요도';
      case 'low': return '낮은 중요도';
      default: return '보통 중요도';
    }
  };

  return (
    <div className={`schedule-item ${getPriorityClass()} ${className}`}>
      <button className="schedule-title-btn" onClick={onClick}>
        {title}
      </button>
      <span className="schedule-time">{time}</span>
      <span className={`badge ${getPriorityClass()}`}>
        {getPriorityText()}
      </span>
    </div>
  );
};

export default ScheduleItem; 