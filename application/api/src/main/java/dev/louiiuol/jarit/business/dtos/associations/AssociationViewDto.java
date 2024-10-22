package dev.louiiuol.jarit.business.dtos.associations;

import java.text.MessageFormat;

import dev.louiiuol.jarit.business.dtos.EntityIdDto;

/**
 * DTO representing the {@code AssociationViewDto} to display
 * {@code Association} informations
 * 
 * @see EntityIdDto
 */
public class AssociationViewDto extends EntityIdDto {

    private static final long serialVersionUID = -934507631481513823L;

    private String name;

    private String code;

    private String description;

    private String link;

    protected AssociationViewDto() {
        // Overrides default no-args constructor as protected
    }

    @Override
    public int hashCode() {
        return code.hashCode();
    }

    @Override
	public boolean equals(Object other) {
        if (other instanceof AssociationViewDto) {
            return code.equals( ((AssociationViewDto) other).code );
        }
        return false;
    }

    @Override
    public String toString() {
        return MessageFormat.format("{ id: {0}, name: {1}, code: {2}, description: {3}, link: {4} }",
            getId(), name, code, description, link);
    }

}