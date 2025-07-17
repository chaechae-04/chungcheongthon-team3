package com.hackathon.knut.controller;

import com.hackathon.knut.dto.UserDto;
import com.hackathon.knut.entity.User;
import com.hackathon.knut.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
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
    public boolean checkEmail(@RequestParam String email){
        return userService.isEmailAvailable(email);
    }

    @GetMapping("/me")
    public User getCurrentUser(){
        return userService.getUserByEmail("fkdl4862@a.ut.ac.kr"); // 임시로 하드코딩
    }
}
