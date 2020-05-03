package dev.louiiuol.etin.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.security.oauth2.provider.token.TokenEnhancerChain;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;
import org.springframework.security.oauth2.provider.token.store.KeyStoreKeyFactory;
import org.springframework.web.bind.annotation.RestController;

import dev.louiiuol.etin.config.token.CustomAccessTokenConverter;
import dev.louiiuol.etin.config.token.CustomTokenEnhancer;
import dev.louiiuol.etin.services.user.UserService;

/**
 * Defines a custom authorization's configuration applied over the API based on {@link AuthorizationServerConfigurerAdapter}
 * oauth providers. The main extension point for customizations is the {@link TokenEnhancer} which will be
 * called after the access and refresh tokens have been generated but before they are stored.
 * 
 * @see  AuthorizationServerSecurityConfigurer
 * @see AuthorizationServerEndpointsConfigurer
 * @see  ClientDetailsServiceConfigurer
 * @see DefaultTokenServices
 * @see JwtAccessTokenConverter
 * @see RestController
 */
@Configuration
@EnableAuthorizationServer
@RestController
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

    @Value("${jwt-auth-server.keyStore}")
    private String keyStore;

    @Value("${jwt-auth-server.keyPass}")
    private String keyPass;

    @Value("${jwt-auth-server.keyAlias}")
    private String keyAlias;

    @Value("${jwt-auth-server.accessTokenValiditySeconds}")
    private int accessTokenValiditySeconds;

    @Value("${jwt-auth-server.refreshTokenValiditySeconds}")
    private int refreshTokenValiditySeconds;

    private final AuthenticationManager authenticationManager;

    private final UserService userDetailsService;

    private final CustomAccessTokenConverter customAccessTokenConverter;

    private final PasswordEncoder encoder;

    protected AuthorizationServerConfig(
        AuthenticationManager authenticationManagerBean,
        UserService userDetailsService,
        CustomAccessTokenConverter customAccessTokenConverter,
        PasswordEncoder encoder
    ) {
        this.authenticationManager = authenticationManagerBean;
        this.userDetailsService = userDetailsService;
        this.customAccessTokenConverter = customAccessTokenConverter;
        this.encoder = encoder;
    }

    /**
     * Token service using random UUID values for the access token and 
     * refresh token values. Specifies the token store and enables the refresh token
     * 
     * @return {@coode DefaultTokenServices}
     */
    @Bean
    protected DefaultTokenServices tokenServices() {
        DefaultTokenServices services = new DefaultTokenServices();
        services.setTokenStore(tokenStore());
        services.setSupportRefreshToken(true);
        return services;
    }

    /**
     * Defines a custom JwtTokenStore based on custom {@link JwtAccessTokenConverter}
     * to read and write users' tokens.
     * 
     * @return {@code TokenStore}
     */
    @Bean
    protected TokenStore tokenStore() {
        JwtAccessTokenConverter converter = accessTokenConverter();
        return new JwtTokenStore(converter);
    }

    /**
     * Strategy for enhancing an access token before it is
     * stored by an AuthorizationServerTokenServices implementation
     * 
     * @return {@code TokenEnhancer}
     */
    @Bean
    public TokenEnhancer tokenEnhancer() {
        return new CustomTokenEnhancer();
    }

    /**
     * Defines custom configuration of {@link JwtAccessTokenConverter}
     * providing JKS keys using a {@link KeyStoreKeyFactory}.
     * 
     * @return custom {@code JwtAccessTokenConverter}
     */
    @Bean
    protected JwtAccessTokenConverter accessTokenConverter() {
        JwtAccessTokenConverter converter = new JwtAccessTokenConverter();
        Resource resource = new ClassPathResource(keyStore);
        char[] password = keyPass.toCharArray();
        KeyStoreKeyFactory factory = new KeyStoreKeyFactory(resource, password);
        converter.setKeyPair(factory.getKeyPair(keyAlias));
        converter.setAccessTokenConverter(customAccessTokenConverter);
        return converter;
    }

    /**
     * Configure the properties and enhanced functionality of the Authorization Server endpoints
     * 
     * @param configurer config for endpoints authorization
    */
    @Override
    public void configure(AuthorizationServerEndpointsConfigurer configurer) throws Exception {
        TokenEnhancerChain tokenEnhancerChain = new TokenEnhancerChain();
        tokenEnhancerChain.setTokenEnhancers( Arrays.asList( tokenEnhancer(), accessTokenConverter() ) );
        configurer.tokenStore(tokenStore())
            .tokenEnhancer(tokenEnhancerChain)
            .authenticationManager(authenticationManager)
            .userDetailsService(userDetailsService);
    }

    /**
     * Change authorization server security allowing form auth for clients
     * (vs HTTP Basic). The client_id is sent as form parameter instead
     * 
     * @param configurer config for security authorization
     * @throws Exception
     */
    @Override
    public void configure(AuthorizationServerSecurityConfigurer configurer) throws Exception {
        configurer.allowFormAuthenticationForClients();
    }

    /**
     * In memory client with empty secret, application is a "private" API with a single client,
     * but Spring forces a client authentication. Authorized grant types are
     * <i>password</i> and <i>refresh_token</i> with scope <i>trusted</i>
     * 
     * @param clients config sor ClientDetails authorization
     * @throws Exception
     */
    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        clients.inMemory().withClient("eTin-web-app")
            .secret(encoder.encode("")).scopes("trusted")
            .authorizedGrantTypes("password", "refresh_token")
            .accessTokenValiditySeconds(accessTokenValiditySeconds)
            .refreshTokenValiditySeconds(refreshTokenValiditySeconds);
    }

}