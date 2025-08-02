import React, { useState } from "react";

const ProfilePage = () => {
  // 사용자 기본 정보
  const [userInfo, setUserInfo] = useState({
    name: "닉네임",
    email: "user@email.com",
    intro: "안녕하세요~", // 한줄 소개 추가
  });

  // 수정 모드 여부
  const [isEditing, setIsEditing] = useState(false);

  // 수정 중인 폼 데이터
  const [form, setForm] = useState(userInfo);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 저장 버튼 클릭 시
  const handleSave = () => {
    setUserInfo(form); // 정보 업데이트
    setIsEditing(false); // 수정 종료
  };

  // 취소 버튼 클릭 시
  const handleCancel = () => {
    setForm(userInfo); // 원래 정보로 롤백
    setIsEditing(false); // 수정 종료
  };

  return (
    <div>
      {isEditing ? (
        <>
          {/* 이름 입력 */}
          <div>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="이름"
            />
          </div>

          {/* 이메일 입력 */}
          <div>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="이메일"
            />
          </div>

          {/* 한줄 소개 입력 */}
          <div>
            <input
              type="text"
              name="intro"
              value={form.intro}
              onChange={handleChange}
              placeholder="한줄 소개"
            />
          </div>

          {/* 저장 & 취소 버튼 */}
          <button
            onClick={handleSave}
            style={{
              padding: "6px 12px",
              fontSize: "14px",
              height: "30px",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            저장
          </button>
          <button
            onClick={handleCancel}
            style={{
              marginLeft: "8px",
              padding: "6px 12px",
              fontSize: "14px",
              height: "30px",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            취소
          </button>
        </>
      ) : (
        <>
          {/* 이름, 이메일 표시 */}
          <p
            style={{
              margin: "0",
              color: "black",
              fontWeight: "bold",
              fontSize: "20px",
              marginLeft: "15px",
            }}
          >
            {userInfo.name}
          </p>
          <p style={{ margin: "0", color: "black", marginLeft: "15px" }}>
            {userInfo.email}
          </p>

          {/* 정보수정 버튼 */}
          <div style={{ display: "flex", marginTop: "12px", width: "100%" }}>
            <button
              onClick={() => setIsEditing(true)}
              style={{
                padding: "6px 12px",
                fontSize: "14px",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginLeft: "80px",
              }}
            >
              정보 수정
            </button>
          </div>

          {/* 한줄 소개 표시 (정보수정 버튼 아래에 위치) */}
          <p
            style={{
              margin: "10px 0 0 15px",
              color: "gray",
              fontSize: "14px",
            }}
          >
            <strong>한줄소개 :</strong> {userInfo.intro}
          </p>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
