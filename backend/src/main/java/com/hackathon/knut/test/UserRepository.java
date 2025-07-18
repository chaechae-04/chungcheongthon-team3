package com.hackathon.knut.test;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    // JpaRepository가 기본 CRUD 다 제공
}
