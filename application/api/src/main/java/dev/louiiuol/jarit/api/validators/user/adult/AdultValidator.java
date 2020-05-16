package dev.louiiuol.jarit.api.validators.user.adult;

import java.time.LocalDate;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * Concrete validator that implement {@code Adult} interface to check if
 * {@code User} is an adult depending on given {@code birthDate}
 * ( Accepted type is {@code LocalDate} "YYYY-MM-DD")
 * 
 * @see ConstraintValidator
 */
public class AdultValidator implements ConstraintValidator<Adult, LocalDate> {

    private static final int MAJORITY = 18;

    protected AdultValidator() {
        // Overrides default no-args constructor as protected
    }

    /**
     * Checks if user is an adult based given {@code birthDate}
     * 
     * @param birthDate to test against MAJORITY age
     * @param context contextual data and operation
     * @return {@code True} if user is old enough, {@code False} otherwise
     */
    @Override
    public boolean isValid(LocalDate birthDate, ConstraintValidatorContext constraintValidatorContext) {
        if (null == birthDate) {
            return true;
        }
        return LocalDate.now().minusYears(MAJORITY).isAfter(birthDate);
    }

}