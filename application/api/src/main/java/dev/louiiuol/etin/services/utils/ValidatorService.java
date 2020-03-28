package dev.louiiuol.etin.services.utils;

import org.springframework.stereotype.Service;

/**
 * Provides convenient methods to deal with validations
 * <hr>
 * Tinee:
 * <ul>
 *  <li> boolean {@link #isAdmin(Long tineeId)}
 *  <li> boolean {@link #isMember(Long tineeId)}
 *  <li> boolean {@link #isActive(Long tineeId)}
 *  <li> boolean {@link #isActive(Long tineeId)}
 * </ul>
 * User:
 * <ul>
 * <li> boolean {@link #validRequester(Long userId)}
 * </ul>
 * 
 * @see Service
 */
@Service
public class ValidatorService {

    protected ValidatorService() {}

    /**
     * Checks if the {@code User} with given {@code username} is the actual requester and has permission or not.
     * 
     * @param userId User's identifier to compare with authenticated identifier
     *  @return {@code True} if requester is valid, else {@code False}
     */
    public boolean validRequester(Long userId) { return  SecurityHelper.getUserId() == userId; }

}