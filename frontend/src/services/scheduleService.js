const API_BASE_URL = 'http://localhost:8080/api';

export const scheduleService = {
  // 특정 날짜의 일정 조회
  async getSchedulesByDate(userId, date) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/schedules/date?userId=${userId}&date=${date}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (!response.ok) {
        throw new Error('일정 조회에 실패했습니다.');
      }

      return await response.json();
    } catch (error) {
      console.error('일정 조회 오류:', error);
      throw error;
    }
  },

  // 전체 일정 조회
  async getSchedules(userId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/schedules?userId=${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (!response.ok) {
        throw new Error('일정 조회에 실패했습니다.');
      }

      return await response.json();
    } catch (error) {
      console.error('일정 조회 오류:', error);
      throw error;
    }
  },

  // 일정 추가
  async addSchedule(scheduleData) {
    try {
      const response = await fetch(`${API_BASE_URL}/schedules`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scheduleData)
      });

      if (!response.ok) {
        throw new Error('일정 추가에 실패했습니다.');
      }

      return await response.json();
    } catch (error) {
      console.error('일정 추가 오류:', error);
      throw error;
    }
  },

  // 일정 완료 표시
  async markComplete(scheduleId) {
    try {
      const response = await fetch(`${API_BASE_URL}/schedules/${scheduleId}/complete`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('일정 완료 표시에 실패했습니다.');
      }

      return await response.json();
    } catch (error) {
      console.error('일정 완료 표시 오류:', error);
      throw error;
    }
  },

  // 일정 중요도 변경
  async updatePriority(scheduleId, priority) {
    try {
      const response = await fetch(`${API_BASE_URL}/schedules/${scheduleId}/priority`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priority })
      });

      if (!response.ok) {
        throw new Error('일정 중요도 변경에 실패했습니다.');
      }

      return await response.json();
    } catch (error) {
      console.error('일정 중요도 변경 오류:', error);
      throw error;
    }
  }
}; 