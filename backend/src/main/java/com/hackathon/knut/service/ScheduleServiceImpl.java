package com.hackathon.knut.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

<<<<<<< HEAD
import org.springframework.stereotype.Service;      // 일정 DTO(class)
import org.springframework.transaction.annotation.Transactional;     // 일정 엔티티(class)

import com.hackathon.knut.dto.ScheduleDto; // JPA repository
import com.hackathon.knut.entity.Schedule;
import com.hackathon.knut.repository.ScheduleRepository;
=======
import com.hackathon.knut.dto.ScheduleDto;
import com.hackathon.knut.entity.Schedule;
import com.hackathon.knut.repository.ScheduleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
>>>>>>> 197365609eafdd67a84ccbfb601ae728ab852044

@Service
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final AiService aiService;
    private final NotificationService notificationService;
    private final PushService pushService;
    private final MailService mailService;

    public ScheduleServiceImpl(
            ScheduleRepository scheduleRepository,
            AiService aiService,
            NotificationService notificationService,
            PushService pushService,
            MailService mailService
    ) {
        this.scheduleRepository = scheduleRepository;
        this.aiService = aiService;
        this.notificationService = notificationService;
        this.pushService = pushService;
        this.mailService = mailService;
    }

    @Override
    public Schedule addSchedule(ScheduleDto dto) {
        Schedule schedule = new Schedule();
        schedule.setUserId(dto.getUserId());
        schedule.setTitle(dto.getTitle());
        schedule.setType(dto.getType());
        schedule.setStartTime(dto.getStartTime());
        schedule.setEndTime(dto.getEndTime());
        schedule.setPriority(dto.getPriority());
        schedule.setCompleted(false);

        // (1) OpenAI 분석
        String aiResult = aiService.analyzeByPriority(
                dto.getTitle(), dto.getPriority(), dto.getStartTime().toString()
        );

        // (2) AI 응답에 따라 분기 처리
        switch (aiResult.trim()) {
            case "필요없음":
                break;
            case "가벼운 알림":
                notificationService.saveNotification(schedule, "가벼운 알림 내용");
                break;
            case "일반 알림":
                notificationService.saveNotification(schedule, "일반 알림 내용");
                pushService.sendPush(schedule.getUserId(), "일정 알림", "일반 일정입니다!");
                break;
            case "중요 알림":
            case "긴급 알림":
                notificationService.saveNotification(schedule, aiResult.trim());
                pushService.sendPush(schedule.getUserId(), "⚠️중요 일정", "긴급! 중요한 일정입니다.");
                mailService.sendMail(schedule.getUserId(), "중요/긴급 알림 메일", "일정이 곧 있습니다!");
                break;
            default:
                // AI 응답이 예외적인 경우
                break;
        }

        // (3) 저장
        return scheduleRepository.save(schedule);
    }

    @Override
    public List<Schedule> getSchedulesByUserId(Long userId) {
        return scheduleRepository.findByUserId(userId);
    }

<<<<<<< HEAD
    // 유저별 특정 날짜 일정 목록 조회 (기존 방법)
    @Override
    public List<Schedule> getSchedulesByDate(Long userId, LocalDate date) {
        return scheduleRepository.findByUserIdAndDate(userId, date);
    }

    // 유저별 특정 날짜 범위 일정 목록 조회 (시간대 문제 해결)
    @Override
    public List<Schedule> getSchedulesByDateRange(Long userId, LocalDateTime startOfDay, LocalDateTime endOfDay) {
        return scheduleRepository.findByUserIdAndDateRange(userId, startOfDay, endOfDay);
    }

    // 일정 완료 표시 (completed = true)
=======
>>>>>>> 197365609eafdd67a84ccbfb601ae728ab852044
    @Override
    @Transactional
    public void markComplete(Long scheduleId) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new IllegalArgumentException("일정이 존재하지 않습니다. ID=" + scheduleId));
        schedule.setCompleted(true);
    }

    @Override
    @Transactional
    public void updatePriority(Long scheduleId, int priority) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new IllegalArgumentException("일정이 존재하지 않습니다. ID=" + scheduleId));
        schedule.setPriority(priority);
    }
}