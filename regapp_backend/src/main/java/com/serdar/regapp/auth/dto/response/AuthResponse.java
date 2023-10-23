package com.serdar.regapp.auth.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.serdar.regapp.auth.token.Token;
import com.serdar.regapp.user.Role;
import com.serdar.regapp.user.dto.response.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

    private UserResponse userResponse;

    @JsonProperty("access_token")
    private Token token;

    @JsonProperty("refresh_token")
    private Token refreshToken;

    private Role role;
}
