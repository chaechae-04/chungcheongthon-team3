// src/components/RightBox.jsx
import React from 'react';

export default function Right() {
  return (
    <div style={{
      width: '1200px',
      height: '80vh',
      backgroundColor: '#f0f0f0',
      borderRadius: '8px',
      padding: '20px',
      boxSizing: 'border-box',
      marginLeft:'20px',
      marginTop:'-44px',
    }}>
         <p style={{ margin: 0,color:'black',fontWeight:'bold',fontSize:'20px'}}>최근 활동</p>
      <div style={{
        backgroundColor: '#dfe6e9',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        color: '#2d3436',
        fontSize: '16px',
        height: '60px',
        marginTop:"10px",
        marginBottom:"10px"
      }}>
        여기에 새로운 상자 내용 넣기<br />
        두 번째 줄 내용
      </div>
      {/* 새로운 상자2 */}
      <div style={{
        backgroundColor: '#dfe6e9',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        color: '#2d3436',
        fontSize: '16px',
        height: '60px',
        marginBottom:"10px"
      }}>
        여기에 새로운 상자 내용 넣기<br />
        두 번째 줄 내용
      </div>
      {/* 새로운 상자3 */}
      <div style={{
        backgroundColor: '#dfe6e9',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        color: '#2d3436',
        fontSize: '16px',
        height: '60px',
        marginBottom:"10px"
      }}>
        여기에 새로운 상자 내용 넣기<br />
        두 번째 줄 내용
      </div>
      <p style={{ margin: 0,color:'black',fontWeight:'bold',fontSize:'20px',marginBottom:'10px'}}>내 캘린더 요약</p>
      {/* 새로운 상자3 */}
      <div style={{
        backgroundColor: '#dfe6e9',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        color: '#2d3436',
        fontSize: '16px',
        height: '20px',
        width:'200px',
        marginBottom:"10px"
      }}>
      </div>
    </div>
  );
}