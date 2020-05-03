package dev.louiiuol.etin.config.token;

import java.util.Map;

import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;

import dev.louiiuol.etin.models.entities.UserDetails;

/**
 * Provides an enhancer to update an access token before it is stored
 *
 * @see OAuth2AccessToken
 * @see OAuth2Authentication
 * @see TokenEnhancer
 */
public class CustomTokenEnhancer implements TokenEnhancer {

    static final String USER_ID_KEY = "userId";

	/**
	 * Customizes an access token before creating a new token by adding the {@code userId}
	 * 
	 * @param accessToken custom OAuth2 token
	 * @param accessToken authentication OAuth2 authentication
	 * @return new instance of {@code OAuth2AccessToken}
	 */
    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
		UserDetails user = (UserDetails) authentication.getPrincipal();
		Map<String, Object> additionalInfo = user.init();
		( (DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(additionalInfo);
		return accessToken;
	}

}