import React, { useState } from 'react';
import { AuthContext } from './AuthContext.js';

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setToken(userData.token);
    
    // 토큰을 localStorage에 저장
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setToken(null);
    
    // localStorage에서 토큰과 사용자 정보 제거
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    isLoggedIn,
    user,
    token,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 