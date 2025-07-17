package com.hackathon.knut.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class User {
    // PK로 설정, 자동 증가 설정
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //null 일수 없다, 중복불가
    @Column(nullable = false, unique = true)
    private String email;

    //null 일수 없다.
    @Column(nullable = false)
    private String password;

    // null 일수 없다
    @Column(nullable = false)
    private String name;
}
