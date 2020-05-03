package dev.louiiuol.etin.services.utils;

import org.springframework.stereotype.Service;

/**
 * Provides convenient methods to deal with custom validations
 * 
 * @see dev.louiiuol.etin.services.utils.ValidatorService#validRequester(Long id) ValidRequester(Long id)
 */
@Service
public class ValidatorService {

    protected ValidatorService() {
        // Overrides default no-args constructor as protected
    }

    /**
     * Checks if the {@code User} with given {@code username} is the actual requester and has permission or not.
     * 
     * @param userId User's identifier to compare with authenticated identifier
     *  @return {@code True} if requester is valid, else {@code False}
     */
    public boolean validRequester(Long userId) {
        return SecurityHelper.getUserId().equals(userId);
    }

}