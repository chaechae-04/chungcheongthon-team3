import React, { useState } from "react"
import "./CalendarPage.css"
import Header from "../../components/layout/Header"
import Footer from "../../components/layout/Footer"

function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

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

  // 날짜 선택 핸들러
  const handleDateClick = (dayData) => {
    setSelectedDate(dayData.date)
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

  return (
    <div className="calendar-page">
      <Header />
      <main className="calendar-main">
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
              <button className="add-schedule-btn">+ 일정 추가</button>
            </div>
            
            <div className="schedule-list">
              <div className="schedule-item high">
                <div className="schedule-title">프로젝트 발표</div>
                <div className="schedule-details">오후 2:00 - 3:00 | 높은 중요도</div>
              </div>
              <div className="schedule-item medium">
                <div className="schedule-title">팀 미팅</div>
                <div className="schedule-details">오후 4:00 - 5:00 | 보통 중요도</div>
              </div>
              <div className="schedule-item low">
                <div className="schedule-title">점심 약속</div>
                <div className="schedule-details">오후 12:00 - 1:00 | 낮은 중요도</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default CalendarPage 