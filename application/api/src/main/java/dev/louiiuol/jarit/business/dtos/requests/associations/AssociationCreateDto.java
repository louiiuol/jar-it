package dev.louiiuol.jarit.business.dtos.requests.associations;

import java.text.MessageFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import dev.louiiuol.jarit.api.validators.association.code.UniqueCode;
import dev.louiiuol.jarit.api.validators.association.name.UniqueName;


/**
 * DTO representing the {@code AssociationCreateDto}
 * to create new {@code Association}
 *
 * @see UniqueName
 */
public class AssociationCreateDto {

    protected AssociationCreateDto() {
        // Overrides default no-args constructor as protected
    }

    @NotBlank
    @UniqueName
    @Size(min = 6, max = 40)
    private String name;

    @NotBlank
    @UniqueCode
    @Size(min = 2, max = 5)
    private String code;

    @Size(max = 255)
    private String description;

    @NotBlank
    private String link;

    @Override
    public String toString() {
        return MessageFormat
            .format("{ name: {0}, code: {1}, description: {2}, link: {3} }",
                name, code, description, link );
    }

}