package com.serdar.regapp.user.validation;

import static java.lang.annotation.ElementType.FIELD;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Constraint(validatedBy = UniqueEmailValidator.class)
@Target({ FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueEmail {

	String message() default "{regapp.constraint.email.unique}";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};

}
