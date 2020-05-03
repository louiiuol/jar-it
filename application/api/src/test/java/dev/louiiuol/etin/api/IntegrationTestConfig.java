package dev.louiiuol.etin.api;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.security.oauth2.common.util.JacksonJsonParser;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.context.WebApplicationContext;

/**
 * Provides {@code MockMvc} configured with {@code WebApplicationContext}, and
 * utils CRUD methods reusable in each IntegrationTests that extends it.
 * 
 * @see SpringBootTest
 */
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@ActiveProfiles(profiles = "test")
public class IntegrationTestConfig {

	@Autowired
	protected ObjectMapper objectMapper;

	@Autowired
	private WebApplicationContext wac;

	@Autowired
	private FilterChainProxy springSecurityFilterChain;

	protected JacksonJsonParser jsonParser = new JacksonJsonParser();

	protected MockMvc mockMvc;

	private final String JSON_TYPE = "application/json;charset=UTF-8";
	private final String CLIENT_ID = "eTin-web-app";
	private final String LOGIN_URI = "/oauth/token";

	protected final CharSequence UNAUTHORIZED = "unauthorized";
	protected final CharSequence ACCESS_DENIED = "access_denied";

	/**
	 * Initialize class field {@code MockMvc mockMvc} with a
	 * {@code WebApplicationContext} injected then filtered by
	 * {@code FilterChainProxy}
	 */
	@BeforeEach
	public void setUp() {
		mockMvc = MockMvcBuilders.webAppContextSetup(wac).addFilter(springSecurityFilterChain).build();
	}

	/**
	 * Emit a GET request on specified resource as logged user with given
	 * credentials
	 * 
	 * @param uri   the targeted resource
	 * @param admin indicate if User should be an admin or not
	 * @return {@code ResultActions} representation of response from request to
	 *         assert
	 * @throws Exception
	 */
	protected ResultActions loggedGet(String uri, boolean admin) throws Exception {
		String token = obtainAccessToken(username(admin), "Password1");
		return mockMvc.perform(get(uri).header("Authorization", "Bearer " + token).accept(JSON_TYPE));
	}

	/**
	 * Emit a POST request , with provided json, on specified resource as logged
	 * user with given credentials
	 * 
	 * @param uri   the targeted resource
	 * @param data  the json source
	 * @param admin indicate if User should be an admin or not
	 * @return {@code ResultActions} representation of response from request to
	 *         assert
	 * @throws Exception
	 */
	protected ResultActions loggedPost(String uri, String data, boolean admin) throws Exception {
		String token = obtainAccessToken(username(admin), "Password1");
		return mockMvc.perform(post(uri).contentType(JSON_TYPE).content(data).header("Authorization", "Bearer " + token)
				.accept(JSON_TYPE));
	}

	/**
	 * Emit a PUT request , with provided json, on specified resource as logged user
	 * with given credentials
	 * 
	 * @param uri   the targeted resource
	 * @param data  the json source
	 * @param admin indicate if User should be an admin or not
	 * @return {@code ResultActions} representation of response from request to
	 *         assert
	 * @throws Exception
	 */
	protected ResultActions loggedPut(String uri, String data, boolean admin) throws Exception {
		String token = obtainAccessToken(username(admin), "Password1");
		return mockMvc.perform(put(uri).contentType(JSON_TYPE).content(data).header("Authorization", "Bearer " + token)
				.accept(JSON_TYPE));
	}

	/**
	 * Emit a DELETE request , with provided json, on specified resource as logged
	 * user or admin depending on 'admin' boolean value
	 * 
	 * @param uri   the targeted resource
	 * @param data  the json source
	 * @param admin indicate if User should be an admin or not
	 * @return {@code ResultActions} representation of response from request to
	 *         assert
	 * @throws Exception
	 */
	protected ResultActions loggedDelete(String uri, boolean admin) throws Exception {
		String token = obtainAccessToken(username(admin), "Password1");
		return mockMvc.perform(delete(uri).header("Authorization", "Bearer " + token).accept(JSON_TYPE));
	}

	/**
	 * Send Http Post request with user credentials to retrieve access token
	 * 
	 * @param username the user identifier
	 * @param password the user password
	 * @return {@code String} representation of access token
	 * @throws Exception
	 */
	private String obtainAccessToken(String username, String password) throws Exception {
		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.add("grant_type", "password");
		params.add("client_id", CLIENT_ID);
		params.add("username", username);
		params.add("password", password);
		ResultActions result = mockMvc.perform(post(LOGIN_URI).params(params).accept(JSON_TYPE));
		String resultString = result.andReturn().getResponse().getContentAsString();
		// JacksonJsonParser jsonParser = new JacksonJsonParser();
		String response = jsonParser.parseMap(resultString).get("access_token").toString();
		
		return response;
	}

	/**
	 * Retrieve User or Admin username based on given boolean value.
	 * 
	 * @param admin indicate if User is an admin or not
	 * @return{@String} ADMIN / USER username
	 */
	private String username(boolean admin) {
		return admin ? "louiiuol" : "Juju58";
	}

}