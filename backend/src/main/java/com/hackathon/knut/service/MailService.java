package com.hackathon.knut.service;

import org.springframework.stereotype.Service;

@Service
public class MailService {
    public void sendMail(Long userId, String subject, String body) {
        // 메일 보내기 (실전은 JavaMailSender 등 이용, 예시에선 콘솔만)
        System.out.println("메일 [" + userId + "] " + subject + ": " + body);
    }
}