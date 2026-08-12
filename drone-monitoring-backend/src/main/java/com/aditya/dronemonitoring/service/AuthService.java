package com.aditya.dronemonitoring.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.Authentication;
import com.aditya.dronemonitoring.dto.ChangePasswordRequestDTO;
import com.aditya.dronemonitoring.exception.InvalidPasswordException;
import com.aditya.dronemonitoring.dto.LoginRequestDTO;
import com.aditya.dronemonitoring.dto.LoginResponseDTO;
import com.aditya.dronemonitoring.dto.RefreshTokenRequestDTO;
import com.aditya.dronemonitoring.dto.RefreshTokenResponseDTO;
import com.aditya.dronemonitoring.dto.RegisterRequestDTO;
import com.aditya.dronemonitoring.dto.RegisterResponseDTO;
import com.aditya.dronemonitoring.entity.Role;
import com.aditya.dronemonitoring.entity.User;
import com.aditya.dronemonitoring.exception.EmailAlreadyExistsException;
import com.aditya.dronemonitoring.exception.UsernameAlreadyExistsException;
import com.aditya.dronemonitoring.repository.UserRepository;
import com.aditya.dronemonitoring.security.CustomUserDetails;
import com.aditya.dronemonitoring.security.JwtService;
import com.aditya.dronemonitoring.util.UserMapper;
import com.aditya.dronemonitoring.entity.RefreshToken;

@Service
public class AuthService {
        private final RefreshTokenService refreshTokenService;

        private final AuthenticationManager authenticationManager;

        private final UserRepository userRepository;

        private final BCryptPasswordEncoder passwordEncoder;

        private final JwtService jwtService;

        public AuthService(
                        AuthenticationManager authenticationManager,
                        JwtService jwtService,
                        UserRepository userRepository,
                        RefreshTokenService refreshTokenService) {

                this.authenticationManager = authenticationManager;
                this.jwtService = jwtService;
                this.userRepository = userRepository;
                this.refreshTokenService = refreshTokenService;
                this.passwordEncoder = new BCryptPasswordEncoder();
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

        public LoginResponseDTO login(LoginRequestDTO request) {

                Authentication authentication = authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getUsername(),
                                                request.getPassword()));

                CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
                User user = userDetails.getUser();
                LoginResponseDTO response = new LoginResponseDTO();

                response.setUserId(user.getId());
                response.setUsername(user.getUsername());
                response.setRole(user.getRole());

                String token = jwtService.generateToken(userDetails);

                RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);

                response.setToken(token);

                response.setRefreshToken(
                                refreshToken.getToken());

                response.setTokenType("Bearer");

                response.setExpiresIn(jwtService.getJwtExpiration() / 1000);

                return response;
        }

        public RefreshTokenResponseDTO refreshAccessToken(
                        RefreshTokenRequestDTO request) {

                RefreshToken refreshToken = refreshTokenService.verifyRefreshToken(
                                request.getRefreshToken());

                User user = refreshToken.getUser();

                CustomUserDetails userDetails = new CustomUserDetails(user);

                String newAccessToken = jwtService.generateToken(userDetails);

                return new RefreshTokenResponseDTO(
                                newAccessToken,
                                "Bearer",
                                jwtService.getJwtExpiration() / 1000);
        }

        public void logout(String refreshToken) {

                refreshTokenService.revokeRefreshToken(refreshToken);
        }

        public void changePassword(
                        Authentication authentication,
                        ChangePasswordRequestDTO request) {

                CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

                User user = userDetails.getUser();

                // 1. Verify current password
                if (!passwordEncoder.matches(
                                request.getCurrentPassword(),
                                user.getPassword())) {

                        throw new InvalidPasswordException(
                                        "Current password is incorrect");
                }

                // 2. Verify new password confirmation
                if (!request.getNewPassword().equals(
                                request.getConfirmPassword())) {

                        throw new InvalidPasswordException(
                                        "New password and confirm password do not match");
                }

                // 3. Prevent using the same password
                if (passwordEncoder.matches(
                                request.getNewPassword(),
                                user.getPassword())) {

                        throw new InvalidPasswordException(
                                        "New password must be different from current password");
                }

                // 4. Hash new password
                user.setPassword(
                                passwordEncoder.encode(
                                                request.getNewPassword()));

                // 5. Save
                userRepository.save(user);

                refreshTokenService.deleteByUserId(user.getId());
        }
}