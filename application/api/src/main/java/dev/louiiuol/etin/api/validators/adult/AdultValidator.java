package dev.louiiuol.etin.api.validators.adult;

import java.time.LocalDate;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class AdultValidator implements ConstraintValidator<Adult, LocalDate> {

    private int age;

    protected AdultValidator() {
        // Overrides default no-args constructor as protected
    }

    @Override
    public void initialize(Adult parameters) {
        age = parameters.age();
        if (age < 0) throw new IllegalArgumentException("age must be positive");
    }

    @Override
    public boolean isValid(LocalDate birthDate, ConstraintValidatorContext constraintValidatorContext) {
        if (null == birthDate)
            return true;
        return LocalDate.now().minusYears(age).isAfter(birthDate);
    }

}