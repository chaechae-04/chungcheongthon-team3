package com.hackathon.knut.service;

import com.hackathon.knut.dto.UserDto;
import com.hackathon.knut.entity.User;
import com.hackathon.knut.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    // 회원가입 서비스
    public void registerUser(UserDto dto){
        // 이미 등록된 이메일일 경우
        if (userRepository.existsByEmail(dto.getEmail())){
            throw new RuntimeException("이미 사용 중인 이메일입니다.");
        }
        User user = new User();
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setName(dto.getName());
        userRepository.save(user);
    }

    // 이메일 사용 가능 한지 확인하는 메소드
    public boolean isEmailAvailable(String email){
        return !userRepository.existsByEmail(email);
    }

    // 사용자의 이메일을 가져오는 메소드
    public User getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }
}
