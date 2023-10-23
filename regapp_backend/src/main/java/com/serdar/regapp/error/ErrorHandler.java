package com.serdar.regapp.error;

import com.serdar.regapp.auth.exception.AuthenticationException;
import com.serdar.regapp.shared.Messages;
import com.serdar.regapp.user.exception.NotUniqueEmailException;
import com.serdar.regapp.vehicle.exception.NotUniquePlateException;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ErrorHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
//	@ResponseStatus(HttpStatus.BAD_REQUEST)
    ResponseEntity<ApiError> handleMethodArgNotValidEx(MethodArgumentNotValidException exception, HttpServletRequest request) {

        ApiError apiError = new ApiError();
        apiError.setPath(request.getRequestURI());
        apiError.setStatus(400);
        Map<String, String> validationErrors = new HashMap<>();

        String message = Messages.getMessageForLocale("regapp.error.validation", LocaleContextHolder.getLocale());
        apiError.setMessage(message);

        for (var fieldError : exception.getBindingResult().getFieldErrors()) {
            validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        apiError.setValidationErrors(validationErrors);
        return ResponseEntity.badRequest().body(apiError);
    }

    @ExceptionHandler(NotUniqueEmailException.class)
    ResponseEntity<ApiError> handleNotUniqueEmailEx(NotUniqueEmailException exception) {

        ApiError apiError = new ApiError();
        apiError.setPath("/api/v1/users");
        apiError.setMessage(exception.getMessage());
        apiError.setStatus(400);
        apiError.setValidationErrors(exception.getValidationErrors());

        return ResponseEntity.badRequest().body(apiError);
    }
    
    @ExceptionHandler(NotUniquePlateException.class)
    ResponseEntity<ApiError> handleNotUniquePlateEx(NotUniquePlateException exception) {

        ApiError apiError = new ApiError();
        apiError.setPath("/api/v1/vehicle");
        apiError.setMessage(exception.getMessage());
        apiError.setStatus(400);
        apiError.setValidationErrors(exception.getValidationErrors());

        return ResponseEntity.badRequest().body(apiError);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<?> handleAuthenticationException(AuthenticationException exception) {
        ApiError apiError = new ApiError();
        apiError.setPath("/api/v1/auth");
        apiError.setStatus(401);
        apiError.setMessage(exception.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiError);
    }
}
