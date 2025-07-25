package com.hackathon.knut.service;

import java.util.List;
import java.util.Optional;

import com.hackathon.knut.dto.ScheduleDto;
import com.hackathon.knut.entity.Schedule;
import com.hackathon.knut.repository.ScheduleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service // ScheduleService 빈(서비스 계층 구현체)로 등록
public class ScheduleServiceImpl implements ScheduleService {
    private final ScheduleRepository scheduleRepository; // JPA 레포지토리 의존성 선언

    // Spring이 생성자 주입으로 레포지토리 자동 할당
    public ScheduleServiceImpl(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    @Override
    public Schedule addSchedule(ScheduleDto dto) {
        // ScheduleDto의 정보로 새로운 Schedule 엔티티 객체 생성
        Schedule schedule = new Schedule();
        schedule.setUserId(dto.getUserId()); // 사용자 ID 지정
        schedule.setTitle(dto.getTitle()); // 일정 제목 지정
        schedule.setType(dto.getType()); // 일정 분류(타입) 저장
        schedule.setStartTime(dto.getStartTime()); // 시작 시간 지정
        schedule.setEndTime(dto.getEndTime()); // 종료 시간 지정
        schedule.setPriority(dto.getPriority()); // 중요도(우선순위) 저장
        schedule.setCompleted(false); // 일정 추가 시, 미완료 상태로 초기화
        return scheduleRepository.save(schedule); // DB에 저장 후, 저장된 엔티티 반환
    }

    @Override
    public List<Schedule> getSchedulesByUserId(Long userId) {
        // 레포지토리를 통해 userId별 모든 일정 목록을 조회하여 반환
        return scheduleRepository.findByUserId(userId);
    }

    @Override
    @Transactional // 데이터베이스 트랜잭션 내에서 수행
    public void markComplete(Long scheduleId) {
        // 스케줄 ID로 일정 엔티티를 조회하고 없으면 예외 발생
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new IllegalArgumentException("일정이 존재하지 않습니다. ID=" + scheduleId));
        schedule.setCompleted(true); // 완료 상태 true로 설정
        // JPA의 변경감지(Dirty Checking)로 트랜잭션 종료 시 자동 저장됨
        // 명시적 저장이 필요한 경우 주석 해제
        // scheduleRepository.save(schedule);
    }

    @Override
    @Transactional // 중요도 변경도 트랜잭션 내에서 처리 권장
    public void updatePriority(Long scheduleId, int priority) {
        // scheduleId로 일정 조회, 없으면 예외 발생
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new IllegalArgumentException("일정이 존재하지 않습니다. ID=" + scheduleId));
        schedule.setPriority(priority); // 새로운 중요도 값으로 변경
        // Dirty Checking으로 트랜잭션 끝나면 DB 반영
    }
}
