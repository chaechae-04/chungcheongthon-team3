import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { authService } from "../../services/authService.js"
import "./Auth.css"
import "./SignupPage.css"

function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    username: "",
    nickname: ""
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("올바른 이메일 형식을 입력해주세요.")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("비밀번호는 최소 6자 이상이어야 합니다.")
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.")
      setIsLoading(false)
      return
    }

    if (!formData.username.trim()) {
      setError("사용자명을 입력해주세요.")
      setIsLoading(false)
      return
    }

    try {
      await authService.signup({
        email: formData.email,
        password: formData.password,
        username: formData.username,
        nickname: formData.nickname || formData.username
      })

      // 회원가입 성공 시 로그인 페이지로 이동
      navigate("/login", { 
        state: { message: "회원가입이 완료되었습니다. 로그인해주세요." }
      })
    } catch (err) {
      console.error("Signup error:", err)
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        setError("서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요.")
      } else {
        setError(err.message || "회원가입에 실패했습니다.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="main-wireframe auth-center-layout">
      <div className="wire-logo">SmartCal</div>
      <div className="wire-login-card">
        <h2 className="signup-title">회원가입</h2>
        <form className="wire-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="email"
            placeholder="이메일" 
            className="wire-input"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input 
            type="text" 
            name="username"
            placeholder="사용자명" 
            className="wire-input"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <input 
            type="text" 
            name="nickname"
            placeholder="닉네임 (선택사항)" 
            className="wire-input"
            value={formData.nickname}
            onChange={handleInputChange}
          />
          <input 
            type="password" 
            name="password"
            placeholder="비밀번호" 
            className="wire-input"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <input 
            type="password" 
            name="passwordConfirm"
            placeholder="비밀번호 확인" 
            className="wire-input"
            value={formData.passwordConfirm}
            onChange={handleInputChange}
            required
          />
          {error && <div className="error-message">{error}</div>}
          <button 
            type="submit" 
            className="wire-cta"
            disabled={isLoading}
          >
            {isLoading ? "회원가입 중..." : "회원가입"}
          </button>
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