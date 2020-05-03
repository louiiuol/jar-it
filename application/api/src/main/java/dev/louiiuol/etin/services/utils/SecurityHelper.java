package dev.louiiuol.etin.services.utils;

import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;
import org.springframework.stereotype.Service;

import dev.louiiuol.etin.models.entities.UserDetails;

/**
 * Provides convenient methods to deal with the currently authenticated user
 * 
 * @see Authentication
 * @see SecurityContextHolder
 * @see OAuth2AuthenticationDetails
 * @see Service
 */
@Service
public final class SecurityHelper {

    private SecurityHelper() {/*Overrides default constructor as private without arguments*/}

    /**
     * Returns the {@code Authentication} object associated to the
     * currently authenticated principal, or an authentication request token.
     * 
     * @return {@code Authentication} or {@code null} if no authentication information is available
     */
    public static Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    /**
     * Returns the {@code Authentication} object 's id associated to the
     * currently authenticated principal, or an authentication request token.
     * 
     * @return {@code Long} or {@code null} if no authentication information is available
     */
    @SuppressWarnings("unchecked")
    public static Long getUserId() {
        Authentication auth = getAuthentication();
        OAuth2AuthenticationDetails details = (OAuth2AuthenticationDetails) auth.getDetails();
        Map<String, Object> decodedDetails = (Map<String, Object>) details.getDecodedDetails();
        Integer value = (Integer) decodedDetails.get(UserDetails.USER_ID_KEY);
        return value.longValue();
    }

    public static String getUsername() {
        return getPrincipal();
    }

    public static String getPrincipal() {
        return (String) getAuthentication().getPrincipal();
    }

}