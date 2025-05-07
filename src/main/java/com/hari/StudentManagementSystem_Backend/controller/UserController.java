package com.hari.StudentManagementSystem_Backend.controller;

import com.hari.StudentManagementSystem_Backend.model.User;
import com.hari.StudentManagementSystem_Backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    @Autowired
    private UserService userService;

    // ✅ Get all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

 // ✅ Get user by username (Primary Key)
    @GetMapping("/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
        Optional<User> user = userService.getUserByUsername(username);

        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());  // ✅ Returns User object if found
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "User not found with username " + username));  // ✅ Returns Map for error message
        }
    }


    // ✅ Add new user
    @PostMapping
    public ResponseEntity<Map<String, Object>> addUser(@RequestBody User user) {
        User createdUser = userService.addUser(user);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "User created successfully");
        response.put("user", createdUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // ✅ Update user details (Only password change)
    @PutMapping("/{username}")
    public ResponseEntity<?> updateUser(@PathVariable String username, @RequestBody User updatedUser) {
        User user = userService.updateUser(username, updatedUser);
        if (user != null) {
            return ResponseEntity.ok(Map.of("message", "User updated successfully", "user", user));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "User not found with username " + username));
        }
    }

    // ✅ Delete user
    @DeleteMapping("/{username}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable String username) {
        boolean isDeleted = userService.deleteUser(username);
        if (isDeleted) {
            return ResponseEntity.ok(Map.of("message", "User deleted successfully", "username", username));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "User not found with username " + username));
        }
    }
}
