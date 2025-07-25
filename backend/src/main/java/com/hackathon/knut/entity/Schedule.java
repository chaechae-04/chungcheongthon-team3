package com.hackathon.knut.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "schedules") // schedules라는 테이블과 매핑됨
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 일정 고유 ID (PK)

    @Column(nullable = false)
    private Long userId; // 일정 소유자(사용자) ID (FK 대용, 실제 User와 @ManyToOne 관계도 가능)

    @Column(nullable = false)
    private String title; // 일정 제목

    @Column(nullable = false)
    private String type; // 일정 유형 (예: "meeting", "task" 등)

    @Column(nullable = false)
    private LocalDateTime startTime; // 일정 시작 시간

    @Column(nullable = false)
    private LocalDateTime endTime; // 일정 종료 시간

    @Column(nullable = false)
    private int priority; // 중요도(우선순위), 예: 1=최고~5=최하

    @Column(nullable = false)
    private boolean completed = false; // 완료 여부 (기본값 false)
}
