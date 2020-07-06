package dev.louiiuol.jarit.business.dtos.jars.members;

import java.text.MessageFormat;

import javax.validation.constraints.NotNull;

import dev.louiiuol.jarit.business.dtos.EntityIdDto;

/**
 * DTO representing the {@code MemberUpdateDto}
 * to update existing {@code Member}
 */
public class MemberUpdateDto extends EntityIdDto {

    private static final long serialVersionUID = -4925844377925271638L;

    @NotNull
    private EntityIdDto user;

    private Boolean admin;

    protected MemberUpdateDto() {
        // Overrides default no-args constructor as protected
    }

    public EntityIdDto getUser() {
        return user;
    }

    public Boolean getAdmin() {
        return admin;
    }

    @Override
    public String toString() {
        return MessageFormat.format("{ id: {0}, user: {1}, admin: {2} }",
            getId(), user, admin);
    }

}