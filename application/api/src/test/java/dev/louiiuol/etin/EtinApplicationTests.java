package dev.louiiuol.etin;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

/**
 * Main Class Testing the {@linkplain dev.louiiuol.etin.EtinApplication
 * EtinApplication class}.
 * 
 * @see SpringBootTest
 * @see ActiveProfiles
 */
@SpringBootTest
@ActiveProfiles(profiles = "test")
public class EtinApplicationTests {

	/**
	 * Check if the application's context loads correclty
	 * means that all dependencies, including database, have started
	 * 
	 * @see SpringBootTest
	 * @see ActiveProfiles
	 */
	@Test
	public void load_success() {}

}