package com.hari.StudentManagementSystem_Backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "login")  // ✅ Ensures it matches the MySQL table name
public class User {
    @Id
    private String username;

    private String password;

    // ✅ No need for saveUser() inside model

    public User() {}

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
