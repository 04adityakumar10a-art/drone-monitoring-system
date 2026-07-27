package com.aditya.dronemonitoring.service;

import com.aditya.dronemonitoring.dto.RegisterRequestDTO;
import com.aditya.dronemonitoring.dto.RegisterResponseDTO;
import com.aditya.dronemonitoring.entity.Role;
import com.aditya.dronemonitoring.entity.User;
import com.aditya.dronemonitoring.exception.EmailAlreadyExistsException;
import com.aditya.dronemonitoring.exception.UsernameAlreadyExistsException;
import com.aditya.dronemonitoring.repository.UserRepository;
import com.aditya.dronemonitoring.util.UserMapper;
import java.util.List;

import com.aditya.dronemonitoring.dto.UpdateRoleRequestDTO;
import com.aditya.dronemonitoring.dto.UserResponseDTO;
import com.aditya.dronemonitoring.exception.UserNotFoundException;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
            BCryptPasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public RegisterResponseDTO registerUser(RegisterRequestDTO request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new UsernameAlreadyExistsException(
                    "Username already exists");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException(
                    "Email already exists");
        }

        User user = UserMapper.toEntity(request);

        user.setPassword(
                passwordEncoder.encode(request.getPassword()));

        user.setRole(Role.VIEWER);

        User savedUser = userRepository.save(user);

        return UserMapper.toResponse(savedUser);
    }

    public List<UserResponseDTO> getAllUsers() {

        return userRepository.findAll()

                .stream()

                .map(user -> new UserResponseDTO(

                        user.getId(),

                        user.getUsername(),

                        user.getEmail(),

                        user.getRole(),

                        user.getEnabled(),

                        user.getCreatedAt()

                ))

                .toList();

    }

    public UserResponseDTO updateRole(
            Long id,
            UpdateRoleRequestDTO request) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        System.out.println("Requested role: " + request.getRole());
        user.setRole(request.getRole());

        User savedUser = userRepository.save(user);

        return new UserResponseDTO(

                savedUser.getId(),

                savedUser.getUsername(),

                savedUser.getEmail(),

                savedUser.getRole(),

                savedUser.getEnabled(),

                savedUser.getCreatedAt()

        );

    }
}