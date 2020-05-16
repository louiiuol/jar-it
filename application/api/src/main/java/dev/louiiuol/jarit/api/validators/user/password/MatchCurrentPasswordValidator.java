package dev.louiiuol.jarit.api.validators.user.password;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import dev.louiiuol.jarit.services.user.UserService;
import dev.louiiuol.jarit.services.utils.SecurityHelper;

/**
 * Concrete validator that implement {@code MatchCurrentPassword} interface to check if
 * {@code User}'s password is valid (match user's encoded password stored in database) or not
 * 
 * @see ConstraintValidator
 */
public class MatchCurrentPasswordValidator implements ConstraintValidator<MatchCurrentPassword, String> {

    private final UserService service;

    protected MatchCurrentPasswordValidator(UserService service) {
        this.service = service;
    }

    /**
     * Checks the validity of the given password based on the service returns
     * 
     * @param password to test with services
     * @param context contextual data and operation
     * @return {@code True} if password match, {@code False} otherwise
     */
    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        if (null == password || password.isEmpty()) {
            return true;
        }
        return service.matchPassword(SecurityHelper.getUserId(), password);
    }

}