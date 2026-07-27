package com.aditya.dronemonitoring.security;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import javax.crypto.SecretKey;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Service
public class JwtService {


    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    public String getJwtSecret() {
        return jwtSecret;
    }

    public long getJwtExpiration() {
        return jwtExpiration;
    }

    private Key getSigningKey() {

    return Keys.hmacShaKeyFor(
            jwtSecret.getBytes(StandardCharsets.UTF_8));

}
    @SuppressWarnings("deprecation")
    public String generateToken(
        CustomUserDetails userDetails) {

    return Jwts.builder()

            .subject(userDetails.getUsername())

            .claim("userId",
                    userDetails.getUser().getId())

            .claim("role",
                    userDetails.getUser().getRole().name())

            .issuedAt(new Date())

            .expiration(
                    new Date(
                            System.currentTimeMillis()
                                    + jwtExpiration))

            .signWith(
                    getSigningKey(),
                    SignatureAlgorithm.HS256)

            .compact();
}


private Claims extractAllClaims(String token) {

    System.out.println("Inside extractAllClaims");

    return Jwts.parser()
            .verifyWith((SecretKey) getSigningKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();
}


public String extractUsername(String token) {

    System.out.println("Inside extractUsername");

    return extractAllClaims(token).getSubject();

}

public boolean isTokenValid(String token) {

    try {

        extractAllClaims(token);

        return true;

    } catch (JwtException | IllegalArgumentException e) {

        return false;

    }

}


}