package com.serdar.regapp.vehicle.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = UniquePlateValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface UniquePlate {

    String message() default "{regapp.constraint.plate.unique}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
