package com.aditya.dronemonitoring.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.aditya.dronemonitoring.dto.UpdateRoleRequestDTO;
import com.aditya.dronemonitoring.dto.UserResponseDTO;
import com.aditya.dronemonitoring.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {

        this.userService = userService;

    }

    // ==========================
    // Get All Users
    // ==========================

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {

        return ResponseEntity.ok(
                userService.getAllUsers()
        );

    }

    // ==========================
    // Update User Role
    // ==========================

    @PutMapping("/{id}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponseDTO> updateRole(

            @PathVariable Long id,

            @Valid
            @RequestBody UpdateRoleRequestDTO request

    ) {

        return ResponseEntity.ok(

                userService.updateRole(id, request)

        );

    }

}