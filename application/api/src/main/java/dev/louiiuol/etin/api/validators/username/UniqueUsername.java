package dev.louiiuol.etin.api.validators.username;

import java.lang.annotation.*;

import javax.validation.Constraint;
import javax.validation.Payload;

/**
 * Interface to define configuration of {@code UniqueUserNameValidator}.
 * Defines error message and payload
 * 
 * @see Constraint
 * @see Payload
 * @see Retention
 * @see Target
 */
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.FIELD, ElementType.TYPE })
@Constraint(validatedBy = UniqueUsernameValidator.class)
public @interface UniqueUsername {

    String message() default "username is already taken";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

}