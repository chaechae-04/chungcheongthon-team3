package com.hackathon.knut.service;

import com.hackathon.knut.dto.FriendAddRequest;
import com.hackathon.knut.entity.FriendRelation;
import com.hackathon.knut.entity.User;
import com.hackathon.knut.repository.FriendRepository;
import com.hackathon.knut.repository.UserRepository;
import org.springframework.stereotype.Service;

import com.hackathon.knut.dto.FriendAddRequest;
import com.hackathon.knut.entity.FriendRelation;
import com.hackathon.knut.entity.User;
import com.hackathon.knut.repository.FriendRepository;
import com.hackathon.knut.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class FriendService {

    private final UserRepository userRepository;
    private final FriendRepository friendRepository;

    public FriendService(UserRepository userRepository, FriendRepository friendRepository) {
        this.userRepository = userRepository;
        this.friendRepository = friendRepository;
    }

    public void addFriend(FriendAddRequest request) {
        // 유저 정보 조회
        User me = userRepository.findByUsername(request.getMyUsername())
                .orElseThrow(() -> new RuntimeException("내 계정 없음"));

        User friend = userRepository.findByUsername(request.getFriendUsername())
                .orElseThrow(() -> new RuntimeException("친구 계정 없음"));

        // 이미 친구인지 확인
        if (friendRepository.existsByUserAndFriend(me, friend)) {
            throw new RuntimeException("이미 친구입니다.");
        }

        // 친구 관계 저장
        FriendRelation relation = new FriendRelation(me, friend);
        friendRepository.save(relation);
    }
}