package com.serdar.regapp.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.serdar.regapp.auth.dto.Credentials;
import com.serdar.regapp.auth.dto.request.UpdatePasswordRequest;
import com.serdar.regapp.auth.dto.response.AuthResponse;
import com.serdar.regapp.auth.exception.AuthenticationException;
import com.serdar.regapp.auth.token.Token;
import com.serdar.regapp.auth.token.TokenDto;
import com.serdar.regapp.auth.token.TokenRepository;
import com.serdar.regapp.auth.token.TokenType;
import com.serdar.regapp.config.JwtService;
import com.serdar.regapp.config.JwtUserDetails;
import com.serdar.regapp.user.User;
import com.serdar.regapp.user.UserRepository;
import com.serdar.regapp.user.UserService;
import com.serdar.regapp.user.dto.response.UserResponse;
import com.serdar.regapp.utils.mappers.MapperService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class AuthService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    MapperService mapperService;

    @Autowired
    JwtService jwtService;

    @Autowired
    TokenRepository tokenRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    //    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    public AuthResponse authenticate(Credentials credentials) {
    	
//    	if(credentials.getEmail() == null || credentials.getPassword() == null)
    	
        User userInDatabase = userService.findByEmail(credentials.getEmail());

        if (userInDatabase == null) throw new AuthenticationException();
        if (!passwordEncoder.matches(credentials.getPassword(), userInDatabase.getPassword()))
            throw new AuthenticationException();

        UserResponse user = this.mapperService.forResponse().map(userInDatabase, UserResponse.class);
        JwtUserDetails userDetails = this.mapperService.forResponse().map(userInDatabase, JwtUserDetails.class);

        var jwtToken = jwtService.generateToken(userDetails);
        var refToken = jwtService.generateRefreshToken(userDetails);

        var token = Token.builder().prefix("Bearer").token(jwtToken).build();
        var refreshToken = Token.builder().prefix("Bearer ").token(refToken).build();


        var tokenDto = TokenDto.builder().user(userInDatabase).token(jwtToken).tokenType(TokenType.BEARER).expired(false).revoked(false).build();
        revokeAllUserTokens(userInDatabase);
        tokenRepository.save(tokenDto);
        var authResponse = AuthResponse.builder().userResponse(user).token(token).refreshToken(refreshToken).role(userDetails.getRole()).build();
        return authResponse;
    }

    public void revokeAllUserTokens(User user) {
        var validTokens = tokenRepository.findAllValidTokensByUser(user.getId());
        if (validTokens.isEmpty()) {
            return;
        }
        validTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });

        tokenRepository.saveAll(validTokens);
    }

    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {

        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String username;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }

        var refToken = authHeader.substring(7);
        username = jwtService.extractUsername(refToken);

        if (username != null) {
            User user = this.userRepository.findByUsername(username).orElseThrow();
            JwtUserDetails userDetails = this.mapperService.forRequest().map(user, JwtUserDetails.class);
            if (jwtService.isTokenValid(refToken, userDetails)) {
                var token = jwtService.generateToken(userDetails);
                Token accessToken = Token.builder().prefix("Bearer").token(token).build();
                var tokenDto = TokenDto.builder().user(user).token(token).tokenType(TokenType.BEARER).expired(false).revoked(false).build();
                revokeAllUserTokens(user);
                tokenRepository.save(tokenDto);
                Token generatedRefToken = Token.builder().prefix("Bearer").token(refToken).build();
                var authResponse = AuthResponse.builder()
                        .token(accessToken)
                        .refreshToken(generatedRefToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }

    public void resetPassword(UpdatePasswordRequest updatePasswordRequest, String header) {

    	
        var oldPassword = updatePasswordRequest.getOldPassword();
        var newPassword = updatePasswordRequest.getNewPassword();

            System.out.println(newPassword);
        var username = jwtService.extractUsername(header.substring(7));
        var user = userRepository.findByUsername(username).get();

        if(passwordEncoder.matches(oldPassword, user.getPassword())) {
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
        }
    }
}
