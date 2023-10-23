package com.serdar.regapp.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// USING AS AUTH REQUEST
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Credentials {

    @Email()
    @NotBlank(message = "Email can not be blank!")
    private String email;
    @NotBlank(message = "Password can not be blank!")
    private String password;
}
