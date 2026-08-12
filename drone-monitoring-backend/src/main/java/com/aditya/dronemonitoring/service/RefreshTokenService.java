package com.aditya.dronemonitoring.service;

import java.time.Instant;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.aditya.dronemonitoring.entity.RefreshToken;
import com.aditya.dronemonitoring.entity.User;
import com.aditya.dronemonitoring.repository.RefreshTokenRepository;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Transactional
    public RefreshToken createRefreshToken(User user) {

        System.out.println("========== REFRESH TOKEN DEBUG ==========");
        System.out.println("User ID: " + user.getId());

        var existing = refreshTokenRepository.findByUser_Id(user.getId());

        System.out.println("Token found? " + existing.isPresent());

        existing.ifPresent(token -> {
            System.out.println("Deleting token: " + token.getToken());
            refreshTokenRepository.delete(token);
        });

        System.out.println("Count after delete: " + refreshTokenRepository.count());

        RefreshToken refreshToken = new RefreshToken();

        refreshToken.setUser(user);
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setExpiryDate(
                Instant.now().plusSeconds(7 * 24 * 60 * 60));

        RefreshToken saved = refreshTokenRepository.save(refreshToken);

        System.out.println("New token saved: " + saved.getToken());
        System.out.println("========================================");

        return saved;
    }

    public RefreshToken verifyRefreshToken(String token) {

        RefreshToken refreshToken = refreshTokenRepository
                .findByToken(token)
                .orElseThrow(() -> new RuntimeException("Refresh token not found"));

        if (refreshToken.getExpiryDate().isBefore(Instant.now())) {

            refreshTokenRepository.delete(refreshToken);

            throw new RuntimeException("Refresh token expired");
        }

        return refreshToken;
    }

    @Transactional
    public void revokeRefreshToken(String token) {

        refreshTokenRepository
                .findByToken(token)
                .ifPresent(refreshTokenRepository::delete);
    }

    @Transactional
public void deleteByUserId(Long userId) {

    refreshTokenRepository
            .findByUser_Id(userId)
            .ifPresent(refreshToken ->
                    refreshTokenRepository.delete(refreshToken));
}

    // public void deleteByUserId(Long userId) {

    // refreshTokenRepository.deleteByUserId(userId);
    // }

}