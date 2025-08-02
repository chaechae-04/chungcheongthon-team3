const API_BASE_URL = 'http://localhost:8080/api';

export const authService = {
  // 로그인
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `로그인에 실패했습니다. (${response.status})`);
      }

      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // 회원가입
  async signup(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `회원가입에 실패했습니다. (${response.status})`);
      }

      return await response.json();
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  // 사용자 정보 조회
  async getCurrentUser() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('토큰이 없습니다.');
      }

      const response = await fetch(`${API_BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('사용자 정보 조회에 실패했습니다.');
      }

      return await response.json();
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },

  // 이메일 중복 확인
  async checkEmail(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/check-email?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('이메일 확인에 실패했습니다.');
      }

      return await response.json();
    } catch (error) {
      console.error('Check email error:', error);
      throw error;
    }
  }
}; 