package dev.louiiuol.etin.api.validators.email;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import dev.louiiuol.etin.services.user.UserService;

/**
 * Concrete validator for {@code UniqueEmail} constraint.
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
        if (null == email || email.isEmpty())
            return true;
        boolean valid = true;
        if (service.existsByEmail(email))
            valid = false;
        return valid;
    }

}
