package dev.louiiuol.etin.models.dtos.responses.users;

import java.text.MessageFormat;

/**
 * DTO representing the {@code UserAuthViewDto}
 * to display {@code User} authentication informations
 * 
 *@see UserViewDto 
 */
public class UserAuthViewDto extends UserViewDto {

    private static final long serialVersionUID = 935362620517952552L;

    protected UserAuthViewDto() {/*Overrides default constructor as protected without arguments*/}

    @SuppressWarnings("unused")
    private String password;

    private boolean enabled;

    private boolean accountNonExpired;

    private boolean accountNonLocked;

    private boolean credentialsNonExpired;

    public String toString() {
        return MessageFormat.format("UserAuthViewDTO#{0}: [ username:{1}, password: [PROTECTED], enabled: {2}, expired: {3}, locked: {4}, credentials_expired: {5} ] ",
            getId(), username, enabled, accountNonExpired, accountNonLocked, credentialsNonExpired);
    }

}