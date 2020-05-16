package dev.louiiuol.jarit.api.validators.association.code;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import dev.louiiuol.jarit.services.association.AssociationService;

/**
 * Concrete validator that implement {@code UniqueCode} interface to check if
 * {@code Association}'s code is unique (not present in database yet) or not
 * 
 * @see ConstraintValidator
 */
public class UniqueCodeValidator implements ConstraintValidator<UniqueCode, String> {

    private final AssociationService service;

    protected UniqueCodeValidator(AssociationService service) {
        this.service = service;
    }

    /**
     * Checks the unicity of the {@code Association}'s code based on the service return
     * 
     * @param code to test with services
     * @param context contextual data and operation
     * @return {@code True} if code doesn't exist, {@code False} otherwise
     */
    @Override
    public boolean isValid(String code, ConstraintValidatorContext context) {
        if (null == code || code.isEmpty()) {
            return true;
        }
        return !service.existsByCode(code);
    }

}