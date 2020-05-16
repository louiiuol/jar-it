package dev.louiiuol.jarit.api.controllers;

import java.util.Set;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.springframework.mock.web.MockHttpServletResponse;

import static org.junit.Assert.assertEquals;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvFileSource;

import dev.louiiuol.jarit.api.IntegrationTestConfig;
import dev.louiiuol.jarit.business.dtos.responses.users.UserViewDetailsDto;
import dev.louiiuol.jarit.business.dtos.responses.users.UserViewDto;

/**
 * Integration tests for REST {@code UserController} checks. <p>
 * All routes provided by the controller are tested here <hr>
 * <i>Most of them requires multiples validation, a test
 * should be written for each case handdle by API</i>
 * 
 * @see UserController
 * @see ParameterizedTest
 * @see CsvFileSource
 * @see IntegrationTestConfig
 */
@SuppressWarnings("unchecked")
public class UserControllerTest extends IntegrationTestConfig {

    private final String ROOT = "/csv/user/";
    private final String REGISTER_URI = "/api/auth/signup";
    private final String USERS_URI = "/api/secure/users";
    private final String WHOAMI_URI = "/api/secure/whoami";
    private final String JSON_TYPE = "application/json;charset=UTF-8";

    /**
     * <b>EMIT:</b> {@code POST} request on route: {@code /api/auth/signup} <p>
     * <b>TO:</b> <i>create new</i> {@code User} <p>
     * <b>WITH:</b> <i>invalid</i> {@code UserCreateDto} => [UNIQUE_EMAIL] validator catched <p> <hr>
     * <b>EXPECT:</b> <p>
     * 1. {@code HttpStatus} must be {@code 400[BAD_REQUEST]} <p>
     * 2. {@code ApiErrorsDto} must be returned with following message: <p>
     * {@code "email is already taken"} <hr>
     * 
     * @param json the user's information(s) - {@code UserCreateDto}
     * @throws Exception
     */
    @ParameterizedTest
    @CsvFileSource(resources= ROOT + "create.csv", delimiter = ';', numLinesToSkip = 1)
    void create(String json, int expected) throws Exception {
        MockHttpServletResponse response = mockMvc.perform(
            post(REGISTER_URI)
            .contentType(JSON_TYPE)
            .content(json)
            .accept(JSON_TYPE)).andReturn().getResponse();
        assertEquals(expected, response.getStatus());
        if(response.getStatus() == 200) loggedDelete(USERS_URI + "/4", true);
    }

    /**
     * <b>EMIT:</b> {@code PUT} followed by {@code GET} request on route: {@code /api/secure/users/id} <p>
     * <b>TO:</b> <i>update</i> {@code User} matching given id, with {@code UserUpdateDto} <p>
     * <b>WITH:</b> <i>authenticated</i> {@code User} with [VALID_REQUESTER] approved <p> <hr>
     * <b>EXPECT:</b> <p>
     * 1. {@code HttpStatus} must be {@code 200[OK]} (for both request) <p>
     * 2. updated {@code User} avatar must be equal to {@code m4} <hr>
     * 
     * @param json the user's information(s) to update - {@code UserUpdateDto}
     * @throws Exception
     */
    @ParameterizedTest
    @CsvFileSource(resources = ROOT + "update.csv", delimiter = ';', numLinesToSkip = 1)
    void update(String json, int expected) throws Exception {
        MockHttpServletResponse response = loggedPut(USERS_URI + "/3", json, true)
            .andReturn().getResponse();
        assertEquals(expected, response.getStatus());
    }

    /**
     * <b>EMIT:</b> {@code GET} request on route: {@code /api/secure/users/id} <p>
     * <b>TO:</b> <i>retrieve</i> {@code User} matching given id, as {@code UserViewDto} <p>
     * <b>WITH: <i>authenticated</i> {@code User} with [ROLE_USER] <p> <hr>
     * <b>EXPECT:</b> <p>
     * 1. {@code HttpStatus} must be {@code 200[OK]} <p>
     * 2. {@code UserViewDto} id must be equal to {@code 1} <hr>
     * 
     * @throws Exception
     */
    @Test
    void getById_logged_success() throws Exception {
        String result = loggedGet(USERS_URI + "/1", false)
            .andExpect(status().isOk())
            .andReturn().getResponse().getContentAsString();
        UserViewDto user = objectMapper.readValue(result, UserViewDto.class);
        assertEquals((Long) 1L, user.getId());
    }

    /**
     * <b>EMIT:</b> {@code GET} request on route: {@code /api/secure/users/id} <p>
     * <b>TO:</b> <i>retrieve</i> {@code User} matching given id, as {@code UserViewDto}<p>
     * <b>WITH:</b> <i>invalid</i> {@code User} => [HAS_ROLE_USER] validator catched <p> <hr>
     * <b>EXPECT:</b> <p>
     * 1. {@code HttpStatus} must be {@code 401[UNAUTHORIZED]} <p>
     * 2. {@code ApiErrorsDto} must be returned with following message: {@code "unauthorized"} <hr>
     * 
     * @throws Exception
     */
    @Test
    void getById_notLogged_fail() throws Exception {
        String response = mockMvc.perform(get(USERS_URI+ "/1"))
            .andExpect(status().isUnauthorized())
            .andReturn().getResponse().getContentAsString();
        Assertions.assertTrue( response.contains(UNAUTHORIZED) );
    }

