package dev.louiiuol.jarit.business.dtos.responses.users;

import java.text.MessageFormat;
import java.time.LocalDate;
import java.util.Set;

/**
 * DTO representing the {@code UserViewDetailsDto}
 * to display {@code User} detailed informations.
 * <p>
 * This resource will only be avalaible to current logged user,
 * and only will represent the current user information.
 * 
 * @see UserViewDto
 */
public class UserViewDetailsDto extends UserViewDto {

    private static final long serialVersionUID = 653638235007757192L;

    private Set<RoleViewDto> roles;

    private String email;

    private boolean enabled;

    private LocalDate birthDate;

    protected UserViewDetailsDto() {
        // Overrides default no-args constructor as protected
    }

    @Override
    public String toString() {
        return MessageFormat.format("UserViewDetailsDTO#{0}: [ username: {1}, email: {2}, avatar: {3}, birthDate: {4}, roles: {5}, enabled: {6} ]",
            getId(), username, email, avatar, birthDate, roles, enabled);
    }

}
