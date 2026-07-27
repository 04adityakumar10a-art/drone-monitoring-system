package com.aditya.dronemonitoring.util;

import com.aditya.dronemonitoring.dto.RegisterRequestDTO;
import com.aditya.dronemonitoring.dto.RegisterResponseDTO;
import com.aditya.dronemonitoring.entity.User;

public class UserMapper {

    private UserMapper() {
    }

    public static User toEntity(RegisterRequestDTO request) {

        User user = new User();

        user.setUsername(request.getUsername());

        user.setEmail(request.getEmail());

        return user;
    }


    public static RegisterResponseDTO toResponse(User user) {

    RegisterResponseDTO response = new RegisterResponseDTO();

    response.setId(user.getId());

    response.setUsername(user.getUsername());

    response.setEmail(user.getEmail());

    response.setRole(user.getRole());

    response.setCreatedAt(user.getCreatedAt());

    return response;
}
}