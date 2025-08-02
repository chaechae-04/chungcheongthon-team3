package com.hackathon.knut.service;

import com.hackathon.knut.dto.ScheduleDto;
import com.hackathon.knut.entity.Schedule;
import com.hackathon.knut.repository.ScheduleRepository;
import org.springframework.stereotype.Service;

@Service
public class ScheduleAiManagerService {
    private final ScheduleRepository scheduleRepository;
    private final AiService aiService;

    public ScheduleAiManagerService(ScheduleRepository scheduleRepository, AiService aiService) {
        this.scheduleRepository = scheduleRepository;
        this.aiService = aiService;
    }

    public Schedule autoManageSchedule(ScheduleDto dto) {
        // 1. 사용자가 제출한 일정 기반으로 프롬프트 생성
        String prompt = String.format(
            "일정 제목: %s, 중요도: %d, 시작 시간: %s. "
            + "이 일정이 제대로 관리되려면 어떤 알림 시점/관리 방식을 추가하면 좋을까? "
            + "예시) '알림 10분 전', '매주 반복 등록', 혹은 '이 일정은 미루기도 가능하니 우선순위 낮게' 등 자유롭게 한글로 1~2줄 요약으로 답해라.",
            dto.getTitle(), dto.getPriority(), dto.getStartTime().toString()
        );

        // 2. OpenAI로 관리 전략 요청(프롬프트)
        String aiStrategy = aiService.askOpenAI(prompt);

        // 3. AI가 반환한 전략(ex. "알림 30분 전, 매주 반복 등록") 활용해 엔티티 저장/관리
        Schedule schedule = new Schedule();
        schedule.setUserId(dto.getUserId());
        schedule.setTitle(dto.getTitle());
        schedule.setType(dto.getType());
        schedule.setStartTime(dto.getStartTime());
        schedule.setEndTime(dto.getEndTime());
        schedule.setPriority(dto.getPriority());
        schedule.setCompleted(false);
        schedule.setAiStrategy(aiStrategy);  // Schedule 엔티티에 컬럼 추가 필요

        // (실제 활용 예: 알림/반복설정 등 파싱 후 별도 DB저장도 가능)
        // 예: aiStrategy 내용에 "반복" 포함이면 반복설정, "알림 X분 전"이면 알림 타임 지정 등 분기식 구현

        return scheduleRepository.save(schedule);
    }
}
