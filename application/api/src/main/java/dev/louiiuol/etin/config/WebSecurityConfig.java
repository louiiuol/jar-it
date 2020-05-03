package dev.louiiuol.etin.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * Defines {@code WebSecurityConfigurerAdapter} implementation
 * to handle CORS and AuthenticationManager in order to keep application safe
 * 
 * @see AuthenticationManager#authenticate(org.springframework.security.core.Authentication)
 * @see WebSecurityConfigurerAdapter
 */
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    /**
     * Defines as Spring bean the authentication manager for this application
     * 
     * @return an instance of {@code AuthenticationManager}
     */
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    /**
     * Default {@code CorsFilter} bean that configures CORS policies
     * 
     * @return an instance of {@code CorsFilter}
     */
    @Bean
    public CorsFilter corsFilter() {
        final UrlBasedCorsConfigurationSource configSource = new UrlBasedCorsConfigurationSource();
        final CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        configSource.registerCorsConfiguration("/**", config);
        return new CorsFilter(configSource);
    }

}