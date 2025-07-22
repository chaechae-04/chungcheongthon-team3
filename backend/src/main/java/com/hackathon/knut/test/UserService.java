package com.hackathon.knut.test;

import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //유저 조회
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    //유저 삭제
    public boolean deleteUserById(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    //프로필 부분 수정
    public Optional<User> updateUserPartial(Long userId, Map<String, Object> updates) {
        return userRepository.findById(userId).map(user -> {
            if (updates.containsKey("username")) {
                String newUsername = (String) updates.get("username");
                // 필요 시 중복 체크 및 검증 추가
                user.setUsername(newUsername);
            }
            if (updates.containsKey("email")) {
                String newEmail = (String) updates.get("email");
                // 필요 시 중복 체크 및 검증 추가
                user.setEmail(newEmail);
            }
            // 필요한 필드 추가 가능

            userRepository.save(user);
            return user;
        });
    }
}
