package dev.louiiuol.etin.models.dtos.responses.users;

import java.text.MessageFormat;
import java.util.Set;

/**
 * DTO representing the {@code UserViewDetailsDto}
 * to display {@code User} detailed informations
 * 
 * @see UserViewDto
 */
public class UserViewDetailsDto extends UserViewDto {

    private static final long serialVersionUID = 653638235007757192L;

    protected UserViewDetailsDto() {/*Overrides default constructor as protected without arguments*/}

    private Set<RoleViewDto> roles;

    private String email;

    private boolean enabled;

    // TODO Add Tinees and Swears properties

    public String toString() {
        return MessageFormat.format("UserViewDetailsDTO#{0}: [ username: {1}, email: {2}, avatar: {3}, roles: {4}, enabled: {5} ]",
            getId(), username, email, avatar, roles, enabled);
    }

}
