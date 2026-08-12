package com.aditya.dronemonitoring.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.aditya.dronemonitoring.dto.UpdatePasswordRequestDTO;
import com.aditya.dronemonitoring.dto.UpdateStatusRequestDTO;
import com.aditya.dronemonitoring.dto.UpdateUserRequestDTO;
import com.aditya.dronemonitoring.dto.CreateUserRequestDTO;
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

        /*
         * =====================================
         * GET ALL USERS
         * =====================================
         */

        @GetMapping
        @PreAuthorize("hasRole('ADMIN')")
        public ResponseEntity<List<UserResponseDTO>> getAllUsers() {

                return ResponseEntity.ok(

                                userService.getAllUsers()

                );

        }

        /*
         * =====================================
         * ADMIN CREATE USER
         * =====================================
         */

        @PostMapping
        @PreAuthorize("hasRole('ADMIN')")
        public ResponseEntity<UserResponseDTO> createUser(

                        @Valid @RequestBody CreateUserRequestDTO request

        ) {

                return ResponseEntity

                                .status(HttpStatus.CREATED)

                                .body(

                                                userService.createUser(request)

                                );

        }

        /*
         * =====================================
         * UPDATE ROLE
         * =====================================
         */

        @PutMapping("/{id}/role")
        @PreAuthorize("hasRole('ADMIN')")
        public ResponseEntity<UserResponseDTO> updateRole(

                        @PathVariable Long id,

                        @Valid @RequestBody UpdateRoleRequestDTO request

        ) {

                return ResponseEntity.ok(

                                userService.updateRole(

                                                id,

                                                request

                                )

                );

        }

        @PutMapping("/{id}")
        @PreAuthorize("hasRole('ADMIN')")
        public ResponseEntity<UserResponseDTO> updateUser(

                        @PathVariable Long id,

                        @Valid @RequestBody UpdateUserRequestDTO request

        ) {

                return ResponseEntity.ok(
                                userService.updateUser(
                                                id,
                                                request));
        }

        @PutMapping("/{id}/status")
        @PreAuthorize("hasRole('ADMIN')")
        public ResponseEntity<UserResponseDTO> updateStatus(

                        @PathVariable Long id,

                        @Valid @RequestBody UpdateStatusRequestDTO request

        ) {

                return ResponseEntity.ok(
                                userService.updateStatus(
                                                id,
                                                request));
        }

        @PutMapping("/{id}/password")
        @PreAuthorize("hasRole('ADMIN')")
        public ResponseEntity<Void> updatePassword(

                        @PathVariable Long id,

                        @Valid @RequestBody UpdatePasswordRequestDTO request

        ) {

                userService.updatePassword(
                                id,
                                request);

                return ResponseEntity.noContent()
                                .build();
        }

        @DeleteMapping("/{id}")
        @PreAuthorize("hasRole('ADMIN')")
        public ResponseEntity<Void> deleteUser(

                        @PathVariable Long id

        ) {

                userService.deleteUser(id);

                return ResponseEntity.noContent()
                                .build();
        }

}