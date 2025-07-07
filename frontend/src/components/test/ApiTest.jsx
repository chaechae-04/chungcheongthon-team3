"use client"

import { useState } from "react"

const ApiTest = () => {
  const [apiData, setApiData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleTestClick = async () => {
    setLoading(true)
    setError(null)

    try {
      const apiUrl = "http://localhost:8080"
      console.log(`🚀 API 호출: ${apiUrl}/api/test`)

      const response = await fetch(`${apiUrl}/api/test`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // CORS 설정 단순화
        mode: "cors",
      })

      console.log("📡 응답 상태:", response.status)
      console.log("📡 응답 헤더:", [...response.headers.entries()])

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("📦 받은 데이터:", data)
      setApiData(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      setError(errorMessage)
      console.error("🚨 API 호출 에러:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="test-container">
      {/* 디버깅 정보 */}
      <div className="api-response">
        <p>
          <strong>테스트 URL:</strong> http://localhost:8080/api/test
        </p>
        <p>
          <strong>브라우저에서 직접 테스트:</strong>
          <a href="http://localhost:8080/api/test" target="_blank" rel="noreferrer">
            여기 클릭
          </a>
        </p>
      </div>

      {apiData && (
        <div className="api-response">
          <h3>🎉 API 응답 데이터:</h3>
          <div className="response-content">
            <p>
              <strong>Message:</strong> {apiData.message}
            </p>
            <p>
              <strong>Redirect:</strong> {apiData.redirect}
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>❌ 에러: {error}</p>
        </div>
      )}

      <button onClick={handleTestClick} disabled={loading} className="test-button">
        {loading ? "로딩 중..." : "TEST"}
      </button>
    </div>
  )
}

export default ApiTest
