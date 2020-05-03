package dev.louiiuol.etin.models.dtos.requests.users;

import java.text.MessageFormat;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

import dev.louiiuol.etin.api.validators.email.UniqueEmail;
import dev.louiiuol.etin.api.validators.username.UniqueUsername;

/**
 * DTO representing the {@code UserUpdateDto}
 * to update existing {@code User}
 */
public class UserUpdateDto {

    protected UserUpdateDto() {
        // Overrides default no-args constructor as protected
    }

    @UniqueUsername
    @Size(min = 4, max = 12)
    String username;

    @Size(max = 40)
    @UniqueEmail
    @Email
    String email;

    @Size(min = 2, max = 7)
    private String avatar;

    @Override
    public String toString() {
        return MessageFormat.format("UserCreateDTO: [username: {0}, email: {1}, password: [PROTECTED], avatar: {2} ]",
        username, email, avatar );
    }

}