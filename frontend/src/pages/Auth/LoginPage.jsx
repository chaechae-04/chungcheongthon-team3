import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth.js"
import { authService } from "../../services/authService.js"
import "./Auth.css"
import "./LoginPage.css"

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
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

    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("올바른 이메일 형식을 입력해주세요.")
      setIsLoading(false)
      return
    }

    try {
      const data = await authService.login(formData.email, formData.password)
      
      // 로그인 성공 시 AuthContext에 사용자 정보 저장
      login({
        id: data.id,
        username: data.username,
        email: data.email,
        nickname: data.nickname,
        profileImage: data.profileImage,
        authProvider: data.authProvider,
        token: data.token
      })

      // 메인페이지로 리다이렉트
      navigate("/")
    } catch (err) {
      console.error("Login error:", err)
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        setError("서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요.")
      } else {
        setError(err.message || "로그인에 실패했습니다.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="main-wireframe auth-center-layout">
      
      {/* 로그인 폼 카드 */}
      <div className="wire-login-card">
        <h2 className="login-title">로그인</h2>
        <form className="wire-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="email"
            placeholder="이메일을 입력하세요" 
            className="wire-input"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input 
            type="password" 
            name="password"
            placeholder="비밀번호를 입력하세요" 
            className="wire-input"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {error && <div className="error-message">{error}</div>}
          <button 
            type="submit" 
            className="wire-cta"
            disabled={isLoading}
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </button>
        </form>
        
        {/* Google 로그인 버튼 */}
        {/* <button type="button" className="google-login-btn">
          Google 로그인
        </button> */}

        {/* 비밀번호 찾기 링크 */}
        <div className="forgot-password-link">
          <Link to="/forgot-password">비밀번호를 잊으셨나요?</Link>
        </div>

        {/* 구분선 */}
        <div className="divider"></div>
        
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