package dev.louiiuol.jarit.business.dtos.requests.users;

import java.text.MessageFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * DTO representing the {@code UserLoginDto}
 * to authenticate in the application and retrieve {@code AccessToken}
 */
public class UserLoginDto {

    protected UserLoginDto() {
        // Overrides default no-args constructor as protected
    }

    @NotBlank
    @Size(min = 3, max = 60)
    private String username;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

    @Override
    public String toString() {
        return MessageFormat.format("UserCreateDTO: [username: {0}, password: [PROTECTED] ]", username );
    }

}