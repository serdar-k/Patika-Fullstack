package com.serdar.regapp.auth;

import com.serdar.regapp.auth.dto.Credentials;
import com.serdar.regapp.auth.dto.request.UpdatePasswordRequest;
import com.serdar.regapp.auth.dto.response.AuthResponse;
import com.serdar.regapp.shared.GenericMessage;
import com.serdar.regapp.user.User;
import com.serdar.regapp.user.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
public class AuthController {

    private AuthService authService;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/login")
    AuthResponse handleAuthentication(@Valid @RequestBody Credentials credentials) {
        return authService.authenticate(credentials);
    }

    @PostMapping("/logout")
    ResponseEntity<?> handleLogout() {
        return ResponseEntity.ok().body("User successfully logged out!");
    }

    @PostMapping("/refresh-token")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        authService.refreshToken(request, response);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody UpdatePasswordRequest updatePasswordRequest, @RequestHeader(name = "Authorization", required = false) String requestHeader) {
        
        authService.resetPassword(updatePasswordRequest, requestHeader);
        return ResponseEntity.ok().body("Password successfully reset!");
    }
}
