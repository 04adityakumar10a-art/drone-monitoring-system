package com.aditya.dronemonitoring.security;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

        private final JwtService jwtService;
        private final CustomUserDetailsService userDetailsService;

        public JwtAuthenticationFilter(
                        JwtService jwtService,
                        CustomUserDetailsService userDetailsService) {

                this.jwtService = jwtService;
                this.userDetailsService = userDetailsService;
        }

        @Override
        protected void doFilterInternal(
                        jakarta.servlet.http.HttpServletRequest request,
                        jakarta.servlet.http.HttpServletResponse response,
                        jakarta.servlet.FilterChain filterChain)
                        throws java.io.IOException, jakarta.servlet.ServletException {

                String path = request.getServletPath();

                /*
                 * =====================================================
                 * PUBLIC AUTH ENDPOINTS
                 * =====================================================
                 *
                 * These endpoints do NOT require an access token.
                 */

                if (path.equals("/api/auth/login")
                                || path.equals("/api/auth/register")
                                || path.equals("/api/auth/refresh")) {

                        filterChain.doFilter(request, response);

                        return;
                }

                /*
                 * =====================================================
                 * WEBSOCKET
                 * =====================================================
                 *
                 * We will secure the WebSocket handshake separately.
                 */

                if (path.startsWith("/ws")) {

                        filterChain.doFilter(request, response);

                        return;
                }

                /*
                 * =====================================================
                 * JWT AUTHENTICATION
                 * =====================================================
                 */

                String authHeader = request.getHeader("Authorization");

                /*
                 * No token
                 *
                 * Don't immediately return 401 here.
                 * Let Spring Security decide whether this
                 * endpoint requires authentication.
                 */

                if (authHeader == null
                                || !authHeader.startsWith("Bearer ")) {

                        filterChain.doFilter(request, response);

                        return;
                }

                try {

                        String jwt = authHeader.substring(7);

                        String username = jwtService.extractUsername(jwt);

                        if (username != null
                                        && SecurityContextHolder
                                                        .getContext()
                                                        .getAuthentication() == null) {

                                UserDetails userDetails = userDetailsService
                                                .loadUserByUsername(username);

                                if (jwtService.isTokenValid(jwt)
                                                && userDetails.isEnabled()) {

                                        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                                                        userDetails,
                                                        null,
                                                        userDetails.getAuthorities());

                                        authentication.setDetails(
                                                        new WebAuthenticationDetailsSource()
                                                                        .buildDetails(request));

                                        SecurityContextHolder
                                                        .getContext()
                                                        .setAuthentication(authentication);


                                }

                        }

                } catch (Exception ex) {

                        System.out.println(
                                        "JWT Validation Failed: "
                                                        + ex.getMessage());

                        SecurityContextHolder
                                        .clearContext();
                }

                filterChain.doFilter(request, response);
        }
}