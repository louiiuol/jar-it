package dev.louiiuol.etin.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.method.HandlerTypePredicate;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

/**
 * Provides a MVC configuration for the API (routes customization
 * 
 * @see WebMvcConfigurer
 * @see HandlerTypePredicate
 * @see PathMatchConfigurer
 */
@Configuration
@EnableScheduling
public class WebConfig implements WebMvcConfigurer {

    /**
     * Defines the "/api" prefix for all {@code @RestController} in the application.
     * Configuring this way prevents conflicts and ease configuration with oauth
     * authentication endpoints (<i>i.e.</i> {@code "/oauth/token"})
     * 
     * @param configurer a path configurer
     */
    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        configurer.addPathPrefix("/api", HandlerTypePredicate.forAnnotation(RestController.class));
    }

    /**
     * Defines resources classpath for Swagger api & UI
     * 
     * @param registry registrations of resource handlers to customize
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("swagger-ui.html").addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
    }

    /**
     * Default {@code Docket} bean that configures Swagger
     * 
	 * @return an instance of {@code Docket}
     */
	@Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
		.select()
		.apis(RequestHandlerSelectors.basePackage("dev.louiiuol"))
		.paths(PathSelectors.any())
		.build();
    }

}
