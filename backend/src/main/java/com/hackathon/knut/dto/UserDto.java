package com.hackathon.knut.dto;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {

    private String email;
    private String username;
    private Timestamp createdAt;
    private String pw;

}
