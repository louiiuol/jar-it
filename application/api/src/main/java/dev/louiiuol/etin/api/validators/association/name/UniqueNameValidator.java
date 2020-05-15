package dev.louiiuol.etin.api.validators.association.name;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import dev.louiiuol.etin.services.association.AssociationService;

/**
 * Concrete validator for {@code UniqueName} constraint.
 * 
 * @see ConstraintValidator
 */
public class UniqueNameValidator implements ConstraintValidator<UniqueName, String> {

    private final AssociationService service;

    protected UniqueNameValidator(AssociationService service) { this.service = service; }

    /**
     * Checks the unicity of the {@code Association}'s name based on the service returns
     * 
     * @param name to test with services
     * @param context contextual data and operation
     * @return {@code True} if name doesn't exist, {@code False} otherwise
     */
    @Override
    public boolean isValid(String name, ConstraintValidatorContext context) {
        if (null == name || name.isEmpty())
            return true;
        boolean valid = true;
        if (service.existsByName(name))
            valid = false;
        return valid;
    }

}