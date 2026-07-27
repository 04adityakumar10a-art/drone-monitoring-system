package com.aditya.dronemonitoring.dto;

import com.aditya.dronemonitoring.entity.Role;

import jakarta.validation.constraints.NotNull;

public class UpdateRoleRequestDTO {

    @NotNull
    private Role role;

    public UpdateRoleRequestDTO() {
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

}