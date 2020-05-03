package dev.louiiuol.etin.models.dtos.responses.users;

import java.text.MessageFormat;

import dev.louiiuol.etin.models.dtos.EntityIdDto;

/**
 * DTO representing the {@code RoleViewDto}
 * to display {@code Role} code
 * 
 * @see EntityIdDto
 */
public class RoleViewDto extends EntityIdDto {

    private static final long serialVersionUID = -4726423168467309450L;

    protected RoleViewDto() {
        // Overrides default no-args constructor as protected
    }

    private String code;

    @Override
    public int hashCode() {
        return code.hashCode();
    }
    @Override
    public boolean equals(Object other) {
        if (other instanceof RoleViewDto)
            return code.equals(((RoleViewDto) other).code);
        return false;
    }

    @Override
    public String toString() {
        return MessageFormat.format("RoleViewDTO#{0}: [ code: {1} ]", getId(), code);
    }

}