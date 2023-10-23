package com.serdar.regapp.admin;

import com.serdar.regapp.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.serdar.regapp.user.UserRepository;

import java.util.List;


@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

	@Autowired
	UserRepository userRepository;
	
	@GetMapping("/all-users")
	public List<User> getAllUsers() {
		
		var users = userRepository.findAll();
		return users;
	}
}
