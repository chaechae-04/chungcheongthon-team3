import React, { useState } from 'react';
import './AddSchedulePopup.css';

function AddSchedulePopup({ onClose, onAdd, userId, selectedDate }) {
  const [formData, setFormData] = useState({
    title: '',
    type: '업무',
    date: '',
    startTime: '09:00',
    endTime: '10:00',
    priority: 2
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 에러 메시지 제거
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = '일정 제목을 입력해주세요.';
    }

    if (!formData.date) {
      newErrors.date = '날짜를 선택해주세요.';
    }

    if (!formData.startTime) {
      newErrors.startTime = '시작 시간을 선택해주세요.';
    }

    if (!formData.endTime) {
      newErrors.endTime = '종료 시간을 선택해주세요.';
    }

    if (formData.startTime && formData.endTime) {
      if (formData.startTime >= formData.endTime) {
        newErrors.endTime = '종료 시간은 시작 시간보다 늦어야 합니다.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // 날짜와 시간을 결합하여 ISO 문자열 생성
      const startDateTime = new Date(`${formData.date}T${formData.startTime}`);
      const endDateTime = new Date(`${formData.date}T${formData.endTime}`);

      const scheduleData = {
        userId: userId,
        title: formData.title.trim(),
        type: formData.type,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        priority: parseInt(formData.priority)
      };

      await onAdd(scheduleData);
      onClose();
    } catch (error) {
      console.error('일정 추가 실패:', error);
      alert('일정 추가에 실패했습니다.');
    }
  };

  const getDefaultDate = () => {
    const date = new Date(selectedDate);
    return date.toISOString().split('T')[0];
  };

  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeOptions.push(time);
    }
  }

  return (
    <div className="add-schedule-popup-overlay" onClick={onClose}>
      <div className="add-schedule-popup" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h3>새 일정 추가</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <form className="popup-content" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">일정 제목 *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="일정 제목을 입력하세요"
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="type">유형</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
            >
              <option value="업무">업무</option>
              <option value="회의">회의</option>
              <option value="개인">개인</option>
              <option value="학습">학습</option>
              <option value="기타">기타</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">날짜 *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date || getDefaultDate()}
              onChange={handleInputChange}
              className={errors.date ? 'error' : ''}
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startTime">시작 시간 *</label>
              <select
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                className={errors.startTime ? 'error' : ''}
              >
                {timeOptions.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              {errors.startTime && <span className="error-message">{errors.startTime}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="endTime">종료 시간 *</label>
              <select
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                className={errors.endTime ? 'error' : ''}
              >
                {timeOptions.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              {errors.endTime && <span className="error-message">{errors.endTime}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="priority">우선순위</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
            >
              <option value={1}>낮음</option>
              <option value={2}>보통</option>
              <option value={3}>높음</option>
            </select>
          </div>

          <div className="popup-actions">
            <button type="button" className="action-btn cancel-btn" onClick={onClose}>
              취소
            </button>
            <button type="submit" className="action-btn add-btn">
              일정 추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSchedulePopup; 