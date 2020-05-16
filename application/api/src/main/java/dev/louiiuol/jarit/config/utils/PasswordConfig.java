package dev.louiiuol.jarit.config.utils;

import org.springframework.context.annotation.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Defines default {@code PasswordEncoder} configuration
 * used by the API to encode {@code User} passwords
 * 
 * @see  PasswordEncoder
 * @see BCryptPasswordEncoder
 */
@Configuration
public class PasswordConfig {

	/**
     * Defines default {@code BCryptPasswordEncoder} Bean
     * to encode/decoode {@code User} passwords
     * 
     * @return (@code PasswordEncoder}
     */
    @Bean
    protected PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}