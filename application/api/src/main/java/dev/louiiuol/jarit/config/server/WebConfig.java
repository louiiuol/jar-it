package dev.louiiuol.jarit.config.server;

import java.util.function.Predicate;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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
 * Defines MVC configuration to handle API {@code PathPrefix}
 * and {@code Swagger} documentation
 * 
 * @see WebMvcConfigurer
 * @see HandlerTypePredicate
 * @see PathMatchConfigurer
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * Defines the "/api" prefix for all Controllers annoted {@code @RestController} in the application.
     * <p> Configuring this way prevents conflicts and ease configuration with oauth
     * authentication endpoints (<i>i.e.</i> {@code "/oauth/token"})
     * 
     * @param configurer a path configurer
     */
    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        Predicate<Class<?>> predicate = HandlerTypePredicate.forAnnotation(RestController.class);
        configurer.addPathPrefix("/api", predicate);
    }

    /**
     * Overrides WebMvcConfigurer method and
     * defines resources classpath for Swagger api & UI
     * 
     * @param registry registrations of resource handlers to customize
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("swagger-ui.html").addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
    }

    /**
     * Defines custom {@code Docket} Bean configuration
     * to specify Swagger global behavior
     * 
     * @return an instance of {@code Docket}
     */
	@Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
            .select().paths(PathSelectors.any())
            .apis(RequestHandlerSelectors.basePackage("dev.louiiuol"))
            .build();
    }

}
