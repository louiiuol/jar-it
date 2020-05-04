package dev.louiiuol.etin.models.dtos.requests.users;

import java.text.MessageFormat;
import java.time.LocalDate;
import java.util.Set;

import javax.persistence.Convert;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import dev.louiiuol.etin.api.validators.adult.Adult;
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

    protected UserCreateDto() {
        // Overrides default no-args constructor as protected
    }

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

    private String avatar = "unknown";

    @NotNull
    @Adult
    private LocalDate birthDate;

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
        return MessageFormat.format(
            "UserCreateDTO: [username: {0}, email: {1}, password: [PROTECTED], birthDate: {2}, avatar: {3}, roles: {4}, enabled: {5} ]",
            username, email, birthDate, roles, avatar, enabled );
    }

}