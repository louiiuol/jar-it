package dev.louiiuol.jarit.api.validators.user.email;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import dev.louiiuol.jarit.services.user.UserService;

/**
 * Concrete validator that implement {@code UniqueEmail} interface to check if
 * {@code User}'s email is unique (not present in database yet) or not
 * 
 * @see ConstraintValidator
 */
public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {

    private final UserService service;

    protected UniqueEmailValidator(UserService service) {
        this.service = service;
    }

    /**
     * Checks the unicity of the email based on the service returns
     * 
     * @param email address to test with services
     * @param context contextual data and operation
     * @return {@code True} if email doesn't exist, {@code False} otherwise
     */
    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        if (null == email || email.isEmpty()) {
            return true;
        }
        return !service.existsByEmail(email);
    }

}
