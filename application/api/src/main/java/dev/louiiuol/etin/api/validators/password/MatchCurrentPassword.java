package dev.louiiuol.etin.api.validators.password;

import java.lang.annotation.*;

import javax.validation.Constraint;
import javax.validation.Payload;

/**
 * Interface to define configuration of {@code MatchCurrentPasswordValidator}. Defines
 * error message and payload
 * 
 * @see Constraint
 * @see Payload
 * @see Retention
 * @see Target
 */
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.FIELD, ElementType.TYPE })
@Constraint(validatedBy = MatchCurrentPasswordValidator.class)
public @interface MatchCurrentPassword {

    String message() default "{E_INVALID_PASSWORD}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

}