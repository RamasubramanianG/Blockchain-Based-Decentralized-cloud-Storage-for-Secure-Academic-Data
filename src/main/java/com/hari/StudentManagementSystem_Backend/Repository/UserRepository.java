package com.hari.StudentManagementSystem_Backend.Repository;

import com.hari.StudentManagementSystem_Backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {  // ✅ ID type is String
    User findByUsername(String username);
}
