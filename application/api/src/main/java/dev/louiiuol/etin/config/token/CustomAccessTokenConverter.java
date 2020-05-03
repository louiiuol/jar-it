package dev.louiiuol.etin.config.token;

import java.util.Map;

import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.DefaultAccessTokenConverter;
import org.springframework.stereotype.Component;

/**
 * Provides a converter for token service that store authentication data inside the token
 *
 * @see OAuth2Authentication
 * @see DefaultAccessTokenConverter
 */
@Component
public class CustomAccessTokenConverter extends DefaultAccessTokenConverter {

	/**
	 * Convert map of claims and store into {@code OAuth2Authentication}
	 * 
	 * @param claim a Map of String containing authentication's claims
	 * @return {@code OAuth2Authentication}
	*/
    @Override
    public OAuth2Authentication extractAuthentication(Map<String, ?> claims) {
		OAuth2Authentication authentication = super.extractAuthentication(claims);
		authentication.setDetails(claims); // Prevents details set to null
		return authentication;
	}

}