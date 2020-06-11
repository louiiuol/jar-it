package dev.louiiuol.jarit.services.utils;

import org.springframework.stereotype.Service;

import dev.louiiuol.jarit.business.entities.JarState;
import dev.louiiuol.jarit.services.jars.JarService;
import dev.louiiuol.jarit.services.jars.members.MemberService;

/**
 * Provides convenient methods to deal with custom validations
 * 
 * @see dev.louiiuol.jarit.services.utils.ValidatorService#validRequester(Long id) ValidRequester(Long id)
 */
@Service
public class ValidatorService {

    private final MemberService memberService;

    private final JarService jarService;

    private static final String ACTIVE = JarState.ACTIVE.toString();
    private static final String CREATED = JarState.CREATED.toString();

    protected ValidatorService(MemberService memberService, JarService jarService) {
        this.memberService = memberService;
        this.jarService = jarService;
    }

    /**
     * Checks if Authenticated user is the author of specifed jar
     * 
     * @param jarId Jar's identifier
     * @return {@code True} if authenticated User is a member, else {@code False}
     */
    public boolean isJarAuthor(Long jarId) {
        Long userId = SecurityHelper.getUserId();
        Long authorId = jarService.getDetails(jarId).getAuthor().getId();
        return userId.equals(authorId);
    }

    /**
     * Checks if Authenticated user has admin's permission in specifed jar
     * 
     * @param jarId Jar's identifier
     * @return {@code True} if authenticated User is admin, else {@code False}
     */
    public boolean isJarAdmin(Long jarId) {
        Long userId = SecurityHelper.getUserId();
        return memberService.isJarAdmin(jarId, userId);
    }

    /**
     * Checks if Authenticated user is a member of specifed jar
     * 
     * @param jarId Jar's identifier
     * @return {@code True} if authenticated User is a member, else {@code False}
     */
    public boolean isJarMember(Long jarId) {
        Long userId = SecurityHelper.getUserId();
        return memberService.isJarMember(jarId, userId);
    }

    /**
     * Checks if specifed jar is active or not depending on STATE
     * 
     * @param jarId Jar's identifier
     * @return {@code True} if authenticated User is a member, else {@code False}
     */
    public Boolean isCreated(Long jarId) {
        return jarService.getDetails(jarId).getState().equals(CREATED);
    }

    /**
     * Checks if specifed jar is active or not depending on STATE
     * 
     * @param jarId Jar's identifier
     * @return {@code True} if authenticated User is a member, else {@code False}
     */
    public Boolean isActive(Long jarId) {
        return jarService.getDetails(jarId).getState().equals(ACTIVE);
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