package com.serdar.regapp.auth.exception;

import com.serdar.regapp.shared.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

public class AuthenticationException extends RuntimeException{

    public AuthenticationException() {
        super(Messages.getMessageForLocale("regapp.auth.invalid.credentials", LocaleContextHolder.getLocale()));
    }
}
