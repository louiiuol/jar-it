package dev.louiiuol.etin.models.dtos.responses.users;

import java.text.MessageFormat;

import dev.louiiuol.etin.models.dtos.EntityIdDto;

/**
 * DTO representing the {@code UserViewDto}
 * to display {@code User} basic informations for every logged users.
 * 
 * @see EntityIdDto
 */
public class UserViewDto extends EntityIdDto{

    private static final long serialVersionUID = 5820293753769173076L;

    protected UserViewDto() {
        // Overrides default no-args constructor as protected
    }

    protected String username;

    protected String avatar;

    @Override
    public int hashCode() {
        return username.hashCode();
    }
    @Override
    public boolean equals(Object other) {
        if (other instanceof UserViewDto)
            return username.equals(((UserViewDto) other).username);
        return false;
    }

    @Override
    public String toString() {
        return MessageFormat.format("UserViewDTO#{0}: [ username: {1}, avatar: {2}, ]", getId(), username, avatar);
    }

}