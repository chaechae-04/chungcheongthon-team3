import React from 'react';
import ProfilePage from "./ProfilePage";

export default function Left() {
  // 기본 프로필 이미지 설정
  const profileImg = "https://via.placeholder.com/100x100?text=Profile";

  return (
    <div
      style={{
        width: '350px',
        height: '60vh',
        backgroundColor: '#f0f0f0',
        padding: '20px',
        boxSizing: 'border-box',
        borderRight: '1px solid #ccc',
        marginLeft: '70px',
        marginTop: '85px',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column', // 세로 정렬
        gap: '20px', // 상자들 간 간격
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
        <img
          src={profileImg}
          alt="프로필 사진"
          style={{
            width: 100,
            height: 100,
            borderRadius: '50px',
            objectFit: 'cover',
            marginTop: '16px',
            display: 'block',
          }}
        />
        <div style={{ paddingTop: '50px' }}>
          <ProfilePage />
        </div>
      </div>

      {/* 새로운 상자 추가 */}
      <div
        style={{
          backgroundColor: '#dfe6e9',
          padding: '15px',
          borderRadius: '8px',
          color: '#2d3436',
          textAlign: 'center',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          flexShrink: 0,
          width:'200px',      
          height:'50px', 
          marginTop:"60px",
          marginLeft:"40px"
        }}
      >
        다가오는 일정 : 2건<br />
        완료한 일정 : 12건
      </div>
       <div
        style={{
          backgroundColor: '#dfe6e9',
          padding: '15px',
          borderRadius: '8px',
          color: '#2d3436',
          textAlign: 'center',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          flexShrink: 0,
          width:'200px',      
          height:'10px', 
          marginTop:"-10px",
          marginLeft:"40px"
        }}
        >
        </div>
    </div>
  );
}