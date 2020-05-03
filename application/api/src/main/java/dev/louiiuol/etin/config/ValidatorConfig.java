package dev.louiiuol.etin.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

/**
 * Defines a custom {@code LocalValidator} configuration
 * to handle various validation over API resources in order
 * to ease resolving error messages.
 * 
 * @see  LocalValidatorFactoryBean
 * @see MessageSource
 */
@Configuration
public class ValidatorConfig {

    /** 
	 * Defines custom {@code LocalValidatorFactoryBean} Bean
	 * to ease messages and tests.
	 * 
	 * @param messageSource Strategy interface for resolving messages
	 * @return {@code LocalValidatorFactoryBean}
	 */
	@Bean
	protected LocalValidatorFactoryBean validator(MessageSource source) {
		LocalValidatorFactoryBean factory = new LocalValidatorFactoryBean();
		factory.setValidationMessageSource(source);
		return factory;
	}


	/** 
	 * Defines custom {@code MessageSource} Bean
	 * to link messages error to existing 'messages.properties' messages
	 * 
	 * @param messageSource Strategy interface for resolving messages
	 * @return {@code LocalValidatorFactoryBean}
	 */
	@Bean
	public MessageSource messageSource() {
		ReloadableResourceBundleMessageSource messageSource
			= new ReloadableResourceBundleMessageSource();
		messageSource.setBasename("classpath:messages/messages");
		messageSource.setDefaultEncoding("UTF-8");
		return messageSource;
	}

}