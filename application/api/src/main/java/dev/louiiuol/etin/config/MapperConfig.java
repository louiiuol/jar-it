package dev.louiiuol.etin.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.introspect.VisibilityChecker;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration.AccessLevel;
import org.modelmapper.convention.MatchingStrategies;

/**
 * Defines custom {@code Mappers} configuration used by the API
 * to transform {@code entities} into {@code dtos} and vice versa
 * 
 * @see ObjectMapper
 * @see ModelMapper
 */
@Configuration
public class MapperConfig {

    /**
	 * Defines custom {@code ModelMapper} Bean
	 * that configures mapping between DTO and entities.
	 * <p>
	 * <i> field matching is enabled with private access and standard matching strategy. </i>
	 * @return an instance of {@code ModelMapper}
	 */
	@Bean
	protected ModelMapper modelMapper() {
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration()
			.setFieldMatchingEnabled(true)
			.setFieldAccessLevel(AccessLevel.PRIVATE)
			.setMatchingStrategy(MatchingStrategies.STANDARD)
			.setSkipNullEnabled(true);
		return mapper;
	}

	/**
	 * Custom {@code ObjectMapper} bean that configures mapping between JSON and DTO.
	 * <p>
     * Set mapping to field with any visibility and deactivates mapping with
     * accessors/mutators. Configures dates serialization using {@code JavaTimeModule}.
	 * 
     * @return an instance of {@code ObjectMapper}.
	 */
	@Bean
    protected ObjectMapper objectMapper() {
		ObjectMapper mapper = new ObjectMapper();
		VisibilityChecker<?> checker = mapper
			.getSerializationConfig()
			.getDefaultVisibilityChecker()
			.withFieldVisibility(JsonAutoDetect.Visibility.ANY);
		mapper.setVisibility(checker);
		mapper.registerModules(new JavaTimeModule());
		mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
		return mapper;
    }

}