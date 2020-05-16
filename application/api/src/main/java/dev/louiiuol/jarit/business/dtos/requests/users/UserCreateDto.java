package dev.louiiuol.jarit.business.dtos.requests.users;

import java.text.MessageFormat;
import java.time.LocalDate;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

import dev.louiiuol.jarit.api.validators.user.adult.Adult;
import dev.louiiuol.jarit.api.validators.user.email.UniqueEmail;
import dev.louiiuol.jarit.api.validators.user.username.UniqueUsername;
import dev.louiiuol.jarit.business.entities.Role;

/**
 * DTO representing the {@code UserCreateDto}
 * to create new {@code User}
 * 
 * @see UniqueEmail
 * @see UniqueUsername
 */
@SuppressWarnings("unused")
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

    @JsonIgnore
    private Set<Role> roles;

    private boolean enabled = true;

    private boolean accountNonExpired = true;

    private boolean accountNonLocked = true;

    private boolean credentialsNonExpired = true;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    @Override
    public String toString() {
        return MessageFormat.format(
            "UserCreateDTO: [username: {0}, email: {1}, password: [PROTECTED], birthDate: {2}, avatar: {3}, roles: {4}, enabled: {5} ]",
                username, email, birthDate, roles, avatar, enabled );
    }

}