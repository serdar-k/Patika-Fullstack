package com.serdar.regapp.user;

import com.serdar.regapp.auth.AuthService;
import com.serdar.regapp.auth.dto.response.AuthResponse;
import com.serdar.regapp.auth.token.Token;
import com.serdar.regapp.auth.token.TokenDto;
import com.serdar.regapp.auth.token.TokenRepository;
import com.serdar.regapp.auth.token.TokenType;
import com.serdar.regapp.config.JwtService;
import com.serdar.regapp.config.JwtUserDetails;
import com.serdar.regapp.user.dto.request.CreateUserRequest;
import com.serdar.regapp.user.dto.response.UserResponse;
import com.serdar.regapp.user.exception.NotUniqueEmailException;
import com.serdar.regapp.utils.mappers.MapperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    AuthService authService;

    @Autowired
    private MapperService mapperService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    TokenRepository tokenRepository;

    @Autowired
    JwtService jwtService;

    // PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

//    public void save(CreateUserRequest createUserRequest) {
//        User user = mapperService.forRequest().map(createUserRequest, User.class);
//        try {
//            user.setPassword(passwordEncoder.encode(user.getPassword()));
//            userRepository.save(user);
//        } catch (DataIntegrityViolationException ex) {
//            throw new NotUniqueEmailException();
//        }
//    }

    public AuthResponse save(CreateUserRequest createUserRequest) {
        User user = mapperService.forRequest().map(createUserRequest, User.class);
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            
            if(user.getRole() == null) {
                user.setRole(Role.USER);
            }
            
            var userDetails = JwtUserDetails.builder().id(user.getId()).username(user.getUsername()).email(user.getEmail()).password(user.getPassword()).role(user.getRole()).build();
            
            userRepository.save(user);

            UserResponse userResponse = this.mapperService.forResponse().map(user, UserResponse.class);
            if(userResponse.getRole() == null) {
                userResponse.setRole(Role.USER);
            }


            var jwtToken = jwtService.generateToken(userDetails);
            var refToken = jwtService.generateRefreshToken(userDetails);

            var token = Token.builder().prefix("Bearer").token(jwtToken).build();
            var refreshToken = Token.builder().prefix("Bearer ").token(refToken).build();

            var tokenDto = TokenDto.builder().user(user).token(jwtToken).tokenType(TokenType.BEARER).expired(false).revoked(false).build();

            authService.revokeAllUserTokens(user);
            tokenRepository.save(tokenDto);

            return AuthResponse.builder().userResponse(userResponse).token(token).refreshToken(refreshToken).role(userResponse.getRole()).build();
        } catch (DataIntegrityViolationException ex) {
            throw new NotUniqueEmailException();
        }
    }

    public Page<User> getUsers(int page, int size) {
        return userRepository.findAll(PageRequest.of(page, size));
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public UserResponse getUser(Long id) {
        User userInDatabase = userRepository.findById(id).orElse(null);
        if(userInDatabase != null) {
            UserResponse userResponse = this.mapperService.forResponse().map(userInDatabase, UserResponse.class);
            return userResponse;
        }
        // throw new UserNotFoundException
        return null;
    }
}
