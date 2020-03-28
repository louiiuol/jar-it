package dev.louiiuol.etin.config;

import org.springframework.context.annotation.Configuration;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

/**
 * Defines configuration for {@code LocalValidator} used by the API
 * 
 * @see  LocalValidatorFactoryBean
 * @see MessageSource
 */
@Configuration
public class ValidatorConfig {

    /** 
	 * Custom {@code LocalValidatorFactoryBean} to ease messages and tests.
	 * 
	 * @param messageSource Strategy interface for resolving messages
	 * @return {@code LocalValidatorFactoryBean} */
	@Bean
	protected LocalValidatorFactoryBean validator(MessageSource messageSource) {
		LocalValidatorFactoryBean validatorFactoryBean = new LocalValidatorFactoryBean();
		validatorFactoryBean.setValidationMessageSource(messageSource);
		return validatorFactoryBean;
	}

}