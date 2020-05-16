package dev.louiiuol.jarit.api.validators.association.name;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import dev.louiiuol.jarit.services.association.AssociationService;

/**
 * Concrete validator that implement {@code UniqueName} interface to check if
 * {@code Association}'s name is unique (not present in database yet) or not
 * 
 * @see ConstraintValidator
 */
public class UniqueNameValidator implements ConstraintValidator<UniqueName, String> {

    private final AssociationService service;

    protected UniqueNameValidator(AssociationService service) {
        this.service = service;
    }

    /**
     * Checks the unicity of the {@code Association}'s name based on the service return
     * 
     * @param name to test with services
     * @param context contextual data and operation
     * @return {@code True} if name doesn't exist, {@code False} otherwise
     */
    @Override
    public boolean isValid(String name, ConstraintValidatorContext context) {
        if (null == name || name.isEmpty()) {
            return true;
        }
        return !service.existsByName(name);
    }

}