package dev.louiiuol.etin.api.validators.username;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import dev.louiiuol.etin.services.user.UserService;

/**
 * Concrete validator for {@code UniqueUsername} constraint.
 * 
 * @see ConstraintValidator
 */
public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {

    private final UserService service;

    protected UniqueUsernameValidator(UserService service) {
        this.service = service;
    }

    /**
     * Checks the unicity of the {@code User}'s username based on the service returns
     * 
     * @param username user's name to test with services
     * @param context contextual data and operation
     * @return {@code True} if username doesn't exist, {@code False} otherwise
     */
    @Override
    public boolean isValid(String username, ConstraintValidatorContext context) {
        if (null == username || username.isEmpty())
            return true;
        boolean valid = true;
        if (service.existsByUserName(username))
            valid = false;
        return valid;
    }

}