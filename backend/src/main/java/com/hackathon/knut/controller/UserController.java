package com.hackathon.knut.controller;

import com.hackathon.knut.dto.UserDto;
import com.hackathon.knut.entity.User;
import com.hackathon.knut.service.UserService;

import org.springframework.http.ResponseEntity;

import java.util.Map;
import java.util.Optional;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"}) // 필요하면 CORS 설정
public class UserController {
    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping
    public String register(@RequestBody UserDto userDto){
        userService.registerUser(userDto);
        return "회원가입 성공 !";
    }


    @GetMapping("/check-email")
    public ResponseEntity<User> checkEmail(@RequestParam String email){
        Optional<User> userOpt = userService.getUserByEmail(email);
        return userOpt.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/me")
    public Optional<User> getCurrentUser(){
        return userService.getUserByEmail("admin@example.com"); // 임시로 하드코딩
    }


//  임시
    @GetMapping("/{userId}")
    public ResponseEntity<User> getUser(@PathVariable Long userId) {
        Optional<User> userOpt = userService.getUserById(userId);
        return userOpt.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    //유저 정보 삭제
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        boolean deleted = userService.deleteUserById(userId);
        if (deleted) {
            return ResponseEntity.noContent().build(); // 204 No Content
        } else {
            return ResponseEntity.notFound().build();  // 404 Not Found
        }
    }

    //프로필 부분 수정
    @PatchMapping("/{userId}")
    public ResponseEntity<?> updateUserPartial(@PathVariable Long userId,
                                               @RequestBody UserDto dto) {
        Optional<User> updatedUserOpt = userService.updateUserPartial(userId, dto);
        return updatedUserOpt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
