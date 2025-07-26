import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import "../../pages/Main/MainPage.css";
import "./Header.css";

function Header() {
  const { isLoggedIn, user, logout } = useAuth();
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">SmartCal</div>
        <nav className="nav">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>대시보드</Link>
          {isLoggedIn ? (
            <Link to="/calendar" className={location.pathname === "/calendar" ? "active" : ""}>캘린더</Link>
          ) : (
            <span className="nav-disabled">캘린더</span>
          )}
          <a href="#">알림 설정</a>
          <a href="#">분석</a>
        </nav>
        <div className="auth">
          {isLoggedIn ? (
            <div className="header-profile">
              <div className="header-profile-img">{user?.nickname?.[0] || 'U'}</div>
              <span className="header-profile-nickname">{user?.nickname || '사용자'}</span>
              <button onClick={logout} className="logout-btn">로그아웃</button>
            </div>
          ) : (
            <>
              <Link to="/login" className="login">로그인</Link>
              <Link to="/signup" className="signup">회원가입</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header; 