    /**
     * <b>EMIT:</b> {@code GET} request on route: '{@code /api/secure/users/id} <p>
     * <b>TO:</b> <i>retrieve</i> {@code User} matching given id, as {@code UserViewDetailsDto} <p>
     * <b>WITH: <i>authenticated</i> {@code User} with [ROLE_USER] <p> <hr>
     * <b>EXPECT:</b> <p>
     * 1. {@code HttpStatus} must be 200[OK] <p>
     * 2. {@code Set<UserViewDto>} id must be equal to {@code 1} <hr>
     * 
     * @throws Exception
     */
    @Test
    void getDetails_logged_success() throws Exception {
        String result = loggedGet(WHOAMI_URI, true)
            .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
            UserViewDetailsDto user = objectMapper.readValue(result, UserViewDetailsDto.class);
            assertEquals((Long) 1L, user.getId());
    }

    /**
     * <b>EMIT:</b> {@code GET} request on route: {@code /api/secure/users/id/details} <p>
     * <b>TO:</b> <i>retrieve</i> {@code User} matching given id, as {@code UserViewDetailsDto}<p>
     * <b>WITH:</b> <i>invalid</i> {@code User} => [HAS_ROLE_USER] validator catched <p> <hr>
     * <b>EXPECT:</b> <p>
     * 1. {@code HttpStatus} must be {@code 401[UNAUTHORIZED]} <p>
     * 2. {@code ApiErrorsDto} must be returned with following message: {@code "unauthorized"} <hr>
     * 
     * @throws Exception
     */
    @Test
    void getDetails_notLogged_fail() throws Exception {
        String response = mockMvc.perform(get(USERS_URI+ "/1"))
            .andExpect(status().isUnauthorized())
            .andReturn().getResponse().getContentAsString();
        Assertions.assertTrue( response.contains(UNAUTHORIZED) );
    }

    /**
     * <b>EMIT:</b> {@code GET} request on route: {@code /api/secure/users} <p>
     * <b>TO:</b> <i>retrieve all</i> {@code User} present in database (<i>3 present</i>)<p>
     * <b>WITH: <i>authenticated</i> {@code User} with [ROLE_USER]<p> <hr>
     * <b>EXPECT:</b> <p>
     * 1. {@code HttpStatus} must be {@code 200[OK]} <p>
     * 2. {@code Set<UserViewDto>} must have a size() of {@code 3} <hr>
     * 
     * @throws Exception
     */
    @Test
    void getAll_logged_success() throws Exception {
        String result = loggedGet(USERS_URI, false)
            .andExpect(status().isOk())
            .andReturn().getResponse().getContentAsString();
        Set<UserViewDto> users = objectMapper.readValue(result, Set.class);
        assertEquals(5, users.size());
    }

    /**
     * <b>EMIT:</b> {@code GET} request on route: {@code /api/secure/users} <p>
     * <b>TO:</b> <i>retrieve</i> all {@code User} present in database (3 present)<p>
     * <b>WITH:</b> <i>invalid</i> {@code User} => [HAS_ROLE_USER] validator catched <p> <hr>
     * <b>EXPECT:</b> <p>
     * 1. {@code HttpStatus} must be {@code 401[UNAUTHORIZED]} <p>
     * 2. {@code ApiErrorsDto} must be returned with following message: {@code "unauthorized"} <hr>
     * 
     * @throws Exception
     */
    @Test
    void getAll_notLogged_fail() throws Exception {
        String response = mockMvc.perform(get(USERS_URI))
            .andExpect(status().isUnauthorized())
            .andReturn().getResponse().getContentAsString();
        Assertions.assertTrue( response.contains(UNAUTHORIZED) );
    }

    /**
     * <b>EMIT:</b> {@code PUT} request on route: {@code /api/secure/users/id} <p>
     * <b>TO:</b> <i>update</i> {@code User} matching given id, with {@code UserUpdateDto} <p>
     * <b>WITH:</b> <i>wrong authenticated</i> {@code User} => [VALID_REQUESTER] validator catched <p> <hr>
     * <b>EXPECT:</b> <p>
     * 1. {@code HttpStatus} must be {@code 403[FORBIDDEN]}<p>
     * 2. {@code ApiErrorsDto} must be returned with following message: {@code "access_denied"} <hr>
     * 
     * @param json the user's information(s) to update - {@code UserUpdateDto}
     * @throws Exception
     */
    @Test
    void update_loggedInvalid_fail() throws Exception {
        String data = "{\"username\": \"test42\", \"actualPassword\": \"Password1\"}";
        String response = loggedPut(USERS_URI + "/3", data, false)
            .andExpect(status().isForbidden())
            .andReturn().getResponse().getContentAsString();
        Assertions.assertTrue( response.contains(ACCESS_DENIED) );
    }

    /**
     * <b>EMIT:</b> {@code PUT} request on route: {@code /api/secure/users/id} <p>
     * <b>TO:</b> <i>update</i> {@code User} matching given id, with {@code UserUpdateDto} <p>
     * <b>WITH:</b> <i>non authenticated</i> {@code User} => [ROLE_USER] validator catched <p> <hr>
     * <b>EXPECT:</b> <p>
     * 1. {@code HttpStatus} must be {@code 401[UNAUTHORIZED]}<p>
     * 2. {@code ApiErrorsDto} must be returned with following message: {@code "unauthorized"} <hr>
     * 
     * @param json the user's information(s) to update - {@code UserUpdateDto}
     * @throws Exception
     */
    @Test
    void update_notLogged_fail() throws Exception {
        String data = "{\"username\": \"random123\"}";
        String response = mockMvc.perform(
            put(USERS_URI + "/3").contentType(JSON_TYPE).content(data))
            .andExpect(status().isUnauthorized())
            .andReturn().getResponse().getContentAsString();
        Assertions.assertTrue( response.contains(UNAUTHORIZED) );
    }

}