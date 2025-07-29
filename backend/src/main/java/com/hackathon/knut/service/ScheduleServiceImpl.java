package com.hackathon.knut.service;

import java.util.List;
import com.hackathon.knut.dto.ScheduleDto;      // 일정 DTO(class)
import com.hackathon.knut.entity.Schedule;     // 일정 엔티티(class)
import com.hackathon.knut.repository.ScheduleRepository; // JPA repository
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service // 빈 등록: ScheduleServiceImpl를 서비스 레이어로 사용
public class ScheduleServiceImpl implements ScheduleService {

    // 의존성 필드 선언 및 생성자 주입
    private final ScheduleRepository scheduleRepository;   // 일정 CRUD와 사용자별 조회
    private final AiService aiService;                    // OpenAI AI 분석용 서비스
    private final NotificationService notificationService;// 알림함 저장용 서비스
    private final PushService pushService;                // 푸시 알림 전송용 서비스
    private final MailService mailService;                // 이메일 발송 서비스

    // 생성자에서 의존성(빈) 모두 받아옴 (스프링 DI)
    public ScheduleServiceImpl(
            ScheduleRepository scheduleRepository,
            AiService aiService,
            NotificationService notificationService,
            PushService pushService,
            MailService mailService
    ) {
        this.scheduleRepository = scheduleRepository; // 주입받은 레포지토리 할당
        this.aiService = aiService;                   // 주입받은 OpenAI용 서비스 할당
        this.notificationService = notificationService;
        this.pushService = pushService;
        this.mailService = mailService;
    }

    // 일정 추가 및 AI + 알림 분기
    @Override
    public Schedule addSchedule(ScheduleDto dto) {
        Schedule schedule = new Schedule(); // 빈 엔티티 생성
        schedule.setUserId(dto.getUserId());           // 사용자ID 세팅
        schedule.setTitle(dto.getTitle());             // 제목 세팅
        schedule.setType(dto.getType());               // 종류/분류 세팅
        schedule.setStartTime(dto.getStartTime());     // 시작시간
        schedule.setEndTime(dto.getEndTime());         // 종료시간
        schedule.setPriority(dto.getPriority());       // 중요도
        schedule.setCompleted(false);                  // 초기 완료상태 false

        // (1) OpenAI로 중요도별 알림/조치 분석 요청
        String aiResult = aiService.analyzeByPriority(
                dto.getTitle(), dto.getPriority(), dto.getStartTime().toString()
        );

        // (2) OpenAI 응답에 따라 각종 알림/푸시/메일 등 분기 처리
        switch (aiResult.trim()) {
            case "필요없음":
                // 별도 알림 X (DB에만 저장)
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
                // 예외 또는 예상밖 답변일 때 처리
                break;
        }

        // (3) 일정 DB 저장(영속화)
        return scheduleRepository.save(schedule);
    }

    // 유저별 전체 일정 목록 조회
    @Override
    public List<Schedule> getSchedulesByUserId(Long userId) {
        return scheduleRepository.findByUserId(userId);
    }

    // 일정 완료 표시 (completed = true)
    @Override
    @Transactional
    public void markComplete(Long scheduleId) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new IllegalArgumentException("일정이 존재하지 않습니다. ID=" + scheduleId));
        schedule.setCompleted(true);
    }

    // 일정 중요도(우선순위) 변경
    @Override
    @Transactional
    public void updatePriority(Long scheduleId, int priority) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new IllegalArgumentException("일정이 존재하지 않습니다. ID=" + scheduleId));
        schedule.setPriority(priority);
    }
}
