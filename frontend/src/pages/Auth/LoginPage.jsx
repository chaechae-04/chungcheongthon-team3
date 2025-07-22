import React from "react"
import { Link } from "react-router-dom"
import "./Auth.css"
import "./LoginPage.css"

function LoginPage() {
  return (
    <div className="main-wireframe auth-center-layout">
      
      {/* 로그인 폼 카드 */}
      <div className="wire-login-card">
        <h2 className="login-title">로그인</h2>
        <form className="wire-form">
          <input type="email" placeholder="이메일을 입력하세요" className="wire-input" />
          <input type="password" placeholder="비밀번호를 입력하세요" className="wire-input" />
          <button type="submit" className="wire-cta">로그인</button>
        </form>
        
        {/* 비밀번호 찾기 링크 */}
        <div className="forgot-password-link">
          <Link to="/forgot-password">비밀번호를 잊으셨나요?</Link>
        </div>
        
        {/* 구분선 */}
        <div className="divider"></div>
        
        {/* Google 로그인 버튼 */}
        <button type="button" className="google-login-btn">
          Google로 로그인
        </button>
        
        {/* 회원가입 링크 */}
        <div className="signup-link">
          계정이 없으신가요? <Link to="/signup">회원가입</Link>
        </div>
      </div>
      
      {/* 메인으로 돌아가기 */}
      <Link to="/" className="back-to-main">메인으로 돌아가기</Link>
    </div>
  )
}

export default LoginPage 