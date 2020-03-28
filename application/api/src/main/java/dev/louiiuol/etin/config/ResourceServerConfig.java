package dev.louiiuol.etin.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

/**
 * Provdes configuration of {@code ResourceServerConfigurerAdapter}
 * intercepting every requests done over the API
 * 
 *  @see ResourceServerConfigurerAdapter
 *  @see HttpSecurity
 *  @see EnableGlobalMethodSecurity
 *  @see SessionCreationPolicy
 */
@Configuration
@EnableResourceServer
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

	/**
	 * Defines this application as stateless (no HTTP session),
	 * and disables HTTP basic auth / CSRF / Spring default login form
	 *
	 * @param httpSecurity instance of {@code HttpSecurity} to customize 
	 * @throws Exception
	 */
    @Override
    public void configure(HttpSecurity httpSecurity) throws Exception {
		httpSecurity.cors()
			.and().httpBasic().disable().csrf().disable()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and().authorizeRequests().antMatchers("api/public/**").permitAll()
			.antMatchers("/api/secure/**").authenticated();
	}

}