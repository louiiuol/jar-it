package dev.louiiuol.etin.models.dtos.responses.users;

import java.text.MessageFormat;

import dev.louiiuol.etin.models.dtos.EntityIdDto;

/**
 * DTO representing the {@code RoleViewDto}
 * to display {@code Role} basic informations
 * 
 * @see EntityIdDto
 */
public class RoleViewDto extends EntityIdDto {

    private static final long serialVersionUID = -4726423168467309450L;

    protected RoleViewDto() {
        /* Overrides default constructor as protected without arguments */}

    private String code;

    @Override public String toString() {
        return MessageFormat.format("RoleViewDTO#{0}: [ code: {1} ]", getId(), code);
    }

}