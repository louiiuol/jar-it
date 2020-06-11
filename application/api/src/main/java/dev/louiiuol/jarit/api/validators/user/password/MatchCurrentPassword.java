package dev.louiiuol.jarit.api.validators.user.password;

import java.lang.annotation.*;

import javax.validation.Constraint;
import javax.validation.Payload;

/**
 * Interface to define configuration, error message and payload
 * of {@code MatCurrentPasswordValidator} constraint
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
@Constraint(validatedBy = MatchCurrentPasswordValidator.class)
public @interface MatchCurrentPassword {

    String message() default "{E_INVALID_PASSWORD}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

}