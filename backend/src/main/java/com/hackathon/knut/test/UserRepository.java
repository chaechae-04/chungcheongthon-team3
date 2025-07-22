package com.hackathon.knut.test;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findById(Long id);
    // JpaRepository가 기본 CRUD 다 제공
}
