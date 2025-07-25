import React from "react"
import { Link } from "react-router-dom"
import "./Auth.css"
import "./SignupPage.css"

function SignupPage() {
  return (
    <div className="main-wireframe auth-center-layout">
      <div className="wire-logo">SmartCal</div>
      <div className="wire-login-card">
        <h2 className="signup-title">회원가입</h2>
        <form className="wire-form">
          <input type="text" placeholder="Email" className="wire-input" />
          <input type="password" placeholder="Password" className="wire-input" />
          <input type="password" placeholder="Password Confirm" className="wire-input" />
          <button type="submit" className="wire-cta">회원가입</button>
        </form>
        <div className="login-link">
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </div>
      </div>
      <Link to="/" className="back-to-main">메인으로 돌아가기</Link>
    </div>
  )
}

export default SignupPage 