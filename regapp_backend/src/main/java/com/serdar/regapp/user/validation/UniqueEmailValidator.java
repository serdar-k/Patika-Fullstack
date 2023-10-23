package com.serdar.regapp.user.validation;

import org.springframework.beans.factory.annotation.Autowired;

import com.serdar.regapp.user.User;
import com.serdar.regapp.user.UserRepository;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {

	@Autowired
	UserRepository userRepository;
	
	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		User userInDatabase = userRepository.findByEmail(value);
		return userInDatabase == null;
	}

	
}
