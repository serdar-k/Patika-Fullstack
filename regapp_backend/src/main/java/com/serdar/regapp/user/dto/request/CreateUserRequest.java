package com.serdar.regapp.user.dto.request;

import com.serdar.regapp.user.Role;
import com.serdar.regapp.user.validation.UniqueEmail;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateUserRequest {

	@NotBlank(message = "{regapp.constraint.username.notblank}")
	@Size(min = 3, max = 20, message = "{regapp.constraint.username.size}")
	private String username;
	
	@NotBlank(message = "{regapp.constraint.email.notblank}")
	@Email(message = "{regapp.constraint.email.email}")
	@UniqueEmail
	private String email;
	
	@Size(min = 8, max = 20, message = "Password must be between 8 and 20 characters!")
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "Password must be contains at least one lowercase, one uppercase and one number!")
	private String password;
	
	private Role role;

}
