package com.aditya.dronemonitoring.service;

import com.aditya.dronemonitoring.dto.UpdatePasswordRequestDTO;
import com.aditya.dronemonitoring.dto.UpdateStatusRequestDTO;
import com.aditya.dronemonitoring.dto.UpdateUserRequestDTO;
import com.aditya.dronemonitoring.entity.Role;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.aditya.dronemonitoring.dto.CreateUserRequestDTO;
import com.aditya.dronemonitoring.dto.RegisterRequestDTO;
import com.aditya.dronemonitoring.dto.RegisterResponseDTO;
import com.aditya.dronemonitoring.dto.UpdateRoleRequestDTO;
import com.aditya.dronemonitoring.dto.UserResponseDTO;
import com.aditya.dronemonitoring.entity.User;
import com.aditya.dronemonitoring.exception.EmailAlreadyExistsException;
import com.aditya.dronemonitoring.exception.UserNotFoundException;
import com.aditya.dronemonitoring.exception.UsernameAlreadyExistsException;
import com.aditya.dronemonitoring.repository.UserRepository;
import com.aditya.dronemonitoring.util.UserMapper;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

        private final UserRepository userRepository;

        private final BCryptPasswordEncoder passwordEncoder;

        public UserService(
                        UserRepository userRepository,
                        BCryptPasswordEncoder passwordEncoder) {

                this.userRepository = userRepository;
                this.passwordEncoder = passwordEncoder;

        }

        /*
         * =====================================
         * PUBLIC REGISTER (VIEWER)
         * =====================================
         */

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

                                passwordEncoder.encode(request.getPassword())

                );

                user.setRole(com.aditya.dronemonitoring.entity.Role.VIEWER);

                User savedUser = userRepository.save(user);

                return UserMapper.toResponse(savedUser);

        }

        /*
         * =====================================
         * ADMIN CREATE USER
         * =====================================
         */

        public UserResponseDTO createUser(CreateUserRequestDTO request) {

                if (userRepository.existsByUsername(request.getUsername())) {

                        throw new UsernameAlreadyExistsException(
                                        "Username already exists");

                }

                if (userRepository.existsByEmail(request.getEmail())) {

                        throw new EmailAlreadyExistsException(
                                        "Email already exists");

                }

                User user = new User();

                user.setUsername(request.getUsername());

                user.setEmail(request.getEmail());

                user.setPassword(

                                passwordEncoder.encode(request.getPassword())

                );

                user.setRole(request.getRole());

                user.setEnabled(true);

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

        /*
         * =====================================
         * GET ALL USERS
         * =====================================
         */

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

        /*
         * =====================================
         * UPDATE ROLE
         * =====================================
         */

        public UserResponseDTO updateRole(

                        Long id,

                        UpdateRoleRequestDTO request

        ) {

                User user = userRepository.findById(id)

                                .orElseThrow(() ->

                                new UserNotFoundException("User not found"));

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

        public UserResponseDTO updateUser(
                        Long id,
                        UpdateUserRequestDTO request) {

                User user = userRepository.findById(id)
                                .orElseThrow(() -> new UserNotFoundException(
                                                "User not found"));

                if (userRepository.existsByUsernameAndIdNot(
                                request.getUsername(),
                                id)) {

                        throw new UsernameAlreadyExistsException(
                                        "Username already exists");
                }

                if (userRepository.existsByEmailAndIdNot(
                                request.getEmail(),
                                id)) {

                        throw new EmailAlreadyExistsException(
                                        "Email already exists");
                }

                user.setUsername(
                                request.getUsername());

                user.setEmail(
                                request.getEmail());

                User savedUser = userRepository.save(user);

                return toResponse(savedUser);
        }

        public UserResponseDTO updateStatus(
                        Long id,
                        UpdateStatusRequestDTO request) {

                User user = userRepository.findById(id)
                                .orElseThrow(() -> new UserNotFoundException(
                                                "User not found"));

                Authentication authentication = SecurityContextHolder
                                .getContext()
                                .getAuthentication();

                String currentUsername = authentication.getName();

                /*
                 * Prevent administrator from disabling
                 * their own account.
                 */
                if (user.getUsername()
                                .equals(currentUsername)
                                && !request.getEnabled()) {

                        throw new IllegalStateException(
                                        "You cannot disable your own account");
                }

                user.setEnabled(
                                request.getEnabled());

                User savedUser = userRepository.save(user);

                return toResponse(savedUser);
        }

        public void updatePassword(
                        Long id,
                        UpdatePasswordRequestDTO request) {

                User user = userRepository.findById(id)
                                .orElseThrow(() -> new UserNotFoundException(
                                                "User not found"));

                user.setPassword(
                                passwordEncoder.encode(
                                                request.getPassword()));

                userRepository.save(user);
        }

        public void deleteUser(Long id) {

                User user = userRepository.findById(id)
                                .orElseThrow(() -> new UserNotFoundException(
                                                "User not found"));

                Authentication authentication = SecurityContextHolder
                                .getContext()
                                .getAuthentication();

                String currentUsername = authentication.getName();

                if (user.getUsername()
                                .equals(currentUsername)) {

                        throw new IllegalStateException(
                                        "You cannot delete your own account");
                }

                userRepository.delete(user);
        }

        private UserResponseDTO toResponse(
                        User user) {

                return new UserResponseDTO(
                                user.getId(),
                                user.getUsername(),
                                user.getEmail(),
                                user.getRole(),
                                user.getEnabled(),
                                user.getCreatedAt());
        }

        

}