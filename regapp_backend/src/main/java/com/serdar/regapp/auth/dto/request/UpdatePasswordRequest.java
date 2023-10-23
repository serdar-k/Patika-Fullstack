package com.serdar.regapp.auth.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdatePasswordRequest {

	@NotBlank(message = "Old password can not be blank!")
    private String oldPassword;
	
	@Size(min = 8, max = 20, message = "New password must be between 8 and 20 characters!")
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "New password must be contains at least one lowercase, one uppercase and one number!")
    private String newPassword;
}
