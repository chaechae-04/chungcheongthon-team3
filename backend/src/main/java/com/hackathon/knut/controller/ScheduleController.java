package com.hackathon.knut.controller;

import com.hackathon.knut.dto.ScheduleDto; // 일정 생성/수정용 DTO 임포트
import com.hackathon.knut.entity.Schedule; // 일정 엔티티 임포트
import com.hackathon.knut.service.ScheduleAiManagerService;
import com.hackathon.knut.service.ScheduleService; // 비즈니스 로직 서비스를 임포트
import org.springframework.http.ResponseEntity; // HTTP 응답 객체 사용
import org.springframework.web.bind.annotation.*;

import java.util.List; // 일정 목록 조회용 컬렉션 임포트

@RestController // REST API 컨트롤러 선언 (JSON 응답)
@RequestMapping("api/schedules") // 모든 엔드포인트가 /schedules로 시작
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"}) // 프론트엔드 두 주소에서 요청 허용
public class ScheduleController {

    private final ScheduleService scheduleService; // 서비스(비즈니스 로직) 의존성 주입
    ScheduleAiManagerService scheduleAiManagerService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService; // 생성자에서 서비스 주입
    }

    // 일정 추가 API
    @PostMapping // POST /schedules
    public ResponseEntity<Schedule> addSchedule(@RequestBody ScheduleDto scheduleDto) {
        Schedule createdSchedule = scheduleService.addSchedule(scheduleDto); // 서비스 호출로 일정 저장
        return ResponseEntity.ok(createdSchedule); // 저장 후 일정 객체 응답
    }

    // 특정 userId의 전체 일정 목록 조회 API
    @GetMapping // GET /schedules?userId={id}
    public ResponseEntity<List<Schedule>> getSchedules(@RequestParam Long userId) {
        List<Schedule> schedules = scheduleService.getSchedulesByUserId(userId); // 서비스 호출해서 유저별 일정목록 반환
        return ResponseEntity.ok(schedules); // 일정 목록을 리스트로 응답
    }

    // 일정 완료 상태로 변경 API
    @PatchMapping("/{scheduleId}/complete") // PATCH /schedules/{scheduleId}/complete
    public ResponseEntity<?> markScheduleComplete(@PathVariable Long scheduleId) {
        scheduleService.markComplete(scheduleId); // 서비스에서 완료 처리
        return ResponseEntity.ok().body("완료 표시됨"); // 완료 메시지 응답
    }

    // 일정의 중요도(priority)만 변경하는 API
    @PatchMapping("/{scheduleId}/priority") // PATCH /schedules/{scheduleId}/priority
    public ResponseEntity<?> updatePriority(@PathVariable Long scheduleId, @RequestBody ScheduleDto scheduleDto) {
        scheduleService.updatePriority(scheduleId, scheduleDto.getPriority()); // 서비스 호출로 중요도 변경
        return ResponseEntity.ok().body("중요도 변경됨"); // 변경 완료 메시지 응답
    }

    @GetMapping("/api/ai/schedule-report")
    public ResponseEntity<String> getScheduleReport(@RequestParam Long userId) {

        String report = scheduleAiManagerService.analyzeUserSchedules(userId);
        return ResponseEntity.ok(report);
    }
}
