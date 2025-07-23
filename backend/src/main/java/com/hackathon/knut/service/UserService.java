package com.hackathon.knut.service;

import com.hackathon.knut.dto.UserDto;
import com.hackathon.knut.entity.User;
import com.hackathon.knut.repository.UserRepository;

import java.util.Map;
import java.util.Optional;

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
        user.setPw(dto.getPw());
        user.setUsername(dto.getUsername());
        userRepository.save(user);
    }



    // 이메일 사용 가능 한지 확인하는 메소드
    public boolean isEmailAvailable(String email){
        return userRepository.existsByEmail(email);
    }

    // 사용자의 이메일을 가져오는 메소드
    public Optional<User> getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    //유저 삭제
    public boolean deleteUserById(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    //유저 프로필 부분 수정
    public Optional<User> updateUserPartial(Long userId, UserDto dto) {
        return userRepository.findById(userId).map(user -> {
            //이름 수정
            if (dto.getUsername() != null) {
                user.setUsername(dto.getUsername());
            }

            //이메일 수정
            if (dto.getEmail() != null) {
                user.setEmail(dto.getEmail());
            }

            //비밀번호 수정
            if (dto.getPw() != null) {
                //필요 시 중복 체크 및 검증 추가
                user.setPw(dto.getPw());
            }

            userRepository.save(user);
            return user;
        });
    }

    // 임시
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
}
