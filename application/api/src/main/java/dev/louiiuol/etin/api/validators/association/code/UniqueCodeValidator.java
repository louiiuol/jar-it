package dev.louiiuol.etin.api.validators.association.code;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import dev.louiiuol.etin.services.association.AssociationService;

/**
 * Concrete validator for {@code UniqueCode} constraint.
 * 
 * @see ConstraintValidator
 */
public class UniqueCodeValidator implements ConstraintValidator<UniqueCode, String> {

    private final AssociationService service;

    protected UniqueCodeValidator(AssociationService service) { this.service = service; }

    /**
     * Checks the unicity of the {@code Association}'s code based on the service returns
     * 
     * @param code to test with services
     * @param context contextual data and operation
     * @return {@code True} if code doesn't exist, {@code False} otherwise
     */
    @Override
    public boolean isValid(String code, ConstraintValidatorContext context) {
        if (null == code || code.isEmpty())
            return true;
        boolean valid = true;
        if (service.existsByCode(code))
            valid = false;
        return valid;
    }

}