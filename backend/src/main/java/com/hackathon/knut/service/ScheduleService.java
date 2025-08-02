package com.hackathon.knut.service;

import com.hackathon.knut.dto.ScheduleDto;
import com.hackathon.knut.entity.Schedule;
import java.util.List;

public interface ScheduleService {

    /**
     * 새로운 일정을 추가한다.
     * @param dto 일정 등록에 필요한 정보(DTO)
     * @return 생성된 Schedule 엔티티 객체
     */
    Schedule addSchedule(ScheduleDto dto);

    /**
     * 특정 사용자(userId)의 전체 일정 목록을 조회한다.
     * @param userId 사용자 ID
     * @return 사용자의 Schedule 목록
     */
    List<Schedule> getSchedulesByUserId(Long userId);

    /**
     * 특정 일정(scheduleId)을 완료(completed=true) 상태로 변경한다.
     * @param scheduleId 완료로 표시할 일정의 ID
     */
    void markComplete(Long scheduleId);

    /**
     * 특정 일정(scheduleId)의 중요도(priority)를 수정한다.
     * @param scheduleId 수정할 일정 ID
     * @param priority 새로 설정할 중요도 값
     */
    void updatePriority(Long scheduleId, int priority);
}
