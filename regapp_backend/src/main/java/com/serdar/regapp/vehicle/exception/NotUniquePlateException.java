package com.serdar.regapp.vehicle.exception;

import java.util.Collections;
import java.util.Map;

import org.springframework.context.i18n.LocaleContextHolder;

import com.serdar.regapp.shared.Messages;

public class NotUniquePlateException extends RuntimeException {

	public NotUniquePlateException() {
		super(Messages.getMessageForLocale("regapp.error.validation", LocaleContextHolder.getLocale()));
	}

	public Map<String, String> getValidationErrors() {
		return Collections.singletonMap("plate", Messages.getMessageForLocale("regapp.constraint.plate.notunique", LocaleContextHolder.getLocale()));
	}
}
