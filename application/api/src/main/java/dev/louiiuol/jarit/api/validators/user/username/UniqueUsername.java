package dev.louiiuol.jarit.api.validators.user.username;

import java.lang.annotation.*;

import javax.validation.Constraint;
import javax.validation.Payload;

/**
 * Interface to define configuration, error message and payload
 * of {@code AdultValidator} constraint
 * <p>
 * <b>A {@code null} value is considered as valid</b>. Other validation should
 * be used to check against {@code null} exception.
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

    String message() default "{E_NOT_UNIQUE}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

}