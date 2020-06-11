package dev.louiiuol.jarit.api.validators.user.adult;

import java.lang.annotation.*;

import javax.validation.*;

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
 * @see AdultValidator
 */
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.FIELD, ElementType.ANNOTATION_TYPE,
	ElementType.PARAMETER })
@Constraint(validatedBy = AdultValidator.class)
public @interface Adult {

    String message() default "{E_NOT_ADULT}";
    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}