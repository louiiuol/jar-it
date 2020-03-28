package dev.louiiuol.etin.models.dtos.requests.users;

import java.text.MessageFormat;
import java.util.Set;

import javax.persistence.Convert;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

import dev.louiiuol.etin.api.validators.email.UniqueEmail;
import dev.louiiuol.etin.api.validators.username.UniqueUsername;
import dev.louiiuol.etin.models.entities.Role;
import dev.louiiuol.etin.services.utils.BooleanConverter;

/**
 * DTO representing the {@code UserCreateDto}
 * to create new {@code User}
 * 
 * @see UniqueEmail
 * @see UniqueUsername
 */
public class UserCreateDto {

    protected UserCreateDto() {/*Overrides default constructor as protected without arguments*/}

    @NotBlank
    @UniqueUsername
    @Size(min = 6, max = 20)
    private String username;

    @NotBlank
    @Size(max = 60)
    @UniqueEmail
    @Email
    private String email;

    @NotBlank
    @Size(min = 6, max = 20)
    private String password;

    @JsonIgnore
    private String avatar = "unknown";

    private Set<Role> roles;

    @Convert(converter = BooleanConverter.class)
    private boolean enabled = true;

    @Convert(converter = BooleanConverter.class)
    private boolean accountNonExpired = true;

    @Convert(converter = BooleanConverter.class)
    private boolean accountNonLocked = true;

    @Convert(converter = BooleanConverter.class)
    private boolean credentialsNonExpired = true;

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }

    public void setRoles(Set<Role> roles) { this.roles = roles; }

    @Override
    public String toString() {
        return MessageFormat.format("UserCreateDTO: [username: {0}, email: {1}, password: [PROTECTED], roles: {2}, avatar: {3}, enabled: {4} ]",
        username, email, roles, avatar, enabled );
    }

}