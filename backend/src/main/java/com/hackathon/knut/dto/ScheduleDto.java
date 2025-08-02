package com.hackathon.knut.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ScheduleDto {
    private String title;
    private String type;
    private long userId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int priority;
}
