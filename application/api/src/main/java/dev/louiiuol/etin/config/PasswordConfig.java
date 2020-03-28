package dev.louiiuol.etin.config;

import org.springframework.context.annotation.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Defines configuration for {@code PasswordEncoder} used by the API
 * 
 * @see  PasswordEncoder
 * @see BCryptPasswordEncoder
 */
@Configuration
public class PasswordConfig {

	/**
     * Default {@code BCryptPasswordEncoder} to encode/decoode passwords
     * 
     * @return (@code PasswordEncoder}
     */
    @Bean
    protected PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }

}