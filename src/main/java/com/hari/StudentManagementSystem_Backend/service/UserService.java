package com.hari.StudentManagementSystem_Backend.service;

import com.hari.StudentManagementSystem_Backend.model.User;
import com.hari.StudentManagementSystem_Backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ✅ Get all userss
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ✅ Get user by username (Primary Key)
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findById(username);  // ✅ Uses username as ID
    }

    // ✅ Add new user
    public User addUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Encrypt password
        return userRepository.save(user);
    }

    // ✅ Update user details
    public User updateUser(String username, User updatedUser) {
        return userRepository.findById(username).map(user -> {
            user.setPassword(passwordEncoder.encode(updatedUser.getPassword())); // Hash new password
            return userRepository.save(user);
        }).orElse(null);
    }

    // ✅ Delete user by username
    public boolean deleteUser(String username) {
        if (userRepository.existsById(username)) {
            userRepository.deleteById(username);
            return true;
        }
        return false;
    }

    // ✅ Save user (for password reset)
    public void saveUser(User user) {
        userRepository.save(user);
    }
}