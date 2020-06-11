package dev.louiiuol.jarit.business.dtos.users;

import java.text.MessageFormat;

import dev.louiiuol.jarit.business.dtos.EntityIdDto;

/**
 * DTO representing the {@code UserViewDto}
 * to display {@code User} basic informations for every logged users.
 * 
 * @see EntityIdDto
 */
public class UserViewDto {

    protected Long id;

    protected String username;

    protected String avatar;

    protected UserViewDto() {
        // Overrides default no-args constructor as protected
    }

    public UserViewDto(Long id, String avatar, String username) {
        this.id = id;
        this.avatar = avatar;
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    @Override
    public int hashCode() {
        return username.hashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other instanceof UserViewDto) {
            return username.equals(((UserViewDto) other).username);
        }
        return false;
    }

    @Override
    public String toString() {
        return MessageFormat.format("UserViewDTO#{0}: [ username: {1}, avatar: {2}, ]", id, username, avatar);
    }

}