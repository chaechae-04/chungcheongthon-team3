package com.hackathon.knut.repository;

import com.hackathon.knut.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    // 특정 유저의 일정 전체 조회
    List<Schedule> findByUserId(Long userId);
}