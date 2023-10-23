package com.serdar.regapp.user.exception;

import java.util.Collections;
import java.util.Map;

import org.springframework.context.i18n.LocaleContextHolder;

import com.serdar.regapp.shared.Messages;

public class NotUniqueEmailException extends RuntimeException {

	public NotUniqueEmailException() {
		super(Messages.getMessageForLocale("regapp.error.validation", LocaleContextHolder.getLocale()));
	}

	public Map<String, String> getValidationErrors() {
		return Collections.singletonMap("email", Messages.getMessageForLocale("regapp.constraint.email.notunique", LocaleContextHolder.getLocale()));
	}
}
