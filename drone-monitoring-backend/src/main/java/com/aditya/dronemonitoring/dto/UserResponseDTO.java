package com.aditya.dronemonitoring.dto;

import com.aditya.dronemonitoring.entity.Role;

import java.time.LocalDateTime;

public class UserResponseDTO {

    private Long id;

    private String username;

    private String email;

    private Role role;

    private Boolean enabled;

    private LocalDateTime createdAt;

    public UserResponseDTO() {
    }

    public UserResponseDTO(
            Long id,
            String username,
            String email,
            Role role,
            Boolean enabled,
            LocalDateTime createdAt) {

        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.enabled = enabled;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public Role getRole() {
        return role;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

}