package com.hackathon.knut.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    
    @GetMapping("/")
    public String hello() {
        return "Hello from Spring Boot!";
    }
    
    @GetMapping("/api/test")
    public String test() {
        return "api";
    }
}