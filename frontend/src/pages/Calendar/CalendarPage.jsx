import React, { useState, useEffect } from "react"
import "./CalendarPage.css"
import Header from "../../components/layout/Header"
import Footer from "../../components/layout/Footer"
import ScheduleItem from "../../components/ScheduleItem.jsx"
import SchedulePopup from "../../components/SchedulePopup.jsx"
import AddSchedulePopup from "../../components/AddSchedulePopup.jsx"
import { useAuth } from "../../hooks/useAuth"
import { scheduleService } from "../../services/scheduleService"

function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [schedules, setSchedules] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const [showAddPopup, setShowAddPopup] = useState(false)
  const { user } = useAuth()

  // 현재 표시할 년월 계산
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()

  // 해당 월의 첫 번째 날과 마지막 날
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  
  // 첫 번째 날의 요일 (0: 일요일, 1: 월요일, ...)
  const firstDayWeekday = firstDayOfMonth.getDay()
  
  // 해당 월의 총 일수
  const daysInMonth = lastDayOfMonth.getDate()
  
  // 이전 달의 마지막 날들
  const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate()
  
  // 캘린더에 표시할 날짜들 계산
  const generateCalendarDays = () => {
    const days = []
    
    // 이전 달의 날짜들
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        type: 'prev-month',
        date: new Date(currentYear, currentMonth - 1, prevMonthLastDay - i)
      })
    }
    
    // 현재 달의 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        type: 'current-month',
        date: new Date(currentYear, currentMonth, day)
      })
    }
    
    // 다음 달의 날짜들 (총 42개 셀이 되도록)
    const remainingCells = 42 - days.length
    for (let day = 1; day <= remainingCells; day++) {
      days.push({
        day,
        type: 'next-month',
        date: new Date(currentYear, currentMonth + 1, day)
      })
    }
    
    return days
  }

  const calendarDays = generateCalendarDays()
  
  // 주별로 그룹화
  const weeks = []
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7))
  }

  // 선택된 날짜의 일정 조회 (하루를 빼서 계산)
  const fetchSchedulesForDate = async (date) => {
    if (!user || !user.id) {
      console.log('사용자 정보가 없습니다.');
      return;
    }

    setLoading(true);
    try {
      // 하루를 빼서 계산
      const adjustedDate = new Date(date);
      adjustedDate.setDate(date.getDate() + 1);
      const dateString = adjustedDate.toISOString().split('T')[0]; // YYYY-MM-DD 형식
      
      console.log('원본 날짜:', date.toISOString().split('T')[0]);
      console.log('조정된 날짜:', dateString);
      
      const schedulesData = await scheduleService.getSchedulesByDate(user.id, dateString);
      setSchedules(schedulesData);
    } catch (error) {
      console.error('일정 조회 실패:', error);
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  };

  // 날짜 선택 핸들러
  const handleDateClick = (dayData) => {
    setSelectedDate(dayData.date);
    fetchSchedulesForDate(dayData.date);
  }

  // 월 이동 핸들러
  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  // 날짜가 오늘인지 확인
  const isToday = (date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear()
  }

  // 날짜가 선택된 날짜인지 확인
  const isSelected = (date) => {
    return date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear()
  }

  // 한국어 월 이름
  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ]

  // 한국어 요일 이름
  const dayNames = ['일', '월', '화', '수', '목', '금', '토']

  // 컴포넌트 마운트 시 오늘 날짜의 일정 조회
  useEffect(() => {
    if (user && user.id) {
      fetchSchedulesForDate(selectedDate);
    }
  }, [user]);

  // 일정 클릭 핸들러
  const handleScheduleClick = (schedule) => {
    setSelectedSchedule(schedule);
    setShowPopup(true);
  }

  // 팝업 닫기 핸들러
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedSchedule(null);
  }

  // 일정 완료/미완료 변경 핸들러
  const handleCompleteSchedule = async (scheduleId, completed) => {
    try {
      await scheduleService.markComplete(scheduleId, completed, user.id);
      
      // 로컬 상태 업데이트
      setSchedules(prevSchedules => 
        prevSchedules.map(schedule => 
          schedule.id === scheduleId 
            ? { ...schedule, completed: completed }
            : schedule
        )
      );
      
      // 팝업의 일정 정보도 업데이트
      if (selectedSchedule && selectedSchedule.id === scheduleId) {
        setSelectedSchedule(prev => ({ ...prev, completed: completed }));
      }
      
      console.log('일정 완료 상태가 변경되었습니다.');
      alert(completed ? '일정이 완료되었습니다.' : '일정이 미완료로 변경되었습니다.');
      
      // 팝업 닫기
      handleClosePopup();
    } catch (error) {
      console.error('일정 완료 상태 변경 실패:', error);
      alert('일정 완료 상태 변경에 실패했습니다.');
    }
  }

  // 일정 삭제 핸들러
  const handleDeleteSchedule = async (scheduleId) => {
    if (!window.confirm('정말로 이 일정을 삭제하시겠습니까?')) {
      return;
    }

    try {
      await scheduleService.deleteSchedule(scheduleId);
      
      // 로컬 상태에서 삭제
      setSchedules(prevSchedules => 
        prevSchedules.filter(schedule => schedule.id !== scheduleId)
      );
      
      // 팝업 닫기
      handleClosePopup();
      
      console.log('일정이 삭제되었습니다.');
      alert('일정이 삭제되었습니다.');
    } catch (error) {
      console.error('일정 삭제 실패:', error);
      alert('일정 삭제에 실패했습니다.');
    }
  }

  // 일정 중요도 변경 핸들러
  const handleUpdatePriority = async (scheduleId, priority) => {
    try {
      await scheduleService.updatePriority(scheduleId, priority, user.id);
      
      // 로컬 상태 업데이트
      setSchedules(prevSchedules => 
        prevSchedules.map(schedule => 
          schedule.id === scheduleId 
            ? { ...schedule, priority: priority }
            : schedule
        )
      );
      
      // 팝업의 일정 정보도 업데이트
      if (selectedSchedule && selectedSchedule.id === scheduleId) {
        setSelectedSchedule(prev => ({ ...prev, priority: priority }));
      }
      
      console.log('일정 중요도가 변경되었습니다.');
      
      // 우선순위 텍스트 가져오기
      const priorityText = priority === 1 ? '낮음' : priority === 2 ? '보통' : '높음';
      alert(`일정 우선순위가 '${priorityText}'으로 변경되었습니다.`);
      
      // 팝업 닫기
      handleClosePopup();
    } catch (error) {
      console.error('일정 중요도 변경 실패:', error);
      alert('일정 중요도 변경에 실패했습니다.');
    }
  }

  // 일정 추가 핸들러
  const handleAddSchedule = async (scheduleData) => {
    try {
      const newSchedule = await scheduleService.addSchedule(scheduleData);
      
      // 로컬 상태에 새 일정 추가
      setSchedules(prevSchedules => [...prevSchedules, newSchedule]);
      
      console.log('일정이 추가되었습니다.');
      
      // 새 일정의 날짜로 캘린더 포커싱 이동
      const scheduleDate = new Date(newSchedule.startTime);
      setSelectedDate(scheduleDate);
      setCurrentDate(new Date(scheduleDate.getFullYear(), scheduleDate.getMonth(), 1));
      
      // 해당 날짜의 일정을 다시 조회
      await fetchSchedulesForDate(scheduleDate);
      
    } catch (error) {
      console.error('일정 추가 실패:', error);
      throw error;
    }
  }

  // 일정 추가 버튼 클릭 핸들러
  const handleAddButtonClick = () => {
    setShowAddPopup(true);
  }

  // 일정 추가 팝업 닫기 핸들러
  const handleCloseAddPopup = () => {
    setShowAddPopup(false);
  }

  return (
    <div className="page-container calendar-page">
      <Header />
      <main className="page-main calendar-main">
        <div className="calendar-container">
          <div className="calendar-view">
            <div className="monthly-calendar">
              <div className="calendar-header">
                <h2>{currentYear}년 {monthNames[currentMonth]} 
                  <button onClick={goToPrevMonth} className="month-nav-btn">&lt;</button> 
                  <button onClick={goToNextMonth} className="month-nav-btn">&gt;</button>
                </h2>
              </div>
              
              <div className="weekdays-header">
                {dayNames.map((day, index) => (
                  <div key={index} className="weekday">{day}</div>
                ))}
              </div>
              
              <div className="calendar-grid">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="week-row">
                    {week.map((dayData, dayIndex) => (
                      <div
                        key={dayIndex}
                        className={`day ${dayData.type} ${
                          isToday(dayData.date) ? 'today' : ''
                        } ${
                          isSelected(dayData.date) ? 'selected' : ''
                        }`}
                        onClick={() => handleDateClick(dayData)}
                      >
                        {dayData.day}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="weekly-calendar">
              <h3>선택한 주 ({selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일 - {selectedDate.getMonth() + 1}월 {selectedDate.getDate() + 6}일)</h3>
              <div className="weekly-schedule">
                {Array.from({ length: 7 }, (_, i) => {
                  const weekDate = new Date(selectedDate)
                  weekDate.setDate(selectedDate.getDate() - selectedDate.getDay() + i)
                  return (
                    <div 
                      key={i} 
                      className={`week-day ${isSelected(weekDate) ? 'selected' : ''}`}
                      onClick={() => setSelectedDate(weekDate)}
                    >
                      {weekDate.getDate()}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          
          <div className="schedule-view">
            <div className="schedule-header">
              <h2>{selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일 ({dayNames[selectedDate.getDay()]}요일) 일정</h2>
              <button className="add-schedule-btn" onClick={handleAddButtonClick}>+ 일정 추가</button>
            </div>
            
            <div className="schedule-list">
              {loading ? (
                <div className="loading">일정을 불러오는 중...</div>
              ) : schedules.length > 0 ? (
                schedules.map((schedule) => (
                  <ScheduleItem
                    key={schedule.id}
                    title={schedule.title}
                    startTime={schedule.startTime}
                    endTime={schedule.endTime}
                    priority={schedule.priority}
                    completed={schedule.completed}
                    type={schedule.type}
                    onClick={() => handleScheduleClick(schedule)}
                  />
                ))
              ) : (
                <div className="no-schedules">해당 날짜에 일정이 없습니다.</div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* 일정 상세 팝업 */}
      {showPopup && selectedSchedule && (
        <SchedulePopup
          schedule={selectedSchedule}
          onClose={handleClosePopup}
          onComplete={handleCompleteSchedule}
          onDelete={handleDeleteSchedule}
          onUpdatePriority={handleUpdatePriority}
        />
      )}
      
      {/* 일정 추가 팝업 */}
      {showAddPopup && (
        <AddSchedulePopup
          onClose={handleCloseAddPopup}
          onAdd={handleAddSchedule}
          userId={user.id}
          selectedDate={selectedDate}
        />
      )}
    </div>
  )
}

export default CalendarPage 