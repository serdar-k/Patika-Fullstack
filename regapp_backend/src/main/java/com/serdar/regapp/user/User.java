package com.serdar.regapp.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.serdar.regapp.auth.token.TokenDto;
import com.serdar.regapp.image.FileDetails;
import com.serdar.regapp.user.validation.UniqueEmail;

import com.serdar.regapp.vehicle.Vehicle;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "users" , uniqueConstraints = @UniqueConstraint(columnNames = { "username", "email" }))
public class User {

	@Id
	@GeneratedValue
	private Long id;

	private String username;

	private String email;

	@JsonIgnore
	private String password;
	
	@Enumerated(EnumType.STRING)
	private Role role;

	@OneToMany(mappedBy = "user")
	@JsonBackReference(value = "user-token")
	private List<TokenDto> tokens;

	@OneToMany(mappedBy = "user")
	@JsonBackReference(value = "user-vehicle")
	private List<Vehicle> vehicles;

	@JsonIgnore
	@OneToMany(mappedBy = "user")
	@JsonBackReference(value = "user-image")
	private List<FileDetails> userImages;
		
}
