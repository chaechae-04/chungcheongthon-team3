package com.hackathon.knut.service;

import com.hackathon.knut.entity.Schedule;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    public void saveNotification(Schedule schedule, String content) {
        // 알림함에 알림 저장 (DB저장, 콘솔 로그, 등등)
        System.out.println("알림 저장: " + content);
    }
}