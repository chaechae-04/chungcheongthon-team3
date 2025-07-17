package com.hackathon.knut.repository;

import com.hackathon.knut.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email); // email이 DB에 이미 존재하는지 확인
    User findByEmail(String email); // DB에서 해당 이메일을 가진 유저 정보를 검색해서, User 엔티티 객체로 가져온다.

}
