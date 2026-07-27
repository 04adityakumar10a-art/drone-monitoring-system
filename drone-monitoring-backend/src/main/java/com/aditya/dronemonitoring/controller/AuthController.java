package com.aditya.dronemonitoring.controller;

import com.aditya.dronemonitoring.dto.RegisterRequestDTO;
import com.aditya.dronemonitoring.dto.RegisterResponseDTO;
import com.aditya.dronemonitoring.service.AuthService;
import com.aditya.dronemonitoring.dto.LoginRequestDTO;
import com.aditya.dronemonitoring.dto.LoginResponseDTO;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
    this.authService = authService;
}

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDTO> register(
            @Valid @RequestBody RegisterRequestDTO request) {
        RegisterResponseDTO response =
                authService.registerUser(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/login")
public ResponseEntity<LoginResponseDTO> login(
        @Valid @RequestBody LoginRequestDTO request) {
        System.out.println("Login API called");
    LoginResponseDTO response = authService.login(request);

    return ResponseEntity.ok(response);
}
}