package dev.louiiuol.etin.api.validators.password;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import dev.louiiuol.etin.services.user.UserService;
import dev.louiiuol.etin.services.utils.SecurityHelper;

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