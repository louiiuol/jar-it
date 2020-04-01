package dev.louiiuol.etin.models.dtos.responses.users;

import java.text.MessageFormat;

import dev.louiiuol.etin.models.dtos.EntityIdDto;

/**
 * DTO representing the {@code UserViewDto}
 * to display {@code User} basic informations
 * 
 * @see EntityIdDto
 */
public class UserViewDto  extends EntityIdDto{

    private static final long serialVersionUID = 5820293753769173076L;

    protected UserViewDto() {
        /* Overrides default constructor as protected without arguments */}

    protected String username;

    protected String avatar;

    public String toString() {
        return MessageFormat.format("UserViewDTO#{0}: [ username: {1}, avatar: {2}, ]",
            getId(), username, avatar);
    }

}