import React from "react"
import { Link } from "react-router-dom"
import "./Auth.css"

function SignupPage() {
  return (
    <div className="main-wireframe" style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <div className="wire-logo" style={{marginBottom: 32, fontSize: '2rem'}}>SmartCal</div>
      <div className="wire-login-card">
        <h2 style={{marginBottom: 24, fontWeight: 700}}>회원가입</h2>
        <form className="wire-form">
          <input type="text" placeholder="아이디" className="wire-input" />
          <input type="password" placeholder="비밀번호" className="wire-input" />
          <input type="password" placeholder="비밀번호 확인" className="wire-input" />
          <button type="submit" className="wire-cta" style={{width: '100%', marginTop: 16}}>회원가입</button>
        </form>
        <div style={{marginTop: 18, textAlign: 'center'}}>
          이미 계정이 있으신가요? <Link to="/login" style={{color: '#2563eb', fontWeight: 600}}>로그인</Link>
        </div>
      </div>
      <Link to="/" style={{marginTop: 32, color: '#888', textDecoration: 'underline'}}>메인으로 돌아가기</Link>
    </div>
  )
}

export default SignupPage 