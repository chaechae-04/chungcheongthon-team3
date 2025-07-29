package com.hackathon.knut.service;

import org.springframework.stereotype.Service;

@Service
public class PushService {
    public void sendPush(Long userId, String title, String message) {
        // 푸시 알림 보내기 (실험에선 콘솔, 실전은 모바일 푸시 연동)
        System.out.println("푸시 [" + userId + "] " + title + ": " + message);
    }
}
