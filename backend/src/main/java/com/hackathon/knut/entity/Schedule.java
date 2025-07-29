package com.hackathon.knut.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "schedules")
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 일정 고유 ID

    @Column(nullable = false)
    private Long userId; // 일정 소유자 ID

    @Column(nullable = false)
    private String title; // 제목

    @Column(nullable = false)
    private String type; // 유형

    @Column(nullable = false)
    private LocalDateTime startTime; // 시작 시간

    @Column(nullable = false)
    private LocalDateTime endTime; // 종료 시간

    @Column(nullable = false)
    private int priority; // 우선순위

    @Column(nullable = false)
    private boolean completed = false; // 완료 여부
}
