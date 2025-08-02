import React, { useState } from "react";
import "../../styles/variables.css";
import "./NotificationPage.css";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

function NotificationPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "회의 알림",
      description: "매일 오전 9시에 회의 일정을 알려드립니다",
      icon: "📅",
      enabled: true
    },
    {
      id: 2,
      type: "생일 알림",
      description: "친구들의 생일을 하루 전에 알려드립니다",
      icon: "🎂",
      enabled: true
    },
    {
      id: 3,
      type: "데드라인 알림",
      description: "프로젝트 마감일 3일 전에 알려드립니다",
      icon: "⏰",
      enabled: false
    }
  ]);

  // 알림 수정
  const editNotification = (id) => {
    console.log('알림 수정:', id);
    // TODO: 알림 수정 모달 또는 페이지로 이동
  };

  // 알림 삭제
  const deleteNotification = (id) => {
    if (window.confirm('정말로 이 알림을 삭제하시겠습니까?')) {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }
  };

  // 새 알림 추가
  const addNotification = () => {
    console.log('새 알림 추가');
    // TODO: 새 알림 추가 모달 또는 페이지로 이동
  };

  return (
    <div className="page-container notification-page">
      <Header />
      <main className="page-main notification-main">
        <div className="notification-container">
          <div className="notification-header">
            <h1>알림 설정</h1>
            <p>일정 알림을 관리하고 새로운 알림을 추가할 수 있습니다.</p>
          </div>
          
          <div className="notification-content">
            <div className="notification-list">
              {notifications.map((notification) => (
                <div key={notification.id} className="notification-card">
                  <div className="notification-info">
                    <div className="notification-icon">
                      {notification.icon}
                    </div>
                    <div className="notification-details">
                      <h3 className="notification-title">{notification.type}</h3>
                      <p className="notification-description">{notification.description}</p>
                    </div>
                  </div>
                  
                  <div className="notification-actions">
                    <button 
                      className="btn-edit"
                      onClick={() => editNotification(notification.id)}
                    >
                      수정
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="add-notification">
              <button className="btn-add" onClick={addNotification}>
                + 알림 추가
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default NotificationPage; 