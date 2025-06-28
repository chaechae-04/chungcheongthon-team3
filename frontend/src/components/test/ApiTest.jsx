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
            // Docker 환경에서는 VITE_API_URL 환경변수 사용하기
            const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080"
            const response = await fetch(`${apiUrl}/api/test`)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            setApiData(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknow error occurred")
            console.error("API 호출 에러", err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="test-container">
            {apiData && (
                <div className="api-response">
                    <h3>API 응답 데이터: </h3>
                    <div className="response-content">
                        <p>
                            <strong>Message:</strong>
                            {apiData.message}
                        </p>
                        <p>
                            <strong>Redirect:</strong>
                            {apiData.redirect}
                        </p>
                    </div>
                </div>
            )}

            {/* 에러 메시지 표시 */}
            {error && (
                <div className="error-message">
                    <p>Error: {error}</p>
                </div>
            )}

            {/* Test 버튼 */}
            <button onClick={handleTestClick} disabled={loading} className="test-button">
                {loading ? "로딩 중..." : "Test"}
            </button>
        </div>
    )
}

export default ApiTest