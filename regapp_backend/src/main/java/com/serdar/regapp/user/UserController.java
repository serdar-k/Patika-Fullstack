package com.serdar.regapp.user;

import com.serdar.regapp.shared.GenericMessage;
import com.serdar.regapp.shared.Messages;
import com.serdar.regapp.user.dto.request.CreateUserRequest;
import com.serdar.regapp.user.dto.response.UserResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {

	private final UserService userService;
//	private final MessageSource messageSource;

//	@PostMapping
//	ResponseEntity<?> createUser(@Valid @RequestBody CreateUserRequest createUserRequest) {
//		userService.save(createUserRequest);
//		String message = Messages.getMessageForLocale("regapp.create.user.success.message", LocaleContextHolder.getLocale());
//		return ResponseEntity.ok(new GenericMessage(message));
//	}

	@PostMapping("/signup")
	ResponseEntity<?> createUser(@Valid @RequestBody CreateUserRequest createUserRequest) {
		var response = userService.save(createUserRequest);
		String message = Messages.getMessageForLocale("regapp.create.user.success.message", LocaleContextHolder.getLocale());
		return ResponseEntity.ok().body(response);
	}

	@GetMapping
	Page<User> getUsers(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
		return userService.getUsers(page, size);
	}

	@GetMapping("/{id}")
	UserResponse getUser(@PathVariable Long id) {
		return userService.getUser(id);
	}

}
