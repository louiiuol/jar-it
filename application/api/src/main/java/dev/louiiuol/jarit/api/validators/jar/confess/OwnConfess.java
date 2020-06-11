package dev.louiiuol.jarit.api.validators.jar.confess;

import java.lang.annotation.*;

import javax.validation.*;

/**
 * Interface to define configuration of {@code OwnConfessValidator}.
 * Defines error message and payload
 * 
 * @see Constraint
 * @see Payload
 * @see Retention
 * @see Target
 */
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.TYPE, ElementType.ANNOTATION_TYPE })
@Constraint(validatedBy = OwnConfessValidator.class)
public @interface OwnConfess {

    String message() default "{E_NOT_VALID}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

}