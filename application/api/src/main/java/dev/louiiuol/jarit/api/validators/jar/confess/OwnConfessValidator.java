package dev.louiiuol.jarit.api.validators.jar.confess;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import dev.louiiuol.jarit.api.exceptions.ResourceNotFoundException;
import dev.louiiuol.jarit.business.dtos.jars.confessions.ConfessDto;
import dev.louiiuol.jarit.business.entities.Member;
import dev.louiiuol.jarit.business.repositories.MemberRepository;
import dev.louiiuol.jarit.services.utils.SecurityHelper;

/**
 * Concrete validator for {@code OwnConfess} constraint.
 * <p>
 * <i> Confession needs author and swear's author to be same person, otherwise a proof, must be given </i>
 * 
 * @see ConstraintValidator
 */
public class OwnConfessValidator implements ConstraintValidator<OwnConfess, ConfessDto> {

    private final MemberRepository repo;

    protected OwnConfessValidator(MemberRepository repo) {
        this.repo = repo;
    }

    /**
     * Checks validity of the Confession based on the service returns:
     * <p>
     * If the author ID is different than the author ID, a proof must be given
     * 
     * @param dto Confession informations
     * @param context contextual data and operation
     * @return {@code True} if match condition above, {@code False} otherwise
     */
    @Override
    public boolean isValid(ConfessDto dto, ConstraintValidatorContext context) {
        Member member = repo.findByJarIdAndUserId(dto.getJar().getId(), SecurityHelper.getUserId())
            .orElseThrow(ResourceNotFoundException::new);
        return (member.getId().equals(dto.getAuthor().getId()));
    }

}